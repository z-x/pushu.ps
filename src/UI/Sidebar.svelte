<!--  
	Sidebar with a row of numbers
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import { createEventDispatcher } from 'svelte';
	import state from '../Data/state.js';
	import MenuToggle from '../UI/MenuToggle.svelte';
	import { appear } from '../Helpers/transitions.js';
	import SidebarIndicator from '../UI/SidebarIndicator.svelte';


	// properties
	// ------------------------------------------------------------------------
	// the data that will be applied to sidebar (string or array)
	export let data = [];
	// do you want to mark the active item (bool)
	export let markActive = false;


	// local variables
	// ------------------------------------------------------------------------
	let dispatch = new createEventDispatcher();
	// the active mark switch
	let showSidebarIndicator = false;

</script>

<style>

	.sidebar {
		width: calc(2 * 1rem + 2 * var(--size-spacing));
		padding-top: var(--size-padding);
		padding-bottom: var(--size-padding-bottom);
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;

		border-right: 1px solid var(--color-separator);
		background-color: var(--color-background);

		transition: filter .5s ease-in-out;
		transform: translateZ(0);
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




<aside class="sidebar" class:sidebar-long="{ data.length > 5 }">
	<ul class="sidebar-info">
		{#each data as item, i}
			<li
				in:appear={ {delay: 200 * i, duration: 500} }
				class="sidebar-info-value" 
				class:sidebar-info-value-active="{ !$state.isResting && markActive && $state.currentStep === i }"
				on:introend="{ () => { if($state.currentStep === i){ showSidebarIndicator = true; dispatch('activeLoaded'); } }  }"
			>
				{item}
			</li>
		{/each}
	</ul>
	{#if markActive && showSidebarIndicator } <SidebarIndicator /> {/if}
	<MenuToggle />
</aside>