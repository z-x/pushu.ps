<!--  
	menu: main menu navigation
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import appState from '../Data/state.svelte.js';
	import string from '../Data/translations.js';
	import Menu from '../UI/Menu.svelte';
	import install from '../Helpers/install.svelte.js';


	// purpose:		focuses the first menu item for keyboard users
	// arguments:	the menu items list element
	// ------------------------------------------------------------------------
	function focusFirstItem(menuItems){
		menuItems.querySelector('button').focus();
	};

</script>

<style>

	.menu-items {
		margin-left: calc(var(--size-padding) * -1);
		margin-right: calc(var(--size-padding) * -1);
		margin-bottom: var(--size-spacing);
	}

	.menu-item {
		padding: .6em var(--size-padding) .7em;
		padding-right: calc(var(--size-padding) + 1.5rem);

		border-bottom: 1px solid var(--color-pureSeparator);
		background-image: var(--icon-arrowRight);
		background-position: right var(--size-padding) center;
		background-repeat: no-repeat;
		background-size: 1.2rem;

		user-select: none;
	}

		.menu-item:first-child {
			padding-top: 0;
		}

		@media (prefers-color-scheme: dark) {
			.menu-item {
				background-image: var(--icon-arrowRight-light);
			}
		}

	.secondgate {
		padding-left: 2.3em;

		background-image: url('data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 15"%3E%3Cpath d="M0 0h3v15H0zM7 15H6v-2H5v2H4V2h3v13zM8 0h3v15H8zM12 0h3v15h-3zM16 0h3v15h-3z"/%3E%3C/svg%3E');
		background-repeat: no-repeat;
		background-position: left center;
		background-size: auto 100%;

		text-transform: uppercase;
		font-size: .75rem;
		color: inherit;
	}

		@media (prefers-color-scheme: dark) {
			.secondgate {
				background-image: url('data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 15"%3E%3Cpath fill="%23d1cbbd" d="M0 0h3v15H0zM7 15H6v-2H5v2H4V2h3v13zM8 0h3v15H8zM12 0h3v15h-3zM16 0h3v15h-3z"/%3E%3C/svg%3E')
			}
		}

</style>



<Menu
	allowButtonBack={false}
	transitionInModifier={{direction: 'out'}}
	transitionOutModifier={{direction: 'out'}}
>
	<ul class="menu-items" {@attach focusFirstItem}>

		{#if appState.page === 'Home'}
			<li class="menu-item">
				<button onclick={() => appState.setMenu('ResetApp')}>
					{string.resetApp}
				</button>
			</li>
		{/if}

		{#if appState.page === 'Home' || appState.page === 'Hello' || appState.page === 'Test'}
			<li class="menu-item">
				<button onclick={() => appState.setMenu('ManualTrainingLevel')}>
					{string.manuallySetTrainingLevel}
				</button>
			</li>
		{/if}

		{#if appState.page === 'Training' || appState.page === 'Finish'}
			<li class="menu-item">
				<button onclick={() => appState.setMenu('CancelTraining')}>
					{string.cancelTraining}
				</button>
			</li>
		{/if}

		<li class="menu-item">
			<button onclick={() => appState.setMenu('Instructions')}>
				{string.instructions}
			</button>
		</li>

		<!-- only in browsers that offered installing the app -->
		{#if install.available}
			<li class="menu-item">
				<button onclick={() => install.prompt()}>
					{string.installApp}
				</button>
			</li>
		{/if}

		{#if appState.page === 'Hello' || appState.page === 'Home'}
			<li class="menu-item">
				<button onclick={() => appState.setMenu('ManualLanguage')}>
					{string.setLanguage}
				</button>
			</li>
		{/if}
	
		{#if appState.page !== 'Training'}
			<li class="menu-item">
				<button onclick={() => appState.setMenu('PrivacyPolicy')}>
					{string.privacyPolicy}
				</button>
			</li>
		{/if}

	</ul>

	<a href="http://secondgate.pl" target="_blank" class="secondgate">{string.appCreatedSecondGate}</a>
</Menu>
