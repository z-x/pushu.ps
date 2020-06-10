<script>

	import { onMount } from 'svelte';
	import string from './Data/translations.js';
	import Analytics from './Helpers/Analytics.svelte';
	import Error from './UI/Error.svelte';
	import handleError from './Helpers/handleError.js';

	// pages
	// ------------------------------------------------------------------------
	import Hello from './Screens/Hello.svelte';
	import Test from './Screens/Test.svelte';
	import Home from './Screens/Home.svelte';
	import Training from './Screens/Training.svelte';
	import Finish from './Screens/Finish.svelte';
	import News from './Screens/News.svelte';

	// menus
	// ------------------------------------------------------------------------
	import Main from './Menu/Main.svelte';
	import ResetApp from './Menu/ResetApp.svelte';
	import ManualTrainingLevel from './Menu/ManualTrainingLevel.svelte';
	import Instructions from './Menu/Instructions.svelte'
	import PrivacyPolicy from './Menu/PrivacyPolicy.svelte';
	import CancelTraining from './Menu/CancelTraining.svelte';
	import ManualLanguage from './Menu/ManualLanguage.svelte';

	// stores
	// ------------------------------------------------------------------------
	import state from './Data/state.js';
	import translations from './Data/translations.js';


	// app possible states
	// ------------------------------------------------------------------------
	let pages = {Hello, Test, Home, Training, Finish};
	let menus = {Main, ResetApp, ManualTrainingLevel, Instructions, PrivacyPolicy, CancelTraining, ManualLanguage};


	// if iOS app in fullscreen mode add class
	// ------------------------------------------------------------------------
	if(window.navigator.standalone === true){
		document.documentElement.classList.add('app-appleFullscreen');
	}


	// enable 'add to home screen' on chrome mobile
	// ------------------------------------------------------------------------
	// register the (empty) service worker
	// doing this in onMount so the <Analytics /> code would be already available
	onMount(() => {
		if('serviceWorker' in navigator){
			navigator.serviceWorker.register('/service-worker.js')
				.catch((error) => {
					new handleError(string.errorServiceWorker);
				});
		};

		// cache the install prompt
		let deferredInstallPrompt;

		window.addEventListener('beforeinstallprompt', (event) => {
			// prevent the infobar from appearing on mobile
			event.preventDefault();
			// save the event to trigger it later
			deferredInstallPrompt = event;
		});

		if($state.page === 'Home' && localStorage.installPromptShown === 'false' && deferredInstallPrompt){
			deferredInstallPrompt.prompt();
			localStorage.installPromptShown = true;

			// trigger the event for the analytics data
			window.dispatchEvent(new CustomEvent('installPromptShown'));
		}

	});


	// if user came here after a day, reset his training or test
	// ------------------------------------------------------------------------
	if((Date.now() - $state.lastActive > 86400000)){
		if($state.page === 'Training') {
			state.setStep(0);
			state.isResting(0);
			state.setPage('Home');
		}
		else if($state.page === 'Test'){
			state.setPage('Hello');
		}
	}

</script>


<Analytics />

<News />

<main
	class="app"
	class:app-unfocused="{ $state.popupShown || $state.menu }"
	class:app-menuShown="{ $state.menu }"
>
	<svelte:component this="{ pages[$state.page] }" />
</main>

{#if $state.menu}
	<svelte:component this="{ menus[$state.menu] }" />
{/if}

<Error />