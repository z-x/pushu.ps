<!--  
	The page with the initial pushups test
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import { onDestroy } from 'svelte';
	import string from '../Data/translations.js';
	import state from '../Data/state.js';
	import { appear, slide } from '../Helpers/transitions.js';
	import MainAction from '../UI/MainAction.svelte';
	import Sidebar from '../UI/Sidebar.svelte';


	// component variables
	// ------------------------------------------------------------------------
	// how many pushups the user did in the test (int)
	let pushups;


	// purpose:		sets the user level based on pushups he did in the test
	// ------------------------------------------------------------------------
	function setLevel(){
		if(pushups <= 5) { state.setLevel(1); }
		else if (pushups > 5 && pushups <= 10) { state.setLevel(2); }
		else { state.setLevel(3); }

		// analytics
		gtag('event', 'test', {'leveled': $state.level});
	}


	// when there is an on-screen keyboard on mobile and we hide the title
	// the screen needs to be smoothly scrolled to the top to give a better
	// feel for the user
	$: if(pushups !== null && pushups !== ''){
		if(window.scrollY > 0){
			let interval = setInterval(() => {
				window.scrollTo({
					top: --window.scrollY
				});
				
				if(window.scrollY <= 0){ clearInterval(interval); }
			}, 2);
		}
	};

	// analytics
	gtag('event', 'viewed', {'page': 'test'});
	function filled(){
		gtag('event', 'test', {'pushups': pushups});
	}

	$: console.log(pushups);

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
		-moz-appearance:textfield;		
	}

	input[type="number"]::-webkit-outer-spin-button,
	input[type="number"]::-webkit-inner-spin-button {
		margin: 0;
		-webkit-appearance: none;
	}

</style>




<Sidebar />

<section class="main" in:slide="{{ direction: 'in' }}" out:appear="{ {duration: 100} }">
	<div class="content content-readable">
		<h1 class="text-title moveable" class:visible="{ typeof pushups === 'undefined' }">{string.firstTestYourself}</h1>
		<p class="text-subtitle moveable" class:visible="{ typeof pushups === 'undefined' }">{string.doAsManyPushups}</p>
		<p class="text-title action-secondary">{string.iDid} <input type="number" placeholder="12" min="0" step="1" bind:value="{ pushups }" on:change="{ filled }"> {string.pushups(pushups)}</p>
		{#if pushups > 2}
			<p in:appear="{{ delay: 500 }}" out:appear class="text-subtitle">{string.niceGoRest}</p>
		{:else if pushups <= 2 && typeof pushups !== 'undefined'}
			<p in:appear="{{ delay: 500 }}" out:appear class="text-subtitle">{string.tryHalfPushups}</p>
		{/if}
	</div>
			
	{#if typeof pushups !== 'undefined'}
		<MainAction delay="900" on:mainAction="{ setLevel }" changePageTo="Home">{string.whatsNext}</MainAction>
	{/if}
</section>