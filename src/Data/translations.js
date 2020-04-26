/*
	All the strings and their translations
*/



// the variable that sets the app language
// hardcoded currently as there are no translations available
// ------------------------------------------------------------------------
if(!localStorage.language){ localStorage.language = 'en-US'; }
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

		back: 'Back',
		cancel: 'Cancel',
		accept: 'Accept',

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
		tryHalfPushups: 'Nice! If you feel that it might be too hard, you might be doing knee push ups instead. Either way, take a day of rest before next training.',
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
		itWasOk: 'It was ok',

		// screen: 	menu, manually set your training level
		// ------------------------------------------------------------------------
		setYourSkillTo: 'Set your skill to:',
		beginner: 'beginner',
		intermediate: 'intermediate',
		advanced: 'advanced',
		setYourLevelTo: 'Set your level to:',

		// screen: 	menu, reset the app
		// ------------------------------------------------------------------------
		resetQuestion: 'Are you sure that you want to reset the app? Please keep in mind that this will <strong>erase all your progress</strong>.',
		iAmSure: 'I am sure',
		instructions: `
		<h2>How to start?</h2>
		<p>You just need to do the initial test to tell the app on what level are you. Then you need to take a day of rest. After that the app will provide you with a set of pushups to do. I recomend you do this three days a week and <strong>after each set you should take a day of rest</strong>. Monday, Wednesday and Friday for example.</p>
		<p>It may be hard at the begining, so don’t give up easily. It gets better down the road.</p>
		<h2>I barely can do a single pushup</h2>
		<p>If you feel your muscles are too week you might consider training with half push ups. This will give you time to build some muscle. When you’ll find you are ready, you can reset the app and start all over with full push up.</p>
		<h2>Is this a professional workout?</h2>
		<p>I am no professional trainer and this is just a simple training for simple people that I found useful to maintain a good form.</p>
		<h2>How to do a good push up?</h2>
		<p>You can easily find a guidance on YouTube. :)</p>
		<p>What I found particullary useful is to equip yourself with a set of push up handles/bars. Later on when there are a lot of push ups to do my wrists were hurt. Buying the cheapest handles fixed that.</p>
		<div class="video">
			<iframe width="560" height="315" src="https://www.youtube.com/embed/vt-IbHbN7S8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
		<p>If you feel you will have tough time doing full push ups you can always make it a little easier by resting on your knees.</p>
		<div class="video">
			<iframe width="560" height="315" src="https://www.youtube.com/embed/WcHtt6zT3Go" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
		<h2>Is there a goal here?</h2>
		<p>You set the goal. The app will ask you if the proposed set of pushups was hard or easy to make. If you answer it was hard, it will let you do the same set untill it gets easier. Then it will propose another set with more push ups to make.</p>
		<p>You can continue as long as you can or choose to stop at any level and just repeat a single set to maintain your level.</p>
		<p>I also like to start from the begining from time to time by resetting the app and build my way up from the first level all over.</p>
		<h2>How you use this app?</h2>
		<p>I recommend that you open this app on your phone as it is easier to take with you wherever you will do the workout.</p>
		<p>You can install the app by adding this website to your Home Screen.</p>
		<p>For Apple users this is the only way for the app to remember your progress. Apple devices tend to remove the saved data after a week of not using any website and the only way to prevent this is by adding it to Home Screen.</p>
		<p>Android users can add this website to their Home Screen as well to be able to use it as a normal system application.</p>
		`
	}
};



// exports
// ------------------------------------------------------------------------
export default translations[lang];