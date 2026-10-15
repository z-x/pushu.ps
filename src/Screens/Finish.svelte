<!--  
	When the user finishes a set
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import appState from '../Data/state.svelte.js';
	import string from '../Data/translations.js';
	import training from '../Data/training.js';
	import { slide } from '../Helpers/transitions.js';
	import MainAction from '../UI/MainAction.svelte';
	import Sidebar from '../UI/Sidebar.svelte';


	// purpose:		resets the training progress, so the next training starts
	//				from the first pushups, done here and not when this screen
	//				is destroyed, as that can happen after the next training starts
	// ------------------------------------------------------------------------
	function resetTraining(){
		appState.setStep(0);
		appState.setResting(0);
	};


	// purpose:		we want the user to repeat this set if it was hard for him
	// return: 		triggers an 'finished' event and redirects to the home screen
	// ------------------------------------------------------------------------
	function hard(){
		let finished = {level: appState.level, set: appState.set};

		resetTraining();
		appState.setPage('Home');

		window.dispatchEvent(new CustomEvent('finished', {detail: {howWasIt: 'hard', ...finished}}));
	};

	// purpose:		if user says the set was easy, let's move him to next one
	// return:		triggers an 'finished', sets next training and redirects to home screen or congrats page if passed 100 pushups
	// ------------------------------------------------------------------------
	function easy(){
		// the finished training, read before it is moved to the next set
		let finished = {level: appState.level, set: appState.set};

		resetTraining();

		if(Object.keys(training[appState.level]).length !== appState.set){
			appState.nextSet();
		}

		if(appState.pushupsLast >= 100 && !appState.congratsShown){
			appState.setPage('Congrats');
		} else {
			appState.setPage('Home');
		}

		window.dispatchEvent(new CustomEvent('finished', {detail: {howWasIt: 'easy', ...finished}}));
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

<section class="main" in:slide|global out:slide|global={{ direction: 'out' }}>
	<div class="content">
		<p>{string.nice}<br> {string.youveMadeIt}</p>
		<p>{string.wasItHard}</p>
	</div>

	<MainAction delay={600} onMainAction={hard}>{string.itWasHard}</MainAction>
	<MainAction delay={400} onMainAction={easy}>{string.itWasOk}</MainAction>
</section>
