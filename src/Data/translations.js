/*
	All the strings and their translations
*/



// the variable that sets the app language
// hardcoded currently as there are no translations available
// ------------------------------------------------------------------------
let lang = localStorage.language;


// purpose:		checks if the PluralRules API is available and returns
//				corresponding string based on given number
// arguments: 	number of items (int)
//				strings (object that contains 'many', 'few', 'one' and 'other')
// return:		a string that is right for given number
// ------------------------------------------------------------------------
function intlNumber(number, strings){
	if('PluralRules' in Intl){
		let rules = new Intl.PluralRules(lang);

		return strings[rules.select(number)];
	} else {
		return strings['other'];
	}
};


// purpose:		the translations
// ************************************************************************
let translations = {
	'en-US': {
		// shared in the whole app
		// ------------------------------------------------------------------------
		pushups: (howMany) => {
			let strings = {many: 'pushups', few: 'pushups', one: 'pushup', other: 'pushups'};
			
			return intlNumber(howMany, strings);
		},

		seconds: (howMany) => {
			let strings = {many: 'seconds', few: 'seconds', one: 'second', other: 'seconds'}

			return intlNumber(howMany, strings);
		},

		// screen: 	hello
		// ------------------------------------------------------------------------
		helloThere: 'Hello there, this is a simple pushups tracking app',
		progressRemember: 'It will remember your progress only on this device',
		saveAppApple: 'If you are using an iPhone, you need to add this website to your Home Screen for it to remember the data',
		saveAppAndroid: 'You can add this website to your Home Screen to access it quicker next time',
		wantToStart: 'Ok, I want to start',

		// screen: 	test
		// ------------------------------------------------------------------------
		firstTestYourself: 'At first you need to test yourself',
		doAsManyPushups: 'Do as many pushups in a single try as you can',
		iDid: 'I did',
		niceGoRest: 'Nice! Remember to take a full day of rest before you start the training.',
		whatsNext: 'Ok, what’s next?',

		// screen: 	home
		// ------------------------------------------------------------------------
		lastDay: 'Last day',
		comingUp: 'Coming up',
		currentLevel: 'Current level',
		startNextTraining: 'Start next training',

		// screen: 	training
		// ------------------------------------------------------------------------
		perform: 'Perform',
		letsJust: 'let’s just',
		restFor: 'rest for',
		skipTheWait: 'Skip the wait',
		madeIt: 'I made it',

		// screen: 	finish
		// ------------------------------------------------------------------------
		nice: 'Nice,',
		youveMadeIt: 'You’ve made it',
		wasItHard: 'Was it hard?',
		itWasHard: 'It was hard',
		itWasOk: 'It was ok'
	}
};



// exports
// ------------------------------------------------------------------------
export default translations[lang];