<!--  
	Marks the active sidebar element
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import appState from '../Data/state.svelte.js';
	import { fade } from 'svelte/transition';


	// properties
	// ------------------------------------------------------------------------
	let {
		// the position of the active sidebar item ({top, height})
		position
	} = $props();


	// purpose:	positions the pointer under the active item
	//			and a bit lower when the user is resting
	// ------------------------------------------------------------------------
	let offset = $derived(appState.isResting
		? `calc(${position.top + position.height}px + var(--size-spacing) / 2)`
		: `${position.top + position.height}px`
	);

</script>

<style>

	.sidebar-info-indicator {
		width: .55em;
		margin-top: -.1em;
		margin-left: calc(.7em + var(--size-spacing));
		position: absolute;
		top: 0;

		border-bottom: 2px solid var(--color-text);

		transform: translateY(0);
		transition: transform .1s ease-in-out;
	}

</style>




<div
	in:fade|global="{ {duration: 200} }"
	class="sidebar-info-indicator"
	style:transform="translateY({ offset })"
></div>