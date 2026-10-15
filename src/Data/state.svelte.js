/*
	The main state for holding the app state and user information.

	Usage: import appState from './Data/state.svelte.js'; then read the
	values directly (appState.page) and use the methods (appState.setPage())
	for changing the state, so it would be also saved in local storage.
*/



// imports
// ------------------------------------------------------------------------
import training from './training.js';



// the local storage keys with the user progress, removed when the app is reset
// the settings (like the chosen language) are not listed here, so they are kept
const progressKeys = ['page', 'level', 'set', 'currentStep', 'isResting', 'restEndsAt', 'pushupsLast', 'pushupsTotal', 'congratsShown'];



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
	// when the current rest ends (timestamp in ms), 0 when not resting
	restEndsAt = $state((localStorage.restEndsAt) ? parseInt(localStorage.restEndsAt) : 0);
	pushupsLast = $state((localStorage.pushupsLast) ? parseInt(localStorage.pushupsLast) : 0);
	pushupsTotal = $state((localStorage.pushupsTotal) ? parseInt(localStorage.pushupsTotal) : 0);
	lastActive = $state((localStorage.lastActive) ? parseInt(localStorage.lastActive) : Date.now());
	congratsShown = $state(localStorage.congratsShown);
	popupShown = $state(false);
	menu = $state(false);
	// the height of the shown menu, kept up to date by the menu itself
	menuHeight = $state(0);
	error = $state(false);


	// purpose:		makes sure the saved progress is valid when the app starts
	// ------------------------------------------------------------------------
	constructor(){
		this.validateProgress();
	};


	// purpose:		keeps the saved progress in the training plan, it can be
	//				outside of it when the plan changed since it was saved
	//				or when the saved data is broken
	// returns:		the level, set and step are set to the closest valid ones
	// ------------------------------------------------------------------------
	validateProgress(){
		// unknown level, start from the beginning
		if(!training[this.level]){
			this.setLevel(1);
			this.setSet(1);
			this.setStep(0);
			this.setResting(0);
		}

		// unknown set, move to the closest one, so the user keeps the progress
		if(!training[this.level][this.set]){
			let sets = Object.keys(training[this.level]).map(Number);
			let closest = Math.min(Math.max(this.set || 1, Math.min(...sets)), Math.max(...sets));

			this.setSet(closest);
			this.setStep(0);
			this.setResting(0);
		}

		// unknown step, start the training from the first pushups
		let steps = training[this.level][this.set].pushups.length;

		if(!(this.currentStep >= 0 && this.currentStep < steps)){
			this.setStep(0);
			this.setResting(0);
		}
	};


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


	// purpose:		sets the info if the user is resting and when the rest ends,
	//				so the rest keeps going when the app is in the background
	// arguments:	1 for user resting or 0 if not
	//				the rest length in seconds, when starting the rest (int)
	// ------------------------------------------------------------------------
	setResting(resting, restSeconds = 0){
		this.isResting = (resting) ? 1 : 0;
		this.restEndsAt = (resting) ? Date.now() + restSeconds * 1000 : 0;
		localStorage.isResting = this.isResting;
		localStorage.restEndsAt = this.restEndsAt;
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
		this.restEndsAt = 0;
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
