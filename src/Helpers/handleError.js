/*
	Custom error handling

	Usage: handleError('User friendly error message', false, error);
*/



// imports
// ------------------------------------------------------------------------
import appState from '../Data/state.svelte.js';



// purpose:		handles error in a friendlier way by showing stack trace
//				in the console and optionally informing the user
// arguments:	the user friendly message to show (optional, string)
//				if you want to show the message to the user (true, bool)
//				the original error, shown as the cause in the console (optional)
// returns:		an JS error with full stack trace and its cause in the console
//				and optionally a visible message on the screen
//				triggers 'appError' global event
// ------------------------------------------------------------------------
function handleError(userFriendlyError, showMessage = true, machineError){
	console.error(new Error(userFriendlyError, { cause: machineError }));

	if(userFriendlyError && showMessage){
		appState.setError(userFriendlyError);
	}

	window.dispatchEvent(new CustomEvent('appError', { detail: { text: userFriendlyError, response: machineError} }));
};



// exports
// ------------------------------------------------------------------------
export default handleError;
