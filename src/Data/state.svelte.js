/*
	The main state for holding the app state and user information.

	Usage: import appState from './Data/state.svelte.js'; then read the
	values directly (appState.page) and use the methods (appState.setPage())
	for changing the state, so it would be also saved in local storage.
*/



// the local storage keys with the user progress, removed when the app is reset
// the settings (like the chosen language) are not listed here, so they are kept
const progressKeys = ['page', 'level', 'set', 'currentStep', 'isResting', 'pushupsLast', 'pushupsTotal', 'congratsShown'];



// purpose:		holds the reactive app state
// ************************************************************************
class AppState {

	// purpose:		sets the variables with user info taken from
	// 				local storage or sets it to defaults
	// ------------------------------------------------------------------------
	page = $state((localStorage.page) ? localStorage.page : 'Hello');
	level = $state((localStorage.level) ? parseInt(localStorage.level) : 1);
	set = $state((localStorage.set) ? parseInt(localStorage.set) : 1);
	currentStep = $state((localStorage.currentStep) ? parseInt(localStorage.currentStep) : 0);
	isResting = $state((localStorage.isResting) ? parseInt(localStorage.isResting) : 0);
	pushupsLast = $state((localStorage.pushupsLast) ? parseInt(localStorage.pushupsLast) : 0);
	pushupsTotal = $state((localStorage.pushupsTotal) ? parseInt(localStorage.pushupsTotal) : 0);
	lastActive = $state((localStorage.lastActive) ? parseInt(localStorage.lastActive) : Date.now());
	congratsShown = $state(localStorage.congratsShown);
	popupShown = $state(false);
	menu = $state(false);
	// the height of the shown menu, kept up to date by the menu itself
	menuHeight = $state(0);
	error = $state(false);


	// purpose:		updates the state and sets corresponding page
	// arguments: 	new page name (string)
	// ------------------------------------------------------------------------
	setPage(newPage){
		this.page = newPage;
		localStorage.page = this.page;
	};


	// purpose:		updates the state and sets the user level
	// arguments: 	user level to set (int)
	// ------------------------------------------------------------------------
	setLevel(newLevel){
		this.level = newLevel;
		localStorage.level = this.level;
	};


	// purpose:		updates the state and sets current pushups set in a training
	// arguments: 	pushups set (int)
	// ------------------------------------------------------------------------
	setSet(newSet){
		this.set = newSet;
		localStorage.set = this.set;
	};


	// purpose:		sets index for pushups that user is currently doing
	// arguments: 	pushups index (int)
	// ------------------------------------------------------------------------
	setStep(newIndex){
		this.currentStep = parseInt(newIndex);
		localStorage.currentStep = this.currentStep;
	};


	// purpose:		moves the set one forward
	// ------------------------------------------------------------------------
	nextSet(){
		this.setSet(this.set + 1);
	};


	// purpose:		sets the number of last pushups done
	// arguments: 	last done pushups
	// ------------------------------------------------------------------------
	lastSet(newPushupsLast){
		this.pushupsLast = newPushupsLast;
		localStorage.pushupsLast = this.pushupsLast;
	};


	// purpose:		updates the total value of pushups done
	// arguments: 	the amount of pushups to add
	// ------------------------------------------------------------------------
	totalUpdate(addPushups){
		this.pushupsTotal += addPushups;
		localStorage.pushupsTotal = this.pushupsTotal;
	};


	// purpose:		sets the info if the user is resting
	// arguments:	1 for user resting (default) or 0 if not
	// ------------------------------------------------------------------------
	setResting(resting){
		this.isResting = (resting) ? 1 : 0;
		localStorage.isResting = this.isResting;
	};


	// purpose:		sets the information about the popup status
	// arguments: 	if popup is visible (true) or not (false)
	// ------------------------------------------------------------------------
	setPopupShown(is){
		this.popupShown = is;
	};


	// purpose:		sets the information about the congratulations screen
	// arguments: 	if congratulations were shown (true) or not (false)
	// ------------------------------------------------------------------------
	setCongrats(were){
		this.congratsShown = were;
		localStorage.congratsShown = were;
	};


	// purpose:		clears the user progress and starts the app from the beginning
	//				while keeping the user settings
	// ------------------------------------------------------------------------
	reset(){
		for(let key of progressKeys){
			localStorage.removeItem(key);
		}

		this.page = 'Hello';
		this.level = 1;
		this.set = 1;
		this.currentStep = 0;
		this.isResting = 0;
		this.pushupsLast = 0;
		this.pushupsTotal = 0;
		this.congratsShown = undefined;
	};


	// purpose:		sets the information about currently active menu
	// arguments: 	menu id (string)
	// returns:		currently active menu id (string)
	// ------------------------------------------------------------------------
	setMenu(id){
		this.menu = id;

		return this.menu;
	};


	// purpose:		sets the error information visible to the user
	// arguments:	user-friendly error message
	// returns:		the error object
	// ------------------------------------------------------------------------
	setError(error){
		this.error = error;

		return error;
	};
};



// exports
// ------------------------------------------------------------------------
export default new AppState();
