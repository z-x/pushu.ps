<!--  
	menu: cancel active training
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import appState from '../Data/state.svelte.js';
	import string from '../Data/translations.js';
	import Menu from '../UI/Menu.svelte';


	// purpose:		cancels current training and clears all it's data
	// returns:		triggers 'trainingCanceled' event and redirect to Home page
	// ------------------------------------------------------------------------
	function cancelTraining(){
		window.dispatchEvent(new CustomEvent('trainingCanceled', { detail: {level: appState.level, set: appState.set} }));

		appState.setResting(false);
		appState.setStep(0);
		appState.setPage('Home');
	};

</script>




<Menu
	menuId="CancelTraining"
	contentClass="menu-question menu-article"
	buttonBackLabel={string.no}
	buttonNextLabel={string.yes}
	buttonNextAction={() => cancelTraining()}
>

	<h2>{string.sureToCancel}</h2>

</Menu>