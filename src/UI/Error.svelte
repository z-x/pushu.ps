<!--  
	Custom error message in small popup
	Appears when $state.error is not empty
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import state from '../Data/state.js';
	import string from '../Data/translations.js';
	import { appear } from '../Helpers/transitions.js';


	// purpose:		hides the error message by clearing the $state.error
	// returns:		the state of the error, that is false as it was cleared (bool)
	// ------------------------------------------------------------------------
	function hideError(){
		return state.setError(false);
	}

</script>


<style>

	.error {
		max-width: calc(100% - var(--size-padding) * 2);
		padding: calc(var(--size-padding) / 2) var(--size-padding);
		display: flex;
		align-items: center;
		position: absolute;
		left: var(--size-padding);
		bottom: var(--size-padding);
		z-index: var(--z-error);

		background-color: var(--color-errorBackground);
		border-radius: 4px;

		color: var(--color-error);
	}

	.error-dismiss {
		width: 2.5rem;
		height: 2.5rem;
		margin-left: 1em;
		margin-right: -.7em;
		flex-shrink: 0;
		overflow: hidden;

		background-image: url('data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 66"%3E%3Cpath d="M65.1 5.1A2.78 2.78 0 0066 3a2.94 2.94 0 00-.9-2.15A2.85 2.85 0 0063 0a3 3 0 00-2.15.85L33 28.75 5.1.85A2.85 2.85 0 003 0 3 3 0 00.85.85 3 3 0 000 3a2.85 2.85 0 00.85 2.1L28.75 33 .85 60.85A3 3 0 000 63a2.85 2.85 0 00.85 2.1A2.94 2.94 0 003 66a2.78 2.78 0 002.1-.9L33 37.25 60.85 65.1A2.94 2.94 0 0063 66a3.08 3.08 0 003-3 2.94 2.94 0 00-.9-2.15L37.25 33z" style="fill: %23fff"/%3E%3C/svg%3E');
		background-size: 16px;
		background-position: center;
		background-repeat: no-repeat;
	
		white-space: nowrap;
		text-indent: 100%;
	}

</style>



{#if $state.error}
	<div class="error" in:appear="{ {from: 'bottom', duration: 200} }" out:appear="{ {from: 'bottom', duration: 200} }">
		<p>{$state.error}</p>

		<button
			on:click="{ hideError }"
			class="error-dismiss"
			title="{ string.errorDismiss }"
		>
			{ string.errorDismiss }
		</button>
	</div>
{/if}