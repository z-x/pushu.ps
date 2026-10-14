<!--  
	Marks the active sidebar element
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import appState from '../Data/state.js';
	import { fade } from 'svelte/transition';


	// purpose:	positions the pointer relative to active element
	// ------------------------------------------------------------------------
	let position = $state(0);

	function reposition(){
		if(document.querySelector(`.sidebar-info-value`)){
			let element = document.querySelector('.sidebar-info-value:nth-child(' + parseInt($appState.currentStep + 1) + ')');
			let restingSpace = getComputedStyle(document.documentElement).getPropertyValue('--size-spacing');

			if($appState.isResting){
				position = `calc(${(element.offsetTop + element.offsetHeight)}px + ${restingSpace} / 2)`;
			} else {
				position = (element.offsetTop + element.offsetHeight) + 'px';
			}
		}
	};

	// repositions the pointer each time the user finishes a set
	$effect(() => {
		$appState.currentStep, reposition();
	});

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
	style="transform: translateY({ position })"
></div>