<!--  
	menus template
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import { onMount, onDestroy } from 'svelte';
	import string from '../Data/translations.js';
	import state from '../Data/state.js';
	import { slide } from '../Helpers/transitions.js';


	// properties
	// ------------------------------------------------------------------------
	// the id of the menu that is being shown (string)
	export let menuId = 'Main';
	// the class name added to the content of the menu (string)
	export let contentClass = '';
	// if you want to show the back button (bool)
	export let allowButtonBack = true;
	// the back button label (string)
	export let buttonBackLabel = string.back;
	// if you want to show the next action set a function that will do something (function)
	export let buttonNextAction = null;
	// the next button label (string)
	export let buttonNextLabel = string.accept;
	// the modifiers for in transition (object)
	export let transitionInModifier = {};
	// the modifiers for the out transition (object)
	export let transitionOutModifier = {};
	// if you want the content to have maximum width (bool)
	export let longContent = false;


	// initialization
	// ------------------------------------------------------------------------
	onMount(() => {
		setMenuHeight($state.menu);
		window.addEventListener('keyup', closeMenuOnEsc);
	});

	// destroy
	// ------------------------------------------------------------------------
	onDestroy(() => {
		window.removeEventListener('keyup', closeMenuOnEsc);
	});


	// purpose:		calculate the height for the given menu page
	// arguments:	the ID of the page without # (string)
	// returns:		height of the menu page (int)
	// ------------------------------------------------------------------------
	function getMenuHeight(menuId){
		return (menuId) ? document.querySelector(`#${menuId}`).offsetHeight : 0;
	};


	// purpose:		moves the main app screen up depending on the menu size
	// arguments:	the menu page id that you want to set the menu height for (string)
	//				delay after wchich the animation will happen (int)
	// ------------------------------------------------------------------------
	function setMenuHeight(menuId, delay = 200){
		setTimeout(() => {
			let menuHeight = getMenuHeight(menuId);

			document.querySelector('.app').style.transform = `translateY(-${menuHeight}px)`;
			if(menuId) document.querySelector(`#${menuId}-overlay`).style.bottom = menuHeight + 'px';
		}, delay);
	};


	// purpose:		closes the menu completely
	// returns:		the state of the menu that is false (bool)
	// ------------------------------------------------------------------------
	function closeMenu(){
		setMenuHeight('', 0);

		return state.setMenu(false);
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




<svelte:window on:resize="{ () => setMenuHeight(menuId) }" />

<div id="{menuId}-overlay" class="menu-overlay" on:click="{ closeMenu }"></div>

<section id="{menuId}" class="menu" in:slide|local="{ transitionInModifier }" out:slide|local="{ transitionOutModifier }">
	<div class="menu-content {contentClass}">
		<div class:menu-contentWrapper="{ longContent }">
			<slot>{string.menuEmpty}</slot>
		</div>
	</div>
	{#if allowButtonBack || buttonNextAction}
		<div class="menu-navigation">
			<div class="menu-contentWrapper">
				{#if allowButtonBack}
					<button
						class="menu-back"
						on:click="{ () => state.setMenu('Main') }"
					>
						{ buttonBackLabel }
					</button>
				{/if}
				{#if buttonNextAction}
					<button
						class="menu-next"
						on:click="{ () => { buttonNextAction(); closeMenu(); } }"
					>
						{ buttonNextLabel }
					</button>
				{/if}
			</div>
		</div>
	{/if}
</section>