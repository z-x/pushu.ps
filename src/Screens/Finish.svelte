<!--  
	When the user finishes a set
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import { onDestroy } from 'svelte';
	import string from '../Data/translations.js';
	import state from '../Data/state.js';
	import { slide } from '../Helpers/transitions.js';
	import MainAction from '../UI/MainAction.svelte';
	import Sidebar from '../UI/Sidebar.svelte';


	// reset current state when user finishes the training
	onDestroy(() => {
		state.setStep(0);
		state.isResting(0);
	});


	// purpose:		we want the user to repeat this set if it was hard for him
	// return: 		redirects to the home screen
	// ------------------------------------------------------------------------
	function hard(){
		state.setPage('Home');
	}

	// purpose:		if user says the set was easy, let's move him to next one
	// return:		sets next training and redirects to home screen
	// ------------------------------------------------------------------------
	function easy(){
		state.nextSet();
		state.setPage('Home');
	}

</script>

<style>

	.content {
		margin-top: 30vh;
		margin-bottom: auto;
	}

	p {
		margin-bottom: .8em;
	}

</style>




<Sidebar />

<section class="main" in:slide out:slide="{ {direction: 'out'} }">
	<div class="content">
		<p>{string.nice}<br> {string.youveMadeIt}</p>
		<p>{string.wasItHard}</p>
	</div>

	<MainAction delay="600" on:mainAction="{ hard }">{string.itWasHard}</MainAction>
	<MainAction delay="400" on:mainAction="{ easy }">{string.itWasOk}</MainAction>
</section>