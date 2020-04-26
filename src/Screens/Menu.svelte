<!--  
	menu and the variety of pages in it
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import { onMount, onDestroy } from 'svelte';
	import state from '../Data/state.js';
	import { slide } from '../Helpers/transitions.js';

	// component variables
	// ------------------------------------------------------------------------
	// the currently visible menu id (string)
	let menu = 'menu';


	// purpose:		calculate the height for the given menu page
	// arguments:	the ID of the page without # (string)
	// returns:		height of the menu page (int);
	// ------------------------------------------------------------------------
	function menuHeight(menu){
		return (menu) ? document.querySelector(`#${menu}`).offsetHeight : 0;
	};


	// purpose:		moves the main app screen up depending on the menu size
	// arguments:	the menu page id that you want to set the menu height for (string)
	//				delay after wchich the animation will happen (int)
	// ------------------------------------------------------------------------
	function setMenuHeight(menu, delay = 200){
		setTimeout(() => {
			document.querySelector('.app').style.transform = `translateY(-${menuHeight(menu)}px)`;
			if(menu) document.querySelector('.overlay').style.bottom = menuHeight(menu) + 'px';
		}, delay);
	};


	// purpose:		closes the menu completely
	// returns:		if the menu is opened or closed (bool)
	// ------------------------------------------------------------------------
	function closeMenu(){
		return state.menuShown(false);
	};


	// purpose:		changes the menu page
	// arguments:	the page id that you want to display (string)
	// returns:		the name of the page that was set as visible (string)
	// ------------------------------------------------------------------------
	function setMenu(newMenu){
		menu = newMenu;
		setMenuHeight(newMenu);

		return menu;
	}


	// mount and destroy behaviour
	// ------------------------------------------------------------------------
	onMount(() => {
		setMenuHeight(menu, 0);
	});

	onDestroy(() => {
		setMenuHeight('', 0);
	});

</script>


<style>

	.menu {
		max-height: calc(100vh - 50px);
		padding: var(--size-spacing);
		padding-bottom: 5em;
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		overflow-x: hidden;
		overflow-y: auto;

		z-index: var(--z-menu);
	}

	.menu-list {
		padding-bottom: var(--size-spacing);
	}

	.menu-items {
		margin-left: calc(var(--size-padding) * -1);
		margin-right: calc(var(--size-padding) * -1);
		margin-bottom: .7em;

		line-height: 1em;
		letter-spacing: -1px;
		font-family: var(--font-condensed);
		font-size: 2rem;
		font-weight: 700;
	}

	.menu-item {
		padding: .2em var(--size-padding) .3em;

		border-bottom: 1px solid var(--color-pureSeparator);
		background-image: var(--icon-arrowRight);
		background-position: right var(--size-padding) center;
		background-repeat: no-repeat;
		background-size: .7em;
	}

	.menu-back {
		width: 100%;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding-top: .5rem;
		padding-bottom: .5rem;
		padding-left: var(--size-padding);

		border-top: 1px solid var(--color-pureSeparator);
		background-color: var(--color-pure);

		text-align: left;
		text-transform: uppercase;
		letter-spacing: -1px;
		font-family: var(--font-condensed);
		font-size: 2rem;
		font-weight: 700;
	}

	.menu-back:before {
		width: .7em;
		height: .7em;
		margin-right: .4em;
		display: inline-block;

		background-image: var(--icon-arrowRight);
		background-position: center;
		background-repeat: no-repeat;
		background-size: .7em;

		content: '';

		transform: rotate(180deg);
	}

	.menu-item:first-child {
		margin-top: -.5em;
	}

	.menu-item:last-child {
		border-bottom: 0;
	}

	.menu-item button {
		line-height: 1em;
		text-align: left;
		text-transform: uppercase;
	}

	.secondgate {
		padding-left: 2em;

		background-image: url('data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 15"%3E%3Cpath d="M0 0h3v15H0zM7 15H6v-2H5v2H4V2h3v13zM8 0h3v15H8zM12 0h3v15h-3zM16 0h3v15h-3z"/%3E%3C/svg%3E');
		background-repeat: no-repeat;
		background-position: left center;
		background-size: auto 100%;

		text-transform: uppercase;
		font-size: .75rem;
		color: inherit;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: var(--z-overlay);
		cursor: s-resize;
	}

</style>




<div class="overlay" on:click="{ closeMenu }"></div>

{#if menu === 'menu'}
	<!-- the main menu -->
	<section id="menu" class="menu menu-list" in:slide|local="{ {direction: 'out'} }" out:slide|local="{ {direction: 'out'} }">
		<nav>
			<ul class="menu-items">
				{#if $state.page === 'Home'}
					<li class="menu-item">
						<button on:click="{ () => setMenu('reset') }">Reset the app</button>
					</li>
				{/if}
				{#if $state.page === 'Home' || $state.page === 'Hello' || $state.page === 'Test'}
					<li class="menu-item">
						<button on:click="{ () => setMenu('trainingLevel') }">Manually set your training level</button>
					</li>
				{/if}
				{#if $state.page === 'Training' || $state.page === 'Finish'}
					<li class="menu-item">
						<button on:click="{ () => setMenu('cancelTraining') }">Cancel this training</button>
					</li>
				{/if}

				<li class="menu-item" on:click="{ () => setMenu('instructions') }"><button>Instructions</button></li>
				{#if $state.page !== 'Training'}
					<li class="menu-item" on:click="{ () => setMenu('privacyPolicy') }"><button>Privacy policy</button></li>
				{/if}
			</ul>

			<a href="http://secondgate.pl" class="secondgate">App created behind the Second Gate</a>
		</nav>
	</section>
{:else if menu === 'privacyPolicy'}
	<!-- privacy policy -->
	<section id="privacyPolicy" class="menu" in:slide|local out:slide|local>
		<article class="article">
			<h2>We do:</h2>
			<ul>
				<li>Collect the data about how you are using the app.</li>
				<li>Collect the data about your progress and your level.</li>
				<li>Collect the data about the browser and the device you are using with help of Google Analytics, please refer to their <a href="https://policies.google.com/privacy">Privacy Policy</a> for the detailed information about what data is being collected.</li>
				<li>Save the data on this device (information about your settings and your progress) using localStorage API.</li>
			</ul>
			<h2>Why?</h2>
			<p>We collect the data so we could improve the app in future. For example we would like to implement machine learning to prepare personalised trainings instead predefined ones.</p>
			<p>We also collect the data to know if anyone is really using the app. :)</p>
		</article>
		<button class="menu-back" on:click="{ () => { setMenu('menu') } }">Back</button>
	</section>
{/if}