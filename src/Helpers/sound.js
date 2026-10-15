/*
	Plays a sound using AudioContext API

	Usage:	let sound = new Sound('/path/audio.mp3');
			sound.load();
			enableSounds();
			sound.play();
			disableSounds();
*/



// imports
// ------------------------------------------------------------------------
import handleError from './handleError.js';



// local variables
// ------------------------------------------------------------------------
// the audio context, created only when it is needed, as the browsers do not
// allow starting it when the app loads anyway, and it would run in the
// background for the whole time the app is open
let audioContext = null;
// if the sounds can be played now, only during the training, the audio
// is suspended otherwise so it does not use the battery (bool)
let soundsEnabled = false;



// purpose:		creates the audio context the first time it is needed
// returns:		the audio context
// ------------------------------------------------------------------------
function getAudioContext(){
	return audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
};


// purpose:		starts the audio context, the browsers allow it only after
//				a user action, iOS also suspends it when the app goes to the
//				background or after a call
// returns:		a promise resolved when the audio context is running
// ------------------------------------------------------------------------
function resumeAudioContext(){
	if(audioContext.state === 'running'){
		return Promise.resolve();
	}

	// play an empty sound, WebKit starts the audio only when something
	// is played after a user action
	let source = audioContext.createBufferSource();
	source.buffer = audioContext.createBuffer(1, 1, 22050);
	source.connect(audioContext.destination);
	source.start(0);

	return audioContext.resume();
};


// purpose:		allows playing the sounds, when the training starts
// returns:		the audio context is started if the browser allows it now,
//				or on the next click
// ------------------------------------------------------------------------
function enableSounds(){
	getAudioContext();
	soundsEnabled = true;

	resumeAudioContext().catch(() => {
		// it will be tried again on the next click
	});
};


// purpose:		stops the audio when the training ends
// returns:		the audio context is suspended
// ------------------------------------------------------------------------
function disableSounds(){
	soundsEnabled = false;

	audioContext?.suspend().catch(() => {
		// nothing to do, the audio is not playing anything anyway
	});
};

// on every click, as browsers allow starting the audio only after user action,
// and when the user comes back to the app, only while the sounds are enabled
const resumeEnabledSounds = () => {
	if(!soundsEnabled || document.visibilityState !== 'visible'){ return; }

	resumeAudioContext().catch(() => {
		// it will be tried again on the next click
	});
};

document.addEventListener('click', resumeEnabledSounds);
document.addEventListener('visibilitychange', resumeEnabledSounds);


// purpose:		loads and play an audio file
// arguments:	the path to the audio file (string)
// ------------------------------------------------------------------------
class Sound {

	constructor(path){
		// the path for the audio file to play
		this.path = path;
		// the stored file buffer to play later
		this.buffer = null;
		// if the file is loading or loaded, so it is loaded only once (bool)
		this.loading = false;
	}

	// purpose:		loads the audio file to the buffer to play it later, only
	//				the first time it is called, or again when it failed before
	// returns:		stores the audio buffer in this.buffer
	// ------------------------------------------------------------------------
	async load() {
		if(this.loading){ return; }

		this.loading = true;

		try {
			let response = await fetch(this.path);
			if(!response.ok){ throw response; }

			// the binary file decoded into a real audio
			this.buffer = await getAudioContext().decodeAudioData(await response.arrayBuffer());
		}
		catch(error){
			// it will be loaded again the next time it is needed
			this.loading = false;
			handleError('The alert sound could not be played', false, error);
		}
	};


	// purpose:		plays the sound, resuming the audio context first if needed
	// returns:		the audio is played
	// ------------------------------------------------------------------------
	play() {
		if(!soundsEnabled){ return; }

		if(audioContext.state === 'running'){
			this.start();
			return;
		}

		// the sound is played only if the audio resumes right away, so it would
		// not be played much later, when the user clicks something
		let requested = Date.now();

		resumeAudioContext().then(() => {
			if(Date.now() - requested < 500){
				this.start();
			}
		}).catch(() => {
			// the audio can be resumed only after the user clicks something
		});
	};


	// purpose:		starts playing the sound stored in the audio buffer
	// returns:		the audio is played
	// ------------------------------------------------------------------------
	start() {
		// the sound is not loaded (yet)
		if(!this.buffer){ return; }

		// create new audio source
		let source = audioContext.createBufferSource();
		// load our previously stored audio buffer into the source
		source.buffer = this.buffer;
		// connect the source to destination (the speakers)
		source.connect(audioContext.destination);
		// play the sound
		source.start(0);
	};

};



// exports
// ------------------------------------------------------------------------
export { enableSounds, disableSounds };
export default Sound;
