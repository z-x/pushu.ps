/*
	All the strings and their translations
*/



// purpose:		checks if the PluralRules API is available and returns
//				corresponding string based on given number
// arguments: 	number of items (int)
//				strings (object that contains 'many', 'few', 'one' and 'other')
// return:		a string that is right for given number
// ------------------------------------------------------------------------
function intlNumber(number, strings){
	if('PluralRules' in Intl){
		let rules = new Intl.PluralRules(localStorage.language);

		return strings[rules.select(number)];
	} else {
		return strings['other'];
	}
};


// purpose:		the translations
// ************************************************************************
let translations = {

	// purpose:		english
	// ************************************************************************
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
		yes: 'Yes',
		menuEmpty: 'This menu seems to be empty',

		// screen: 	hello
		// ------------------------------------------------------------------------
		helloThere: 'Hello there, this is a simple pushup tracking app',
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
		tryHalfPushups: 'If you feel that it might be too hard, you might train by doing knee push ups. Either way, take a day of rest before next training.',
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

		// screen: 	menu, main
		// ------------------------------------------------------------------------
		appCreatedSecondGate: 'App created behind the Second Gate',
		privacyPolicy: 'Privacy Policy',
		instructions: 'Instructions',
		cancelTraining: 'Cancel this training',
		manuallySetTrainingLevel: 'Manually set your training level',
		resetApp: 'Reset the app',
		setLanguage: 'Set app language',

		// screen: 	menu, manually set your training level
		// ------------------------------------------------------------------------
		setYourSkillTo: 'Set your skill to:',
		beginner: 'Beginner',
		intermediate: 'Intermediate',
		advanced: 'Advanced',
		setYourLevelTo: 'Set your level to:',

		// screen: 	menu, reset the app
		// ------------------------------------------------------------------------
		resetQuestion: 'Are you sure that you want to reset the app?',
		resetNote: 'Please keep in mind that this will <strong>erase all your progress</strong>.',
		iAmSure: 'I am sure',

		// screen: 	menu, instructions
		// ------------------------------------------------------------------------
		instructionsContent: `
		<h2>How to start?</h2>
		<p>You just need to do the initial test to tell the app on what level you are. Then you need to take a day of rest. After that the app will provide you with a set of pushups to do. I recomend you do this three days a week and <strong>after each set you should take a day of rest</strong>. Monday, Wednesday and Friday for example.</p>
		<p>It may be hard at the begining, so don’t give up easily. It gets better down the road.</p>
		<h2>I barely can do a single pushup</h2>
		<p>If you feel your muscles are too weak you might consider training with knee push ups. This will give you time to build some muscle. When you’ll find you are ready, you can reset the app and start all over with a full push up.</p>
		<h2>Is this a professional workout?</h2>
		<p>I am no professional trainer and this is just a simple training for simple people that I found useful to maintain a good form.</p>
		<h2>How to do a good push up?</h2>
		<p>You can easily find guidance on YouTube. :)</p>
		<p>What I found particullary useful is to equip yourself with a set of push up handles/bars. Later on when there were a lot of push ups to do my wrists were hurting. Buying even the cheapest handles fixed that.</p>
		<div class="video">
			<iframe width="560" height="315" src="https://www.youtube.com/embed/vt-IbHbN7S8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
		<p>If you have a tough time doing full push ups you can always make it a little easier by resting on your knees.</p>
		<div class="video">
			<iframe width="560" height="315" src="https://www.youtube.com/embed/WcHtt6zT3Go" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
		<h2>Is there a goal here?</h2>
		<p>You set the goal. The app will ask you if the proposed set of pushups was hard or easy to do. If you answer it was hard, it will let you do the same set untill it gets easier. Then it will propose another set with more push ups.</p>
		<p>You can continue as long as you can or choose to stop at any level and just repeat a single set to maintain your level.</p>
		<p>I also like to start from the begining from time to time by resetting the app and build my way up from the first level all over.</p>
		<h2>How you use this app?</h2>
		<p>I recommend that you open this app on your phone as it is easier to take with you wherever you will do the workout.</p>
		<p>You can install the app by adding this website to your Home Screen.</p>
		<p>For Apple users this is the only way for the app to remember your progress. Apple devices tend to remove the saved data after a week of not using any website and the only way to prevent this is by adding it to Home Screen.</p>
		<p>Android users can add this website to their Home Screen as well to be able to use it as a normal system application.</p>
		`,

		// screen: 	menu, cancel current training
		// ------------------------------------------------------------------------
		sureToCancel: 'Are you sure to cancel the training?',

		// screen: 	menu, privacy policy
		// ------------------------------------------------------------------------
		privacyPolicyContent: `
		<h2>I do:</h2>
		<ul>
			<li>Collect the data about how you are using the app.</li>
			<li>Collect the data about your progress and your level.</li>
			<li>Collect the data about the browser and the device you are using with help of Google Analytics, please refer to their <a href="https://policies.google.com/privacy">Privacy Policy</a> for the detailed information about what data is being collected.</li>
			<li>Save the data on this device (information about your settings and your progress) using localStorage API.</li>
		</ul>
		<h2>Why?</h2>
		<p>I collect the data so I could improve the app in future. For example by implementing machine learning algorithm that could prepare personalised trainings instead predefined ones.</p>
		<p>I also collect the data to know if anyone is really using the app. :)</p>
		`,

		// screen: 	menu, manually set language
		// ------------------------------------------------------------------------
		setYourLanguageTo: 'Set your language to:'
	},

	// purpose:		polish
	// ************************************************************************
	'pl-PL': {
		// shared in the whole app
		// ------------------------------------------------------------------------
		pushups: (howMany) => {
			let strings = {many: 'pompek', few: 'pompki', one: 'pompkę', other: 'pompek'};
			
			return intlNumber(howMany, strings);
		},

		seconds: (howMany) => {
			let strings = {many: 'sekund', few: 'sekundy', one: 'sekundę', other: 'sekundy'}

			return intlNumber(howMany, strings);
		},

		back: 'Cofnij',
		cancel: 'Anuluj',
		accept: 'Akceptuj',
		yes: 'Tak',
		menuEmpty: 'To menu wydaje się być puste',

		// screen: 	hello
		// ------------------------------------------------------------------------
		helloThere: 'Cześć, ta apka pomoże Ci ćwiczyć pompki',
		progressRemember: 'Twoje postępy zostaną zapisane tylko na tym urządzeniu',
		saveAppApple: 'Jeśli używasz urządzeń Apple musisz dodać tę apkę do swojego ekranu domowego, inaczej dane o Twoich postępach mogą zostać usunięte. :<',
		saveAppAndroid: 'Możesz zainstalować tę apkę na swoim ekranie głównym, żeby mieć do niej szybszy dostęp.',
		wantToStart: 'Dobra, zaczynamy',

		// screen: 	test
		// ------------------------------------------------------------------------
		firstTestYourself: 'Na początek musisz się przetestować',
		doAsManyPushups: 'Sprawdź jak dużo pompek naraz jesteś w stanie zrobić',
		iDid: 'Robię',
		niceGoRest: 'Nieźle! Pamiętaj o dniu odpoczynku po każdej sesji treningowej.',
		tryHalfPushups: 'Jeśli czujesz, że to za trudne, możesz na początek spróbować ćwiczyć opierając się na kolanach. Tak czy inaczej – pamiętaj o dniu przerwy po każdym treningu.',
		whatsNext: 'Dobra, co dalej?',

		// screen: 	home
		// ------------------------------------------------------------------------
		lastDay: 'Poprzednio',
		comingUp: 'Kolejny',
		currentLevel: 'Twój poziom',
		startNextTraining: 'Zaczynamy trening',

		// screen: 	training
		// ------------------------------------------------------------------------
		perform: 'Zrób',
		letsJust: 'Odpocznij',
		restFor: 'przez',
		skipTheWait: 'Pomiń odpoczynek',
		madeIt: 'Zrobione',

		// screen: 	finish
		// ------------------------------------------------------------------------
		nice: 'Nieźle,',
		youveMadeIt: 'Udało się :-)',
		wasItHard: 'Jak było?',
		itWasHard: 'Było trudno',
		itWasOk: 'Było w porządku',

		// screen: 	menu, main
		// ------------------------------------------------------------------------
		appCreatedSecondGate: 'Apka stworzona za drugą bramą',
		privacyPolicy: 'Polityka prywatności',
		instructions: 'Instrukcje',
		cancelTraining: 'Przerwij trening',
		manuallySetTrainingLevel: 'Ustaw swój poziom ręcznie',
		resetApp: 'Zresetuj aplikację',
		setLanguage: 'Zmień język (set lang)',

		// screen: 	menu, manually set your training level
		// ------------------------------------------------------------------------
		setYourSkillTo: 'Twój stopień zaawansowania:',
		beginner: 'Początkujący',
		intermediate: 'Średni',
		advanced: 'Zaawansowany',
		setYourLevelTo: 'Twój poziom:',

		// screen: 	menu, reset the app
		// ------------------------------------------------------------------------
		resetQuestion: 'Na pewno chcesz zresetować apkę?',
		resetNote: 'Pamiętaj, że to <strong>usunie informacje o całym Twoim postępie</strong>.',
		iAmSure: 'Resetuj',

		// screen: 	menu, instructions
		// ------------------------------------------------------------------------
		instructionsContent: `
		<h2>Jak zacząć?</h2>
		<p>Na początek musisz się przetestować, żeby apka mogła dopasować trening do Ciebie. Po dniu przerwy apka będzie proponować Ci kolejne zestawy ćwiczeń. Proponuję ćwiczyć trzy razy w tygodniu i <strong>po każdym zestawie robić dzień odpoczynku</strong>.</p>
		<p>Nie będzie łatwo jeśli dopiero zaczynasz, ale po kilku sesjach zaczniesz zauważać postępy.</p>
		<h2>Robię ledwo jedną pompkę</h2>
		<p>Jeśli czujesz, że jest Ci za ciężko, spróbuj robić pompki opierając się na kolanach. Po kilku tygodniach treningu wzmocnisz mięśnie na tyle, żeby zresetować apkę i zacząć od początku robiąc pełne pompki.
		<h2>To profesjonalny zestaw ćwiczeń?</h2>
		<p>Zupełnie nie. Zrobiłem tę aplikację, żeby ułatwić sobie treningi, ale nie zajmuję się tym profesjonalnie.
		<h2>Jak robić poprawne pompki?</h2>
		<p>Najprościej szukać instrukcji na YouTube. :)</p>
		<p>Ja sam bardzo polecam zaopatrzyć się w uchwyty do pompek. Przy bardziej intensywnych treningach cierpiały mi nadgarstki, a uchwyty ten problem rozwiązały.</p>
		<div class="video">
			<iframe width="560" height="315" src="https://www.youtube.com/embed/_spPWlYR0bE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
		<p>Jeśli dopiero zaczynasz i ciężko jest ci zrobić kilka pompek, możesz zacząć od treningu opierając ciężar ciała na kolanach.</p>
		<div class="video">
			<iframe width="560" height="315" src="https://www.youtube.com/embed/nbBPTCnebSw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
		<h2>Czy to ma jakiś cel?</h2>
		<p>Cel zależy od Ciebie. Po każdym treningu apka zapyta Cię czy było ciężko. Jeśli odpowiesz, że tak – pozwoli Ci powtarzać serię aż uznasz, że jest łatwiej.</p>
		<p>Nie musisz ścigać się z innymi, wystarczy że dojdziesz do poziomu, który Cię zadowoli i pozwoli Ci utrzymać formę.</p>
		<p>Polecam od czasu do czasu zresetować apkę i zacząć od początku, wtedy fajnie widać jak duże postępy zrobiliśmy.</p>
		<h2>Jak używać Pushu.ps?</h2>
		<p>Najlepiej chyba otworzyć apkę na telefonie – będzie najłatwiej kontrolować przebieg treningu.</p>
		<p>Można ją też „zainstalować”, czyli dodać ikonkę do ekranu głównego. Będzie wtedy zawsze pod ręką.</p>
		<p>Użytkownicy sprzętu Apple nie mają wyboru, bo iOS usuwa dane aplikacji po tygodniu ich nieużywania. Żeby iPhone i iPad zapamiętywał dane, trzeba dodać stronę do ekranu głównego.</p>
		<p>Uzytkownicy Androida też mogą to zrobić, dzięki czemu będzie się jej używało jak każdej zwykłej aplikacji.</p>
		`,

		// screen: 	menu, cancel current training
		// ------------------------------------------------------------------------
		sureToCancel: 'Na pewno chcesz przerwać trening?',

		// screen: 	menu, privacy policy
		// ------------------------------------------------------------------------
		privacyPolicyContent: `
		<h2>Zbieram:</h2>
		<ul>
			<li>Dane o tym w jaki sposób używasz aplikacji.</li>
			<li>Dane o tym jakie robisz postępy w treningu.</li>
			<li>Dane o Twojej przeglądarce i użądzeniu przy pomocy Google Analytics. Dokładne informacje znajdziesz na stronie <a href="https://policies.google.com/privacy?hl=pl">polityki prywatności</a> w Google.</p>
		</ul>
		<p>Dane o Twoich postępach przechowywane są tylko na tym urządzeniu przy użyciu localStorage.</p>
		<h2>Dlaczego?</h2>
		<p>Dane zbierane są w sposób anonimowy dla mnie, choć Google pewnie jest w stanie namierzyć Cię dokładniej. Potrzebuję ich, żeby ulepszać apkę, np. chciałbym w przyszłosci posłużyć się uczeniem maszynowym, żeby automatycznie tworzyć program treningowy dostosowany jak najlepiej do Ciebie.</p>
		<p>Jestem też zwyczajnie ciekawy czy ktoś tego wszystkiego używa. :)</p>
		`,
	
		// screen: 	menu, manually set language
		// ------------------------------------------------------------------------
		setYourLanguageTo: 'Zmień język na:'
	}
};



// exports
// ------------------------------------------------------------------------
// supported languages list
let supportedLanguages = {
	'en-US': ['English', 'en-US', 'en', 'en-GB'],
	'pl-PL': ['Polski', 'pl-PL', 'pl']
}

// check for supported languages and if found, set it
if(!localStorage.language && navigator.language){
	let userLanguage = navigator.language;

	for(let [key, value] of Object.entries(supportedLanguages)){
		if(value.indexOf(userLanguage) >= 0){
			localStorage.language = key;
		}
	}
}

// if not found, set the default
if(!localStorage.language){
	localStorage.language = 'en-US';
}

// export the strings
let exports = {...translations[localStorage.language], supportedLanguages}

export default exports;