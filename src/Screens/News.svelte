<!--  
	Small popup with a message
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import handleError from '../Helpers/handleError.js';
	import { onMount } from 'svelte';
	import state from '../Data/state.js';
	import { fromTop } from '../Helpers/transitions.js';


	// component variables
	// ------------------------------------------------------------------------
	// the message for the poup
	let news = null;


	// get the news
	// ------------------------------------------------------------------------
	onMount(() => {
		fetch('/data/news.json').then((response) => {
			return response.json();
		}).then((data) => {
			if(data[0].date > $state.lastActive){
				news = data[0];
			}
		}).catch((error) => {
			new handleError('News could not be fetched', false);
		});
	});


	// purpose:		react to user clicking
	// arguments:	the thing to do
	//				null for closing the popup, 'url' for going somewhere
	// ------------------------------------------------------------------------
	function action(toDo){
		if(!toDo){
			news = null;
			state.popupShown(false);
		}
		else if (toDo === 'url'){
			window.open(news.url, '_blank');
			action();
		}
	};

	// set the state as with popup when needed
	$: if(news){ state.popupShown(true); } else { state.popupShown(false); }


	// purpose:		iOS PWA takes the status bar color from the background color
	//				this means we need to change it when popup appears
	//				compensating for animation times
	//				css transitions won't work, the status bar will transition
	//				from white at page load :<
	// ------------------------------------------------------------------------
	$: $state.popupShown, transitionBackground();

	let transitionTimeout = '';

	function transitionBackground(){
		if($state.popupShown){
			clearTimeout(transitionTimeout);
			document.body.classList = 'app-popupShown';
		} else {
			clearTimeout(transitionTimeout);
			transitionTimeout = setTimeout(() => {
				document.body.classList = '';
			}, 600);
		}
	};

</script>


<style>

	.infoPopup {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
	}

	.infoPopup-content {
		max-height: 95vh;
		position: relative;
		top: -15vh;
		padding: calc(var(--size-padding) * 2);
		padding-top: calc(var(--size-padding) * 2 + 15vh);
		overflow: auto;

		background-color: var(--color-pure);
		box-shadow: 0 5px 7px rgba(0, 0, 0, .2);
	}

	.infoPopup-heading {
		margin-left: -1px;
		margin-bottom: .5em;
		line-height: 1em;
		letter-spacing: -1px;
		text-transform: uppercase;
		font-family: urw-din-condensed, 'helvetica', 'arial', sans-serif;
		font-size: 2rem;
		font-weight: 700;
	}

	:global(.infoPopup p) {
		line-height: 1.5em;
	}

	:global(.infoPopup p + p) {
		margin-top: .7em;
	}

	.infoPopup-action {
		margin-top: 1.5em;

		text-align: left;
		text-transform: uppercase;
		line-height: 1em;
		font-size: 1.69rem;
		font-weight: 600;
	}

	.infoPopup-action + .infoPopup-action {
		margin-top: .5em;
		margin-left: .2em;
	}

	.infoButton-choices {
		padding: .2em;
		border: 1px solid var(--color-text);
		border-radius: 5px;
	}

	:global(.infoPopup a) {
		text-decoration: underline;
		color: #b58020;
	}

	@media (max-width: 330px) {
		.infoPopup-content {
			padding: var(--size-padding);
			padding-top: calc(var(--size-padding) + 15vh);
		}
	}

	@media (min-width: 1000px) {
		.infoPopup {
			display: flex;
			align-items: center;
			justify-content: center;
			bottom: 0;
		}

		.infoPopup-content {
			max-width: 500px;
			padding-top: calc(var(--size-padding) * 2);
			position: static;

			border-radius: 10px;
		}
	}

</style>



{#if news}
	<section class="infoPopup" on:click="{ () => action() }">
		<div on:click|stopPropagation in:fromTop="{ {duration: 700, delay: 500} }" out:fromTop="{ {duration: 700} }" class="infoPopup-content">
			<h1 class="infoPopup-heading">{@html news[$state.language].title}</h1>
			{@html news[$state.language].content}

			{#if news[$state.language].actionClose}
				<button
					on:click="{ () => action() }"
					class:infoButton-choices="{ news[$state.language].actionClose && news[$state.language].actionYes }"
					class="infoPopup-action"
				>{@html news[$state.language].actionClose}</button>
			{/if}
			{#if news[$state.language].actionYes}
				<button
					on:click="{ () => action(news.action) }"
					class:infoButton-choices="{ news[$state.language].actionClose && news[$state.language].actionYes }"
					class="infoPopup-action"
				>{@html news[$state.language].actionYes}</button>
			{/if}
		</div>
	</section>
{/if}