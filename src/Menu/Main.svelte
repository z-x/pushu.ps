<!--  
	menu: main menu navigation
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import state from '../Data/state.js';
	import string from '../Data/translations.js';
	import Submenu from '../UI/Submenu.svelte';

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
	}

		.menu-item:first-child {
			padding-top: 0;
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

</style>



<Submenu
	menuId="Main"
	allowButtonBack="{ false }"
	transitionInModifier="{ {direction: 'out'} }"
	transitionOutModifier="{ {direction: 'out'} }"
>
	<ul class="menu-items">

		{#if $state.page === 'Home'}
			<li class="menu-item">
				<button on:click="{ () => state.setSubmenu('ResetApp') }">
					{string.resetApp}
				</button>
			</li>
		{/if}

		{#if $state.page === 'Home' || $state.page === 'Hello' || $state.page === 'Test'}
			<li class="menu-item">
				<button on:click="{ () => state.setSubmenu('ManualTrainingLevel') }">
					{string.manuallySetTrainingLevel}
				</button>
			</li>
		{/if}

		{#if $state.page === 'Training' || $state.page === 'Finish'}
			<li class="menu-item">
				<button on:click="{ () => state.setSubmenu('CancelTraining') }">
					{string.cancelTraining}
				</button>
			</li>
		{/if}

		<li class="menu-item">
			<button on:click="{ () => state.setSubmenu('Instructions') }">
				{string.instructions}
			</button>
		</li>

		{#if $state.page === 'Hello' || $state.page === 'Home'}
			<li class="menu-item">
				<button on:click="{ () => state.setSubmenu('ManualLanguage') }">
					{string.setLanguage}
				</button>
			</li>
		{/if}
	
		{#if $state.page !== 'Training'}
			<li class="menu-item">
				<button on:click="{ () => state.setSubmenu('PrivacyPolicy') }">
					{string.privacyPolicy}
				</button>
			</li>
		{/if}

	</ul>

	<a href="http://secondgate.pl" target="_blank" class="secondgate">{string.appCreatedSecondGate}</a>
</Submenu>
