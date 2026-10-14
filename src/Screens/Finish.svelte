<!--  
	When the user finishes a set
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import { onDestroy } from 'svelte';
	import appState from '../Data/state.js';
	import string from '../Data/translations.js';
	import training from '../Data/training.js';
	import { slide } from '../Helpers/transitions.js';
	import MainAction from '../UI/MainAction.svelte';
	import Sidebar from '../UI/Sidebar.svelte';


	// reset current state when user finishes the training
	onDestroy(() => {
		appState.setStep(0);
		appState.isResting(0);
	});


	// purpose:		we want the user to repeat this set if it was hard for him
	// return: 		triggers an 'finished' event and redirects to the home screen
	// ------------------------------------------------------------------------
	function hard(){
		appState.setPage('Home');

		window.dispatchEvent(new CustomEvent('finished', {detail: {howWasIt: 'hard', 'level': $appState.level, 'set': $appState.set}}));
	};

	// purpose:		if user says the set was easy, let's move him to next one
	// return:		triggers an 'finished', sets next training and redirects to home screen or congrats page if passed 100 pushups
	// ------------------------------------------------------------------------
	function easy(){
		if(Object.keys(training[$appState.level]).length !== $appState.set){
			appState.nextSet();
		}

		if($appState.pushupsLast >= 100 && !$appState.congratsShown){
			appState.setPage('Congrats');
		} else {
			appState.setPage('Home');
		}

		window.dispatchEvent(new CustomEvent('finished', {detail: {howWasIt: 'hard', 'level': $appState.level, 'set': $appState.set}}));
	};

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

<section class="main" in:slide|global out:slide|global="{ {direction: 'out'} }">
	<div class="content">
		<p>{string.nice}<br> {string.youveMadeIt}</p>
		<p>{string.wasItHard}</p>
	</div>

	<MainAction delay="600" onMainAction={hard}>{string.itWasHard}</MainAction>
	<MainAction delay="400" onMainAction={easy}>{string.itWasOk}</MainAction>
</section>
