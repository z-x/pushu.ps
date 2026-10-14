<!--  
	menu: resetting the app
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import appState from '../Data/state.svelte.js';
	import string from '../Data/translations.js';
	import Menu from '../UI/Menu.svelte';


	// purpose:		resets the user progress, the settings are kept
	// returns:		dispatches a 'appReset' event and redirects to Hello page
	// ------------------------------------------------------------------------
	function resetApp(){
		window.dispatchEvent(new CustomEvent('appReset'));

		appState.reset();
	};

</script>




<Menu
	contentClass="menu-article menu-question"
	buttonBackLabel={string.cancel}
	buttonNextLabel={string.iAmSure}
	buttonNextAction={resetApp}
>
	<h2>{string.resetQuestion}</h2>
	<p>{@html string.resetNote}</p>
</Menu>