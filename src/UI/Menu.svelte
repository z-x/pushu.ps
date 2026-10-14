<!--  
	menus template
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import string from '../Data/translations.js';
	import appState from '../Data/state.svelte.js';
	import { slide } from '../Helpers/transitions.js';


	// properties
	// ------------------------------------------------------------------------
	let {
		// the class name added to the content of the menu (string)
		contentClass = '',
		// if you want to show the back button (bool)
		allowButtonBack = true,
		// the back button label (string)
		buttonBackLabel = string.back,
		// if you want to show the next action set a function that will do something (function)
		buttonNextAction = null,
		// the next button label (string)
		buttonNextLabel = string.accept,
		// the modifiers for in transition (object)
		transitionInModifier = {},
		// the modifiers for the out transition (object)
		transitionOutModifier = {},
		// if you want the content to have maximum width (bool)
		longContent = false,
		// the content of the menu
		children
	} = $props();


	// purpose:		closes the menu completely
	// returns:		the state of the menu that is false (bool)
	// ------------------------------------------------------------------------
	function closeMenu(){
		return appState.setMenu(false);
	};


	// purpose:		closes the menu when ESC was pressed
	// ------------------------------------------------------------------------
	function closeMenuOnEsc(event){
		if(event.key === "Escape"){
			closeMenu();
		}
	};

</script>

<style>

	.menu {
		max-height: calc(100% - 50px);
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		overflow: hidden;
		z-index: var(--z-menu);

		background-color: var(--color-pure);

		color: var(--color-pureContent);
	}

	.menu-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: var(--z-overlay);
		cursor: s-resize;
	}

	.menu-content {
		max-height: 70vh;
		padding: var(--size-padding);
		overflow: auto;
	}

	.menu-contentWrapper {
		max-width: var(--size-contentMax);
		margin-left: auto;
		margin-right: auto;
	}

	.menu-navigation {
		width: 100%;
		padding-right: var(--size-padding);
		padding-left: var(--size-padding);

		border-top: 1px solid var(--color-pureSeparator);
	}

		:global(.app-appleFullscreen .menu-navigation) {
			padding-bottom: 3rem !important;
		}

		@media (display-mode: standalone) {
			.menu-navigation {
				padding-bottom: 3rem;
			}
		}
	
	.menu-navigation .menu-contentWrapper {
		display: flex;
		justify-content: space-between;
	}

	.menu-back,
	.menu-next {
		padding-top: .7rem;
		padding-bottom: .85rem;

		text-align: left;
		text-transform: uppercase;
		letter-spacing: -1px;
		font-family: var(--font-condensed);
		font-size: 2rem;
		font-weight: 700;

		user-select: none;
	}

	.menu-next {
		padding-right: 1.1em;
		background-image: var(--icon-arrowRight);
		background-position: right .1rem center;
		background-repeat: no-repeat;
		background-size: 1.2rem;
	}

	.menu-back:before {
		width: .7em;
		height: .7em;
		margin-right: .4em;
		display: inline-block;

		background-image: var(--icon-arrowRight);
		background-position: center;
		background-repeat: no-repeat;
		background-size: 1.2rem;

		content: '';

		transform: rotate(180deg);
	}

	@media (prefers-color-scheme: dark) {
		.menu-next,
		.menu-back:before {
			background-image: var(--icon-arrowRight-light);
		}
	}		

</style>




<svelte:window onkeyup={closeMenuOnEsc} />

<!-- keyboard users close the menu with Esc or the back button, so the overlay is left out of the tab order -->
<button
	class="menu-overlay"
	style:bottom="{ appState.menuHeight }px"
	onclick={closeMenu}
	aria-label={string.closeMenu}
	tabindex="-1"
></button>

<!-- the app screen is moved up by the menu height, see App.svelte -->
<section class="menu" bind:offsetHeight={appState.menuHeight} in:slide="{ transitionInModifier }" out:slide="{ transitionOutModifier }">
	<div class="menu-content {contentClass}">
		<div class:menu-contentWrapper="{ longContent }">
			{#if children}{@render children()}{:else}{string.menuEmpty}{/if}
		</div>
	</div>
	{#if allowButtonBack || buttonNextAction}
		<div class="menu-navigation">
			<div class="menu-contentWrapper">
				{#if allowButtonBack}
					<button
						class="menu-back"
						onclick={() => appState.setMenu('Main')}
					>
						{ buttonBackLabel }
					</button>
				{/if}
				{#if buttonNextAction}
					<button
						class="menu-next"
						onclick={() => { buttonNextAction(); closeMenu(); }}
					>
						{ buttonNextLabel }
					</button>
				{/if}
			</div>
		</div>
	{/if}
</section>