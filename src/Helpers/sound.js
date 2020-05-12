/*
	Plays a sound using AudioContext API

	Usage:	let sound = new Sound('/path/audio.mp3');
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

if(!audioContextWarmed){
	document.addEventListener('click', () => {
		warmUpAudioContext();
	}, {once: true});
}


// purpose:		loads and play an audio file
// arguments:	the path to the audio file (string)
// ------------------------------------------------------------------------
class Sound {

	constructor(path){
		// the path for the audio file to play
		this.path = path;
		// the stored file buffer to play later
		this.buffer = null;

		// loads the audio file
		this.load();
	}

	// purpose:		loads the audio file to the buffer to play it later
	// returns:		stores the audio buffer in this.buffer
	// ------------------------------------------------------------------------
	load() {
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
			new handleError('The alert sound could not be played', false, error);
		});
	};


	// purpose:		plays the sound stored in the audio buffer
	// returns:		the audio is played
	// ------------------------------------------------------------------------
	play() {
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