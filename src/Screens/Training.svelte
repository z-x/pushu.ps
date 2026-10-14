<!--  
	This is where all the training actions are
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import { onMount, onDestroy } from 'svelte';
	import string from '../Data/translations.js';
	import appState from '../Data/state.js';
	import training from '../Data/training.js';
	import { slide } from '../Helpers/transitions.js';
	import NoSleep from '../Helpers/noSleep.js';
	import Sound from '../Helpers/sound.js';
	import MainAction from '../UI/MainAction.svelte';
	import Sidebar from '../UI/Sidebar.svelte';


	// prevent the screen from dimming
	// ------------------------------------------------------------------------
	let noSleep;

	onMount(() => {
		noSleep = new NoSleep();

		document.addEventListener('click', () => {
			noSleep.enable();
		}, {once: true});
	});

	onDestroy(() => {
		noSleep.disable();

		// remove the resting timeout when navigating away from this page
		finishResting();
	});


	// get the training data
	// ------------------------------------------------------------------------
	// current set
	let currentSet = training[$appState.level][$appState.set];
	// the current pushups set
	let currentPushups = currentSet['pushups'];


	// purpose:		position the counter relative to sidebar value
	//				for current set
	// ------------------------------------------------------------------------
	let counterPosition = $state(0);

	function positionCounter(){
		// the function runs before the dom is updates so we need to check
		if(document.querySelector('.sidebar-info-value')){
			// the offset position of the current pushups value in sidebar
			let sidebarValuePosition = document.querySelector(`.sidebar-info-value:nth-child(${ parseInt($appState.currentStep) + 1 })`).offsetTop + 'px';
			// the margin added for the counter when resting is active
			let restingMargin = 0;

			if($appState.isResting){
				restingMargin = getComputedStyle(document.documentElement).getPropertyValue('--size-spacing');
				counterPosition =  'calc(' + sidebarValuePosition + ' + ' + restingMargin + ' * 1.5)';
			} else {
				counterPosition = sidebarValuePosition;
			}
		}
	};
	
	// repositions the counter each time the resting phase is activated
	// or when the pushups to be made is changed
	$effect(() => {
		$appState.isResting, $appState.currentStep, positionCounter();
	});


	// purpose:		moves the user to next step of pushups/resting
	// ------------------------------------------------------------------------
	function nextStep(){
		// if it was the last pushups to make
		if($appState.currentStep === currentPushups.length-1){
			// update the user info about the amount of pushups he just did
			appState.lastSet(currentPushups.reduce((a, b) => a + b, 0));
			// and add those to the total he made
			appState.totalUpdate(currentPushups.reduce((a, b) => a + b, 0));

			// finally redirect the user to the finish screen
			appState.setPage('Finish');
		}
		// if there are more to do
		else {
			rest().then(() => {
				appState.setStep($appState.currentStep + 1);
			});
		}
	};


	// purpose:		runs all the resting behaviours
	// ------------------------------------------------------------------------
	// the time to rest for current set
	let defaultRest = currentSet['rest'];
	// the counter for current rest time left
	let currentRest = $state(defaultRest);
	// the interval for resting behaviour
	let restInterval;
	// the alert sounds
	let alert = new Sound('/audio/alert.mp3');
	let final = new Sound('/audio/final.mp3');
	// the variable holding the resolve method for resting promise
	let restingPromiseResolve = null;

	let rest = () => {
		return new Promise((resolve, reject) => {
			restingPromiseResolve = resolve;

			appState.isResting(1);

			restInterval = setInterval(() => {
				currentRest--;

				// if the resting is near the end, play the alert sound
				if(currentRest <= 5 && currentRest > 0 ){
					alert.play();
				}

				// when the resting finishes
				if(currentRest == 0){
					final.play();
					finishResting();
				}
			}, 1000);
		});
	};

	// purpose:		finishes the resting behaviour and moves to next set
	// ------------------------------------------------------------------------
	function finishResting(){
		clearInterval(restInterval);
		appState.isResting(0);
		currentRest = defaultRest;
		if(restingPromiseResolve){
			restingPromiseResolve();
		}
	};

	// when user closed the app before finishing the rest, let's resume the rest
	if($appState.isResting){ nextStep(); }

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




<Sidebar data={currentPushups} markActive={true} onActiveLoaded={positionCounter} />

<section class="main" in:slide|global out:slide|global="{ {direction: 'out'} }">

	<div class="content">
		<div class="content-training" style="transform: translateY({ counterPosition })">
		{#if counterPosition}
			<div in:slide|global>
				{#if !$appState.isResting}
					{string.perform}
					<strong class="training-number">{ currentPushups[$appState.currentStep] }</strong>
					{string.pushups(currentPushups[$appState.currentStep])}
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

	{#if !$appState.isResting}
		<MainAction delay="400" onMainAction={nextStep}>{string.madeIt}</MainAction>
	{/if}

</section>
