<!--  
	The main call to action button that switches to next page
	Usage: <MainAction>Button label</MainAction>
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import appState from '../Data/state.svelte.js';
	import { appear } from '../Helpers/transitions.js';


	// properties
	// ------------------------------------------------------------------------
	let {
		// what page do you want to switch to
		changePageTo = null,
		// the delay after which the button will appear on the page
		delay = 400,
		// if the area for clicking should forced to small
		forceSmallClickArea = false,
		// the function to call when the button is clicked (function)
		onMainAction,
		// the content of the button
		children
	} = $props();


	// purpose:		performs the main action assigned to the button
	//				most likely changes the page or just calls the onMainAction
	// returns:		shows changed page, or calls the onMainAction function
	// ------------------------------------------------------------------------
	let action = () => {
		onMainAction?.();

		if(changePageTo) {
			appState.setPage(changePageTo);
		}
	};

</script>

<style>

	.action-main {
		padding-top: .8em;

		text-align: left;
		text-transform: uppercase;
		line-height: 1.05em;
		font-size: 2.75rem;
		font-weight: 600;

		user-select: none;
	}

	.action-main:not(.action-main-small):only-of-type {
		padding-top: 18vh;
	}

	@media (min-height: 551px) and (max-height: 630px) {
		.action-main {
			font-size: 2rem;
		}
	}

</style>




<button
	in:appear|global="{ {from: 'bottom', delay} }"
	type="button"
	class="action-main"
	class:action-main-small="{ forceSmallClickArea }"
	onclick={action}
>
	{@render children?.()}
</button>