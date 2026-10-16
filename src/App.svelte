<script>

	import { onMount } from 'svelte';
	import string from './Data/translations.js';
	import './Helpers/analytics.svelte.js';
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
	// doing this after the page has loaded, so caching the app files for offline use
	// would not slow down loading them for the first time
	// ------------------------------------------------------------------------
	onMount(() => {
		if(!('serviceWorker' in navigator)){ return; }

		let register = () => {
			navigator.serviceWorker.register('/service-worker.js')
				.catch((error) => {
					handleError(string.errorServiceWorker, true, error);
				});
		};

		if(document.readyState === 'complete'){
			register();
		} else {
			window.addEventListener('load', register, { once: true });
		}
	});


	// purpose:		logs the error when a screen fails to render, the user
	//				is shown a fallback screen instead of a blank page
	// arguments:	the error thrown while rendering the screen
	// ------------------------------------------------------------------------
	function screenError(error){
		handleError(string.errorScreen, false, error);
	};


	// if the saved page is unknown (the saved data is broken), start from the beginning
	// ------------------------------------------------------------------------
	if(!pages[appState.page]){
		appState.setPage('Hello');
	}


	// if user came here after a day, reset his training or test, this is checked
	// also when the app is shown again, as it can stay open in the background
	// ------------------------------------------------------------------------
	appState.markActive();

</script>


<svelte:document onvisibilitychange={() => { if(document.visibilityState === 'visible'){ appState.markActive(); } }} />

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
