<script>

	// imports
	// ------------------------------------------------------------------------
	import appState from '../Data/state.js';


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

	// purpose:		when user tells us how many pushups he made on test
	// ------------------------------------------------------------------------
	window.addEventListener('testDataFilled', (event) => {
		gtag('event', 'test', {
			'event_label': 'pushups',
			'value': event.detail.pushups
		});
	})

	// purpose:		when user goes through the next step of training
	// ------------------------------------------------------------------------
	let currentStep = $derived($appState.currentStep);

	$effect(() => {
		gtag('event', 'training', {
			'event_label': 'step',
			'value': currentStep
		});
	});

	// purpose:		when a screen is viewed
	// ------------------------------------------------------------------------
	let page = $derived($appState.page);

	$effect(() => {
		gtag('event', 'page', {
			'event_label': page,
			'value': 1
		});
	});


	// purpose:		when user sets a level after training (or manually)
	// ------------------------------------------------------------------------
	let level = $derived($appState.level);

	$effect(() => {
		gtag('event', 'test', {
			'event_label': 'leveled',
			'value': level
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

	// purpose:		when user visits the menu
	// ------------------------------------------------------------------------
	let menu = $derived($appState.menu);

	$effect(() => {
		gtag('event', 'menu', {
			'event_label': menu
		});
	});

</script>