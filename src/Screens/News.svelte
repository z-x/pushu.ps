<!--  
	Small popup with a message
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import handleError from '../Helpers/handleError.js';
	import { onMount } from 'svelte';
	import appState from '../Data/state.svelte.js';
	import { fromTop } from '../Helpers/transitions.js';


	// component variables
	// ------------------------------------------------------------------------
	// the message for the poup
	let news = $state(null);
	// the message in the user language
	let message = $derived(news?.[localStorage.language]);


	// get the news
	// ------------------------------------------------------------------------
	onMount(() => {
		fetch('/data/news.json').then((response) => {
			if(!response.ok){ return Promise.reject(response); }

			return response.json();
		}).then((data) => {
			let latest = Array.isArray(data) ? data[0] : null;

			// the news is shown only when it has the message in the user language,
			// as it is rendered outside of the screen error boundary
			if(!latest?.[localStorage.language]?.title){ return; }

			// the date is an ISO date (e.g. 2026-10-14T12:50:31Z), a news
			// with a date that can't be read is not shown
			if(Date.parse(latest.date) > appState.previousVisit && appState.pushupsTotal > 0){
				news = latest;
				appState.setPopupShown(true);
			}
		}).catch((error) => {
			handleError('News could not be fetched', false, error);
		});
	});


	// purpose:		react to user clicking
	// arguments:	the thing to do
	//				null for closing the popup, 'url' for going somewhere
	// ------------------------------------------------------------------------
	function action(toDo){
		if(!toDo){
			news = null;
			appState.setPopupShown(false);
		}
		else if (toDo === 'url'){
			// the opened page gets no access back to the app
			window.open(news.url, '_blank', 'noopener');
			action();
		}
	};


	// purpose:		shows the popup as a modal dialog, so it takes the focus,
	//				blocks the page under it and can be closed with Esc
	// arguments:	the dialog element
	// ------------------------------------------------------------------------
	function showModal(dialog){
		dialog.showModal();
	};

	// purpose:		closes the popup when clicked outside of its content
	// ------------------------------------------------------------------------
	function closeOnBackdrop(event){
		if(event.target === event.currentTarget){
			action();
		}
	};

	// purpose:		closes the popup on Esc with the animation, instead of
	//				the instant closing done by the browser
	// ------------------------------------------------------------------------
	function closeOnEsc(event){
		event.preventDefault();
		action();
	};


	// purpose:		iOS PWA takes the status bar color from the background color
	//				this means we need to change it when popup appears
	//				compensating for animation times
	//				css transitions won't work, the status bar will transition
	//				from white at page load :<
	// ------------------------------------------------------------------------
	$effect(() => {
		transitionBackground();
	});

	let transitionTimeout = '';

	function transitionBackground(){
		if(appState.popupShown){
			clearTimeout(transitionTimeout);
			document.body.classList.add('app-popupShown');
		} else {
			clearTimeout(transitionTimeout);
			transitionTimeout = setTimeout(() => {
				document.body.classList.remove('app-popupShown');
			}, 600);
		}
	};

</script>


<style>

	.infoPopup {
		width: 100%;
		height: 100%;
		max-width: none;
		max-height: none;
		margin: 0;
		padding: 0;
		overflow: visible;

		border: 0;
		background: none;
		color: var(--color-pureContent);
	}

	.infoPopup::backdrop {
		background: none;
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

		user-select: none;
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
	<dialog class="infoPopup" {@attach showModal} onclick={closeOnBackdrop} oncancel={closeOnEsc}>
		<div in:fromTop|global={{ duration: 700, delay: 500 }} out:fromTop|global={{ duration: 700 }} class="infoPopup-content">
			<h1 class="infoPopup-heading">{@html message.title}</h1>
			{@html message.content}

			{#if message.actionClose}
				<button
					onclick={() => action()}
					class={['infoPopup-action', message.actionClose && message.actionYes && 'infoButton-choices']}
				>{@html message.actionClose}</button>
			{/if}
			{#if message.actionYes}
				<button
					onclick={() => action(news.action)}
					class={['infoPopup-action', message.actionClose && message.actionYes && 'infoButton-choices']}
				>{@html message.actionYes}</button>
			{/if}
		</div>
	</dialog>
{/if}
