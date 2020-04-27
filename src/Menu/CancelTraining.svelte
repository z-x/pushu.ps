<!--  
	menu: cancel active training
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import state from '../Data/state.js';
	import string from '../Data/translations.js';
	import Submenu from '../UI/Submenu.svelte';


	// purpose:		cancels current training and clears all it's data
	// ------------------------------------------------------------------------
	function cancelTraining(){
		state.isResting(false);
		state.setStep(0);
		state.setPage('Home');
	};

</script>




<Submenu
	menuId="CancelTraining"
	contentClass="menu-question menu-article"
	buttonBackLabel="{ string.no }"
	buttonNextLabel="{ string.yes }"
	buttonNextAction="{ () => cancelTraining() }"
>

	<h2>{string.sureToCancel}</h2>

</Submenu>