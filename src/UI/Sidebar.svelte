<!--  
	Sidebar with a row of numbers
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import appState from '../Data/state.svelte.js';
	import MenuToggle from '../UI/MenuToggle.svelte';
	import { appear } from '../Helpers/transitions.js';
	import SidebarIndicator from '../UI/SidebarIndicator.svelte';


	// properties
	// ------------------------------------------------------------------------
	let {
		// the data that will be applied to sidebar (string or array)
		data = [],
		// do you want to mark the active item (bool)
		markActive = false,
		// the position of the active item once it is shown ({top, height}, bindable)
		activePosition = $bindable(null)
	} = $props();


	// local variables
	// ------------------------------------------------------------------------
	// the sidebar item elements
	let items = $state([]);
	// if the active item has finished appearing
	let activeShown = $state(false);


	// purpose:		measures the active item so the indicator and other
	//				elements could be aligned with it
	// ------------------------------------------------------------------------
	function measureActive(){
		let item = items[appState.currentStep];

		if(activeShown && item){
			activePosition = {top: item.offsetTop, height: item.offsetHeight};
		}
	};

	// measure again each time the user moves to the next pushups
	$effect(() => {
		measureActive();
	});

</script>

<style>

	.sidebar {
		width: calc(2 * 1rem + 2 * var(--size-spacing));
		padding-top: calc(var(--size-padding) + env(safe-area-inset-top, 0px));
		padding-bottom: calc(var(--size-padding) + env(safe-area-inset-bottom, 0px));
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;

		background-color: var(--color-background);

		transition: filter .5s ease-in-out;
		transform: translateZ(0);
	}

		:global(.app-appleFullscreen) .sidebar {
			padding-bottom: calc(var(--size-padding) / 2 + env(safe-area-inset-bottom, 0px));
		}

	/* vertical separator */
	.sidebar::after {
		width: 1px;
		position: absolute;
		top: 0;
		bottom: 0;
		right: -1px;

		background-image: linear-gradient(to bottom, transparent env(safe-area-inset-top, 0px), var(--color-separator) calc(env(safe-area-inset-top, 0px) * 1.2), var(--color-separator));

		content: '';
	}

	.sidebar-info {
		text-align: center;
		font-size: 1.81rem;
	}

	.sidebar-info-value {
		margin-bottom: var(--size-spacing);
	}

	.sidebar-info-value-active {
		font-weight: bold;
	}

	@media (max-height: 550px){
		.sidebar-info-value {
			margin-bottom: .7em;
		}
	}

	@media (max-height: 600px){
		.sidebar-long .sidebar-info {
			font-size: 1.3rem;
		}

		.sidebar-long .sidebar-info-value {
			margin-bottom: .7em;
		}
	}

</style>




<svelte:window onresize={measureActive} />

<aside class={['sidebar', data.length > 5 && 'sidebar-long']}>
	<ul class="sidebar-info">
		{#each data as item, i}
			<li
				bind:this={items[i]}
				in:appear|global={{ delay: 200 * i, duration: 500 }}
				class={['sidebar-info-value', !appState.isResting && markActive && appState.currentStep === i && 'sidebar-info-value-active']}
				onintroend={() => { if(markActive && appState.currentStep === i){ activeShown = true; } }}
			>
				{item}
			</li>
		{/each}
	</ul>
	{#if markActive && activePosition} <SidebarIndicator position={activePosition} /> {/if}
	<MenuToggle />
</aside>