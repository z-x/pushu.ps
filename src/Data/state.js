/*
	The main store for holding the app state and user information.

	Usage: import { state } from './Data/state.js'; and then use
	the methods provided in the return statement for navigating through
	the state.
*/



// imports
// ------------------------------------------------------------------------
import { writable } from 'svelte/store';


// module variables
// ------------------------------------------------------------------------
const state = createStore();


// purpose:		creates the custom store
// ************************************************************************
function createStore(){

	// purpose:		sets the variables with user info taken from
	// 				local storage or sets it to defaults
	// ------------------------------------------------------------------------
	let state = {}
		state.page = (localStorage.page) ? localStorage.page : 'Hello';
		state.level = (localStorage.level) ? parseInt(localStorage.level) : 1;
		state.set = (localStorage.set) ? parseInt(localStorage.set) : 1;
		state.currentStep = (localStorage.currentStep) ? parseInt(localStorage.currentStep) : 0;
		state.isResting = (localStorage.isResting) ? parseInt(localStorage.isResting) : 0;
		state.pushupsLast = (localStorage.pushupsLast) ? parseInt(localStorage.pushupsLast) : 0;
		state.pushupsTotal = (localStorage.pushupsTotal) ? parseInt(localStorage.pushupsTotal) : 0;
		state.popupShown = false;
		state.menuShown = false;
		state.language = (localStorage.language) ? localStorage.language : 'en-US';
		state.lastActive = (localStorage.lastActive) ? parseInt(localStorage.lastActive) : Date.now();

	
	// purpose:		creates the store with data provided in state object
	// ------------------------------------------------------------------------
	const { subscribe, set, update } = writable(state);


	// purpose:		updates the state and sets corresponding page
	// arguments: 	new page name (string)
	// ------------------------------------------------------------------------
	let setPage = (newPage) => {
		update((state) => {
			state.page = newPage;
			localStorage.page = state.page;

			return state;
		});
	};


	// purpose:		updates the state and sets the user level
	// arguments: 	user level to set (int)
	// ------------------------------------------------------------------------
	let setLevel = (newLevel) => {
		update((state) => {
			state.level = newLevel;
			localStorage.level = state.level;

			return state;
		})
	};


	// purpose:		updates the state and sets current pushups set in a training
	// arguments: 	pushups set (int)
	// ------------------------------------------------------------------------
	let setSet = (newSet) => {
		update((state) => {
			state.set = newSet;
			localStorage.set = state.set;

			return state;
		})
	};


	// purpose:		sets index for pushups that user is currently doing
	// arguments: 	pushups index (int)
	// ------------------------------------------------------------------------
	let setStep = (newIndex) => {
		update((state) => {
			state.currentStep = parseInt(newIndex);
			localStorage.currentStep = state.currentStep;

			return state;
		})
	};


	// purpose:		moves the set one forward
	// ------------------------------------------------------------------------
	let nextSet = () => {
		setSet(state.set + 1);
	};


	// purpose:		sets the number of last pushups done
	// arguments: 	last done pushups
	// ------------------------------------------------------------------------
	let lastSet = (newPushupsLast) => {
		update((state) => {
			state.pushupsLast = newPushupsLast;
			localStorage.pushupsLast = state.pushupsLast;

			return state;
		});
	};


	// purpose:		updates the total value of pushups done
	// arguments: 	the amount of pushups to add
	// ------------------------------------------------------------------------
	let totalUpdate = (addPushups) => {
		update((state) => {
			state.pushupsTotal += addPushups;
			localStorage.pushupsTotal = state.pushupsTotal;

			return state;
		});
	};


	// purpose:		sets the info if the user is resting
	// arguments:	1 for user resting (default) or 0 if not
	// ------------------------------------------------------------------------
	let isResting = (resting) => {
		update((state) => {
			state.isResting = (resting) ? 1 : 0;
			localStorage.isResting = state.isResting;

			return state;
		});
	};


	// purpose:		sets the information about the popup status
	// arguments: 	if popup is visible (true) or not (false)
	// ------------------------------------------------------------------------
	let popupShown = (is) => {
		update((state) => {
			state.popupShown = is;

			return state;
		});
	};


	// purpose:		sets the menu visibility status
	// arguments: 	if menu is visible (true) or not (false)
	// returns:		the state of the menu
	// ------------------------------------------------------------------------
	let menuShown = (is) => {
		update((state) => {
			state.menuShown = is;

			return state;
		});

		return state.menuShown;
	};


	// purpose:		returns publicly visible methods to manage the store
	// ------------------------------------------------------------------------
	return {
		subscribe,
		setPage,
		setLevel,
		setSet,
		nextSet,
		setStep,
		lastSet,
		totalUpdate,
		isResting,
		popupShown,
		menuShown
	};
};



// exports
// ------------------------------------------------------------------------
export default state;