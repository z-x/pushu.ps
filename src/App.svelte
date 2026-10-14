<script>

	import { onMount } from 'svelte';
	import string from './Data/translations.js';
	import Analytics from './Helpers/Analytics.svelte';
	import ErrorMessage from './UI/Error.svelte';
	import handleError from './Helpers/handleError.js';
	import MainAction from './UI/MainAction.svelte';
	import Sidebar from './UI/Sidebar.svelte';

	// pages
	// ------------------------------------------------------------------------
	import Hello from './Screens/Hello.svelte';
	import Test from './Screens/Test.svelte';
	import Home from './Screens/Home.svelte';
	import Training from './Screens/Training.svelte';
	import Finish from './Screens/Finish.svelte';
	import Congrats from './Screens/Congrats.svelte';
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

	// state and data
	// ------------------------------------------------------------------------
	import appState from './Data/state.svelte.js';


	// app possible states
	// ------------------------------------------------------------------------
	let pages = {Hello, Test, Home, Training, Finish, Congrats};
	let menus = {Main, ResetApp, ManualTrainingLevel, Instructions, PrivacyPolicy, CancelTraining, ManualLanguage};

	// currently shown page and menu components
	let Page = $derived(pages[appState.page]);
	let MenuScreen = $derived(menus[appState.menu]);
	// the app screen moves up to make space for the shown menu
	let menuOffset = $derived(appState.menu ? appState.menuHeight : 0);


	// if iOS app in fullscreen mode add class
	// ------------------------------------------------------------------------
	if(window.navigator.standalone === true){
		document.documentElement.classList.add('app-appleFullscreen');
	}


	// register the service worker for the offline mode and installing the app
	// (the install buttons are handled in Helpers/install.svelte.js)
	// doing this in onMount so the <Analytics /> code would be already available
	// ------------------------------------------------------------------------
	onMount(() => {
		if('serviceWorker' in navigator){
			navigator.serviceWorker.register('/service-worker.js')
				.catch((error) => {
					new handleError(string.errorServiceWorker);
				});
		};
	});


	// purpose:		logs the error when a screen fails to render, the user
	//				is shown a fallback screen instead of a blank page
	// arguments:	the error thrown while rendering the screen
	// ------------------------------------------------------------------------
	function screenError(error){
		new handleError(string.errorScreen, false, error);
	};


	// if user came here after a day, reset his training or test
	// ------------------------------------------------------------------------
	if((Date.now() - appState.lastActive > 86400000)){
		if(appState.page === 'Training') {
			appState.setStep(0);
			appState.setResting(0);
			appState.setPage('Home');
		}
		else if(appState.page === 'Test'){
			appState.setPage('Hello');
		}
	}

</script>


<Analytics />

<News />

<main
	class={['app', (appState.popupShown || appState.menu) && 'app-unfocused', appState.menu && 'app-menuShown']}
	style:transform={menuOffset ? `translateY(-${menuOffset}px)` : null}
>
	<svelte:boundary onerror={screenError}>
		<Page />

		{#snippet failed(error, reset)}
			<Sidebar />

			<section class="main">
				<div class="content content-readable">
					<p class="text-title">{string.errorScreen}</p>
				</div>

				<MainAction onMainAction={reset}>{string.errorTryAgain}</MainAction>
			</section>
		{/snippet}
	</svelte:boundary>
</main>

{#if appState.menu}
	<MenuScreen />
{/if}

<ErrorMessage />
