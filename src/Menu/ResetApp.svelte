<!--  
	menu: resetting the app
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import state from '../Data/state.js';
	import string from '../Data/translations.js';
	import Menu from '../UI/Menu.svelte';


	// purpose:		resets all the app data
	// returns:		dispatches a 'appReset' event and redirects to Hello page
	// ------------------------------------------------------------------------
	function resetApp(){
		window.dispatchEvent(new CustomEvent('appReset'));

		localStorage.clear();
		state.setLevel(1);
		state.setSet(1);
		state.setStep(0);
		state.setPage('Hello');
	};

</script>




<Menu
	menuId="ResetApp"
	contentClass="menu-article menu-question"
	buttonBackLabel="{ string.cancel }"
	buttonNextLabel="{ string.iAmSure }"
	buttonNextAction="{ () => resetApp() }"
>
	<h2>{string.resetQuestion}</h2>
	<p>{@html string.resetNote}</p>
</Menu>