<script>

	// imports
	// ------------------------------------------------------------------------
	import appState from '../Data/state.svelte.js';


	// purpose:		on errors
	// ------------------------------------------------------------------------
	window.addEventListener('appError', (event) => {
		gtag('event', 'app', {
			'event_category': 'error',
			'event_label': event.detail.text
		});
	});

	// purpose:		when user installs the app as PWA (works on Android)
	// ------------------------------------------------------------------------
	window.addEventListener('appinstalled', () => {
		gtag('event', 'app', {
			'event_label': 'appInstalled',
			'value': 1
		});
	});

	// purpose:		when the info about the pwa is shown
	// ------------------------------------------------------------------------
	window.addEventListener('installPromptShown', () => {
		gtag('event', 'app', {
			'event_label': 'installPromptShown',
			'value': 1
		});
	});

	// purpose:		when user answers the install dialog ('accepted' or 'dismissed')
	// ------------------------------------------------------------------------
	window.addEventListener('installPromptAnswered', (event) => {
		gtag('event', 'app', {
			'event_label': 'installPrompt_' + event.detail.outcome,
			'value': 1
		});
	});

	// purpose:		when user tells us how many pushups he made on test
	// ------------------------------------------------------------------------
	window.addEventListener('testDataFilled', (event) => {
		gtag('event', 'test', {
			'event_label': 'pushups',
			'value': event.detail.pushups
		});
	})

	// purpose:		when user goes through the next step of training, not when
	//				the app starts or the step goes back to the first one
	// ------------------------------------------------------------------------
	let lastStep = appState.currentStep;

	$effect(() => {
		let step = appState.currentStep;

		if(step > lastStep){
			gtag('event', 'training', {
				'event_label': 'step',
				'value': step
			});
		}

		lastStep = step;
	});

	// purpose:		when a screen is viewed
	// ------------------------------------------------------------------------
	$effect(() => {
		gtag('event', 'page', {
			'event_label': appState.page,
			'value': 1
		});
	});


	// purpose:		when user sets a level after the test (or manually)
	// ------------------------------------------------------------------------
	window.addEventListener('leveled', (event) => {
		gtag('event', 'test', {
			'event_label': 'leveled',
			'value': event.detail.level
		});
	});

	// purpose:		when user finishes the training
	// ------------------------------------------------------------------------
	window.addEventListener('finished', (event) => {
		gtag('event', 'finished', {
			'event_label': event.detail.howWasIt,
			'value': event.detail.level * 100 + event.detail.set
		});
	});

	// purpose:		when user resets the app
	// ------------------------------------------------------------------------
	window.addEventListener('appReset', () => {
		gtag('event', 'app', {
			'event_label': 'reset'
		});
	});

	// purpose:		when user manually enters skill level
	// ------------------------------------------------------------------------
	window.addEventListener('manualSkill', (event) => {
		gtag('event', 'app', {
			'event_label': 'manualSkill',
			'value': event.detail.level * 100 + event.detail.set
		});
	});

	// purpose:		when user cancels a training
	// ------------------------------------------------------------------------
	window.addEventListener('trainingCanceled', (event) => {
		gtag('event', 'app', {
			'event_label': 'trainingCanceled',
			'value': event.detail.level * 100 + event.detail.set
		});
	});

	// purpose:		when user visits the menu, not when it is closed
	// ------------------------------------------------------------------------
	$effect(() => {
		if(!appState.menu){ return; }

		gtag('event', 'menu', {
			'event_label': appState.menu
		});
	});

</script>