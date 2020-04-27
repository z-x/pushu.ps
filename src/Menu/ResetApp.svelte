<!--  
	menu: resetting the app
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import state from '../Data/state.js';
	import string from '../Data/translations.js';
	import Submenu from '../UI/Submenu.svelte';


	// purpose:		resets all the app data
	// ------------------------------------------------------------------------
	function resetApp(){
		localStorage.clear();
		state.setLevel(1);
		state.setSet(1);
		state.setStep(0);
		state.setPage('Hello');
	};

</script>




<Submenu
	menuId="ResetApp"
	contentClass="menu-article menu-question"
	buttonBackLabel="{ string.cancel }"
	buttonNextLabel="{ string.iAmSure }"
	buttonNextAction="{ () => resetApp() }"
>
	<h2>{string.resetQuestion}</h2>
	<p>{@html string.resetNote}</p>
</Submenu>