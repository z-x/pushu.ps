<!--  
	The page with the initial pushups test
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import string from '../Data/translations.js';
	import appState from '../Data/state.svelte.js';
	import { appear, slide } from '../Helpers/transitions.js';
	import MainAction from '../UI/MainAction.svelte';
	import Sidebar from '../UI/Sidebar.svelte';


	// component variables
	// ------------------------------------------------------------------------
	// how many pushups the user did in the test (int)
	let pushups = $state();
	// if the user filled the field, the cleared field gives null, not undefined
	let answered = $derived(pushups != null);


	// purpose:		sets the user level based on pushups he did in the test,
	//				0 and negative values also set the first level
	// returns:		triggers a 'leveled' event with the set level
	// ------------------------------------------------------------------------
	function setLevel(){
		if(pushups <= 5) { appState.setLevel(1); }
		else if (pushups > 5 && pushups <= 10) { appState.setLevel(2); }
		else { appState.setLevel(3); }

		window.dispatchEvent(new CustomEvent('leveled', {detail: {level: appState.level}}));
	}


	// purpose:		when there is an on-screen keyboard on mobile and we hide the title
	//				the screen needs to be smoothly scrolled to the top to give a better
	//				feel for the user
	// ------------------------------------------------------------------------
	function scrollToTop(event){
		if(event.currentTarget.value !== '' && window.scrollY > 0){
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}


	// purpose:		function executed after user fills the training data
	//				used mainly for analytics purposes
	// returns:		triggers an event 'testDataFilled' with test data
	// ------------------------------------------------------------------------
	function filled(){
		if(!answered){ return; }

		window.dispatchEvent(new CustomEvent('testDataFilled', {detail: {pushups: pushups}}));
	}

</script>

<style>

	.moveable {
		transition: all .4s linear;
	}

	.moveable:not(.visible) {
		max-height: 0;
		margin: 0;
		overflow: hidden;
		opacity: 0;
	}
	
	.moveable.visible {
		max-height: 4em;
	}

	.text-subtitle.visible {
		margin-bottom: 2rem;
	}

	input[type="number"] {
		-moz-appearance: textfield;
		appearance: textfield;
	}

	input[type="number"]::-webkit-outer-spin-button,
	input[type="number"]::-webkit-inner-spin-button {
		margin: 0;
		-webkit-appearance: none;
		appearance: none;
	}

</style>




<Sidebar />

<section class="main" in:slide|global={{ direction: 'in' }} out:appear|global={{ duration: 100 }}>
	<div class="content content-readable">
		<h1 class={['text-title', 'moveable', !answered && 'visible']}>{string.firstTestYourself}</h1>
		<p class={['text-subtitle', 'moveable', !answered && 'visible']}>{string.doAsManyPushups}</p>
		<p class="text-title action-secondary">{string.iDid} <input type="number" placeholder="12" min="0" step="1" bind:value={pushups} oninput={scrollToTop} onchange={filled}> {string.pushups(pushups)}</p>
		{#if pushups > 2}
			<p in:appear|global={{ delay: 500 }} out:appear|global class="text-subtitle">{string.niceGoRest}</p>
		{:else if answered && pushups >= 0}
			<p in:appear|global={{ delay: 500 }} out:appear|global class="text-subtitle">{string.tryHalfPushups}</p>
		{:else if answered && pushups < 0}
			<p in:appear|global={{ delay: 500 }} out:appear|global class="text-subtitle">{string.levitationJoke}</p>
		{/if}
	</div>
			
	{#if answered}
		<MainAction delay={900} onMainAction={setLevel} changePageTo="Home">{string.whatsNext}</MainAction>
	{/if}
</section>