<!--  
	This is where all the training actions are
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import string from '../Data/translations.js';
	import appState from '../Data/state.svelte.js';
	import training from '../Data/training.js';
	import { slide } from '../Helpers/transitions.js';
	import NoSleep from '../Helpers/noSleep.js';
	import Sound from '../Helpers/sound.js';
	import MainAction from '../UI/MainAction.svelte';
	import Sidebar from '../UI/Sidebar.svelte';


	// prevent the screen from dimming
	// ------------------------------------------------------------------------
	// enabled on the first click as browsers require a user gesture for it
	$effect(() => {
		let noSleep = new NoSleep();
		let enableNoSleep = () => noSleep.enable();

		document.addEventListener('click', enableNoSleep, {once: true});

		return () => {
			document.removeEventListener('click', enableNoSleep);
			noSleep.disable();
		};
	});


	// get the training data
	// ------------------------------------------------------------------------
	// current set
	let currentSet = training[appState.level][appState.set];
	// the current pushups set
	let currentPushups = currentSet['pushups'];


	// purpose:		position the counter relative to sidebar value
	//				for current set
	// ------------------------------------------------------------------------
	// the position of the active sidebar item, set by the sidebar once it is shown
	let activePosition = $state(null);
	// the counter is moved a bit lower when the user is resting
	let counterOffset = $derived(!activePosition ? '0px'
		: appState.isResting ? `calc(${activePosition.top}px + var(--size-spacing) * 1.5)`
		: `${activePosition.top}px`
	);


	// purpose:		moves the user to next step of pushups/resting
	// ------------------------------------------------------------------------
	function nextStep(){
		// if it was the last pushups to make
		if(appState.currentStep === currentPushups.length-1){
			// update the user info about the amount of pushups he just did
			appState.lastSet(currentPushups.reduce((a, b) => a + b, 0));
			// and add those to the total he made
			appState.totalUpdate(currentPushups.reduce((a, b) => a + b, 0));

			// finally redirect the user to the finish screen
			appState.setPage('Finish');
		}
		// if there are more to do, rest first
		else {
			appState.setResting(1, defaultRest);
		}
	};


	// purpose:		runs all the resting behaviours
	// ------------------------------------------------------------------------
	// the time to rest for current set
	let defaultRest = currentSet['rest'];
	// the counter for current rest time left (seconds)
	let currentRest = $state(defaultRest);
	// the alert sounds
	let alert = new Sound('/audio/alert.mp3');
	let final = new Sound('/audio/final.mp3');

	// counts the rest down while the user is resting, the time left is taken
	// from the rest end time, so the rest keeps going when the phone is locked
	// or the app was closed, as the timers are paused in the background
	$effect(() => {
		if(!appState.isResting){ return; }

		// the rest started before the end time was saved, start it again
		if(!appState.restEndsAt){
			appState.setResting(1, defaultRest);
		}

		let tick = () => {
			// the rest was ended elsewhere (skipped or the training was canceled)
			// and this screen is still being removed, so it is not counted anymore
			if(!appState.isResting){ return; }

			let restLeft = Math.max(0, Math.ceil((appState.restEndsAt - Date.now()) / 1000));

			// checked a few times a second, so act only when the second changes
			if(restLeft === currentRest){ return; }

			currentRest = restLeft;

			// if the resting is near the end, play the alert sound
			if(currentRest <= 5 && currentRest > 0){
				alert.play();
			}

			// when the resting finishes
			if(currentRest === 0){
				final.play();
				finishResting();
			}
		};

		// show the time left right away, the sounds are played by the ticks
		currentRest = Math.max(1, Math.ceil((appState.restEndsAt - Date.now()) / 1000));

		let restInterval = setInterval(tick, 250);

		// stops the countdown when the resting ends or user leaves the training
		return () => clearInterval(restInterval);
	});

	// purpose:		finishes the resting behaviour and moves to next set
	// ------------------------------------------------------------------------
	function finishResting(){
		appState.setResting(0);
		currentRest = defaultRest;
		appState.setStep(appState.currentStep + 1);
	};

	// every time the currentRest variable is changing updates the counter in html
	let secondsFormated = $derived(string.seconds(currentRest));

</script>

<style>

	.content-training {
		margin-top: calc(-1 * var(--size-padding));
		position: relative;
		display: inline-block;

		text-align: right;

		transition: transform .2s ease-in-out;
		transform: translateY(0);
	}

	@media (max-height: 540px) {
		.content-training {
			margin-top: 0;
			transform: translateY(0) !important;
		}
	}

	.training-number {
		display: block;

		font-size: 3.31rem;
	}

	.training-skip {
		margin-top: -1em;
		padding-right: 2em;
		display: inline-block;

		background-image: var(--icon-arrowRight);
		background-position: right center;
		background-repeat: no-repeat;
		background-size: 1.5em;

		text-transform: uppercase;
		font-size: .75rem;

		user-select: none;
	}

</style>




<Sidebar data={currentPushups} markActive bind:activePosition />

<section class="main" in:slide|global out:slide|global="{ {direction: 'out'} }">

	<div class="content">
		<div class="content-training" style:transform="translateY({ counterOffset })">
		{#if activePosition}
			<div in:slide|global>
				{#if !appState.isResting}
					{string.perform}
					<strong class="training-number">{ currentPushups[appState.currentStep] }</strong>
					{string.pushups(currentPushups[appState.currentStep])}
				{:else}
					{string.letsJust} <br>{string.restFor}
					<strong class="training-number">{ currentRest }</strong>
					{secondsFormated}<br>
					<button class="training-skip" onclick={finishResting}>{string.skipTheWait}</button>
				{/if}
			</div>
		{/if}
		</div>
	</div>

	{#if !appState.isResting}
		<MainAction delay={400} onMainAction={nextStep}>{string.madeIt}</MainAction>
	{/if}

</section>
