/*
	Custom error handling
*/



// imports
// ------------------------------------------------------------------------
import state from '../Data/state.js';



// purpose:		handles error in a friendlier way by showing stack trace
//				in the console and optionally informing the user
// arguments:	the user friendly message to show (optional, string)
// returns:		an JS error with full stack trace in the console
//				and optionally a visible message on the screen
// ------------------------------------------------------------------------
class handleError extends Error {
	constructor(userFriendlyError, ...args){
		super(...args);
		Error.captureStackTrace(this, handleError);

		if(userFriendlyError){
			state.setError(userFriendlyError);
			console.log(userFriendlyError);
		}

		console.log(this);
	}
};



// exports
// ------------------------------------------------------------------------
export default handleError;