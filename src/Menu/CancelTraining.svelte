<!--  
	menu: cancel active training
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import state from '../Data/state.js';
	import string from '../Data/translations.js';
	import Menu from '../UI/Menu.svelte';


	// purpose:		cancels current training and clears all it's data
	// returns:		triggers 'trainingCanceled' event and redirect to Home page
	// ------------------------------------------------------------------------
	function cancelTraining(){
		window.dispatchEvent(new CustomEvent('trainingCanceled', { detail: {level: $state.level, set: $state.set} }));

		state.isResting(false);
		state.setStep(0);
		state.setPage('Home');
	};

</script>




<Menu
	menuId="CancelTraining"
	contentClass="menu-question menu-article"
	buttonBackLabel="{ string.no }"
	buttonNextLabel="{ string.yes }"
	buttonNextAction="{ () => cancelTraining() }"
>

	<h2>{string.sureToCancel}</h2>

</Menu>