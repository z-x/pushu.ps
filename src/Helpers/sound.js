/*
	Plays a sound using AudioContext API

	Usage:	let sound = new Sound('/path/audio.mp3');
			sound.load();
			sound.play();
*/



// imports
// ------------------------------------------------------------------------
import handleError from './handleError.js';



// local variables
// ------------------------------------------------------------------------
// indicates if the audio context was warmed (user needs to click somewhere)
// for webkit and chromium to allow any playback on the page
let audioContextWarmed = false;
// creating new audio context
let audioContext = new (window.AudioContext || window.webkitAudioContext)();



// purpose:		warms up the audio context so it would be ready to play
// returns:		the info about the audio context being warmed (bool)
// ------------------------------------------------------------------------
function warmUpAudioContext(){
	// create empty buffer
	let buffer = audioContext.createBuffer(1, 1, 22050)
	let source = audioContext.createBufferSource();
	source.buffer = buffer;
	// contect the empty buffer to audio destination
	source.connect(audioContext.destination);
	// play the empty audio
	source.start(0);

	// the context was warmed up, nice
	return audioContextWarmed = true;
};


// purpose:		resumes the audio context when the browser suspended it,
//				iOS does it when the app goes to the background or after a call
// returns:		a promise resolved when the audio context is running
// ------------------------------------------------------------------------
function resumeAudioContext(){
	if(audioContext.state === 'running'){
		return Promise.resolve();
	}

	return audioContext.resume();
};

// on every click, as browsers allow starting the audio only after user action
document.addEventListener('click', () => {
	if(!audioContextWarmed){
		warmUpAudioContext();
	}

	resumeAudioContext().catch(() => {
		// it will be tried again on the next click
	});
});

// when the user comes back to the app
document.addEventListener('visibilitychange', () => {
	if(document.visibilityState === 'visible'){
		resumeAudioContext().catch(() => {
			// it will be tried again on the next click
		});
	}
});


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
	load() {
		if(this.loading){ return; }

		this.loading = true;

		fetch(this.path).then((response) => {
			if(!response.ok){ return Promise.reject(response); }
			// we return the response as an array buffer
			// this is a binary representation of the audio file
			return response.arrayBuffer();
		})
		.then((binaryAudio) => {
			// then we need to get the binary data and decode
			// it into a real audio
			audioContext.decodeAudioData(binaryAudio, (decodedData) => {
				// we will store the buffered audio data into variable
				this.buffer = decodedData;
			});
		})
		.catch((error) => {
			// it will be loaded again the next time it is needed
			this.loading = false;
			new handleError('The alert sound could not be played', false, error);
		});
	};


	// purpose:		plays the sound, resuming the audio context first if needed
	// returns:		the audio is played
	// ------------------------------------------------------------------------
	play() {
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
export default Sound;