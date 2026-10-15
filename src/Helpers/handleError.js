/*
	Custom error handling

	Usage: new handleError('User friendly error message', false);
*/



// imports
// ------------------------------------------------------------------------
import appState from '../Data/state.svelte.js';



// purpose:		handles error in a friendlier way by showing stack trace
//				in the console and optionally informing the user
// arguments:	the user friendly message to show (optional, string)
//				if you want to show the message to the user (true, bool)
//				the machine returned error message (optional, )
// returns:		an JS error with full stack trace in the console
//				and optionally a visible message on the screen
//				triggers 'appError' global event
// ------------------------------------------------------------------------
class handleError extends Error {
	constructor(userFriendlyError, showMessage = true, machineError, ...args){
		super(userFriendlyError, ...args);

		// not available in Safari before 17.2 and Firefox before 138, the stack
		// trace is still recorded without it, just with one more line in it
		if(Error.captureStackTrace){
			Error.captureStackTrace(this, handleError);
		}

		console.error(this, machineError);

		if(userFriendlyError && showMessage){
			appState.setError(userFriendlyError);
		}

		window.dispatchEvent(new CustomEvent('appError', { detail: { text: userFriendlyError, response: machineError} }));
	}
};



// exports
// ------------------------------------------------------------------------
export default handleError;