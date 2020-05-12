<!--  
	This is where all the training actions are
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import { onMount, onDestroy } from 'svelte';
	import string from '../Data/translations.js';
	import state from '../Data/state.js';
	import training from '../Data/training.js';
	import { slide } from '../Helpers/transitions.js';
	import { fade } from 'svelte/transition';
	import StayAwake from '../Helpers/stayAwake.js';
	import MainAction from '../UI/MainAction.svelte';
	import Sidebar from '../UI/Sidebar.svelte';


	// prevent the screen from dimming
	// ------------------------------------------------------------------------
	onMount(() => {
		StayAwake.init();
		document.addEventListener('click', function enableNoSleep() {
			document.removeEventListener('click', enableNoSleep, false);
			StayAwake.enable();
		}, false);
	});

	onDestroy(() => {
		StayAwake.disable();

		// remove the resting timeout when navigating away from this page
		finishResting();
	});


	// get the training data
	// ------------------------------------------------------------------------
	// current set
	let currentSet = training[$state.level][$state.set];
	// the current pushups set
	let currentPushups = currentSet['pushups'];


	// purpose:		position the counter relative to sidebar value
	//				for current set
	// ------------------------------------------------------------------------
	let counterPosition = 0;

	function positionCounter(){
		// the function runs before the dom is updates so we need to check
		if(document.querySelector('.sidebar-info-value')){
			// the offset position of the current pushups value in sidebar
			let sidebarValuePosition = document.querySelector(`.sidebar-info-value:nth-child(${ parseInt($state.currentStep) + 1 })`).offsetTop + 'px';
			// the margin added for the counter when resting is active
			let restingMargin = 0;

			if($state.isResting){
				restingMargin = getComputedStyle(document.documentElement).getPropertyValue('--size-spacing');
				counterPosition =  'calc(' + sidebarValuePosition + ' + ' + restingMargin + ' * 1.5)';
			} else {
				counterPosition = sidebarValuePosition;
			}
		}
	};
	
	// repositions the counter each time the resting phase is activated
	// or when the pushups to be made is changed
	$: $state.isResting, $state.currentStep, positionCounter();


	// purpose:		plays the alert sound
	// ------------------------------------------------------------------------
	// indicates if the audio context was warmed (user needs to click somewhere)
	// for webkit and chromium to allow any playback on the page
	let audioContextWarmed = false;
	// creating new audio context
	let audioContext = new (window.AudioContext || window.webkitAudioContext)();
	// this will store the alert audio file for future use
	let alertSoundBuffer = null;

	// first we need to get the audio file and store it for later
	// wav is heavies but also has the best support
	fetch('/audio/alert.mp3').then((response) => {
		// we return the response as an array buffer
		// this is a binary representation of the audio file
		return response.arrayBuffer();
	})
	.then((binaryAudio) => {
		// then we need to get the binary data and decode
		// it into a real audio
		audioContext.decodeAudioData(binaryAudio, (decodedData) => {
			// we will store the buffered audio data into variable
			alertSoundBuffer = decodedData;
		});
	})
	.catch((error) => {
		console.error(error);
	});

	// warm up the AudioContext
	function warmUpAudioContext(){
		if(!audioContextWarmed){
			// create empty buffer
			let buffer = audioContext.createBuffer(1, 1, 22050)
			let source = audioContext.createBufferSource();
			source.buffer = buffer;
			// contect the empty buffer to audio destination
			source.connect(audioContext.destination);
			// play the empty audio
			source.start(0);

			// the context was warmed up, nice
			audioContextWarmed = true;
		}
	};

	// play the sound
	function playAlert(){
		// create new audio source
		let source = audioContext.createBufferSource();
		// load our previously stored audio buffer into the source
		source.buffer = alertSoundBuffer;
		// connect the source to destination (the speakers)
		source.connect(audioContext.destination);
		// play the sound
		source.start(0);
	};


	// purpose:		moves the user to next step of pushups/resting
	// ------------------------------------------------------------------------
	function nextStep(){
		// if it was the last pushups to make
		if($state.currentStep === currentPushups.length-1){
			// update the user info about the amount of pushups he just did
			state.lastSet(currentPushups.reduce((a, b) => a + b, 0));
			// and add those to the total he made
			state.totalUpdate(currentPushups.reduce((a, b) => a + b, 0));

			// finally redirect the user to the finish screen
			state.setPage('Finish');
		}
		// if there are more to do
		else {
			warmUpAudioContext();
			rest().then(() => {
				state.setStep($state.currentStep + 1);
			});
		}
	};


	// purpose:		runs all the resting behaviours
	// ------------------------------------------------------------------------
	// the time to rest for current set
	let defaultRest = currentSet['rest'];
	// the counter for current rest time left
	let currentRest = defaultRest;
	// the interval for resting behaviour
	let restInterval;

	let restingPromiseResolve = null;

	let rest = () => {
		return new Promise((resolve, reject) => {
			restingPromiseResolve = resolve;

			state.isResting(1);

			restInterval = setInterval(() => {
				currentRest--;

				// if the resting is near the end, play the alert sound
				if(currentRest <= 5 && currentRest > 0 ){
					playAlert();
				}

				// when the resting finishes
				if(currentRest == 0){
					finishResting();
				}
			}, 1000);
		});
	};

	// purpose:		finishes the resting behaviour and moves to next set
	// ------------------------------------------------------------------------
	function finishResting(){
		clearInterval(restInterval);
		state.isResting(0);
		currentRest = defaultRest;
		if(restingPromiseResolve){
			restingPromiseResolve();
		}
	};

	// when user closed the app before finishing the rest, let's resume the rest
	if($state.isResting){ nextStep(); }

	// every time the currentRest variable is changing updates the counter in html
	$: secondsFormated = string.seconds(currentRest);

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
	}

</style>




<Sidebar data="{ currentPushups }" markActive="{ true }" on:activeLoaded="{ positionCounter }" />

<section class="main" in:slide out:slide="{ {direction: 'out'} }">

	<div class="content">
		<div class="content-training" style="transform: translateY({ counterPosition })">
		{#if counterPosition}
			<div in:slide>
				{#if !$state.isResting}
					{string.perform}
					<strong class="training-number">{ currentPushups[$state.currentStep] }</strong>
					{string.pushups(currentPushups[$state.currentStep])}
				{:else}
					{string.letsJust} <br>{string.restFor}
					<strong class="training-number">{ currentRest }</strong>
					{secondsFormated}<br>
					<button class="training-skip" on:click="{ finishResting }">{string.skipTheWait}</button>
				{/if}
			</div>
		{/if}
		</div>
	</div>

	{#if !$state.isResting}
		<MainAction delay="400" on:mainAction="{ nextStep }">{string.madeIt}</MainAction>
	{/if}

</section>