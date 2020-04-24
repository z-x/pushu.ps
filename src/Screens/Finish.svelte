<!--  
	When the user finishes a set
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import { onDestroy } from 'svelte';
	import state from '../Data/state.js';
	import string from '../Data/translations.js';
	import training from '../Data/training.js';
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

		// analytics
		gtag('event', 'finished', {'howWasIt': 'hard', 'level': $state.level, 'set': $state.set});
	}

	// purpose:		if user says the set was easy, let's move him to next one
	// return:		sets next training and redirects to home screen
	// ------------------------------------------------------------------------
	function easy(){
		if(Object.keys(training[$state.level]).length !== $state.set){
			state.nextSet();
		}
		state.setPage('Home');

		// analytics
		gtag('event', 'finished', {'howWasIt': 'easy', 'level': $state.level, 'set': $state.set});
	}


	// analytics
	gtag('event', 'viewed', {'page': 'finish'});

</script>

<style>

	.content {
		margin-top: 30vh;
		margin-bottom: auto;
	}

	@media (max-height: 420px){
		.content {
			margin-top: 10vh;
		}
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