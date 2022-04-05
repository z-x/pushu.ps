<!--  
	When the user passes 100 pushups in a single set
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import { onDestroy } from 'svelte';
	import state from '../Data/state.js';
	import string from '../Data/translations.js';
	import training from '../Data/training.js';
	import { slide } from '../Helpers/transitions.js';
	import MainAction from '../UI/MainAction.svelte';
	import Sidebar from '../UI/Sidebar.svelte';


	// purpose:		move on to the home page after reading the congrats
	// return:		redirects to home screen
	// ------------------------------------------------------------------------
	function accept(){
		state.setCongrats(true);
		state.setPage('Home');
	};

</script>

<style>
	.text-wow {
		line-height: 1em;
		font-size: clamp(2rem, 40vw, 15rem);
		font-weight: bold;
	}

	.text-subtitle {
		margin-top: 2em;
	}

	@property --num {
		syntax: '<integer>';
		initial-value: 0;
		inherits: false;
	}

	@keyframes counter {
		from {
			--num: 0;
		}
		to {
			--num: 100;
		}
	}

	.counter {
		animation-name: counter;
		animation-duration: 5s;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
		counter-reset: num var(--num);
	}

	.counter:after {
		content: counter(num);
	}

	.sr {
		position: absolute;
		top: -100%;
		left: -100%;
	}
</style>




<Sidebar />

<section class="main" in:slide out:slide="{ {direction: 'out'} }">
	<div class="content content-readable">
		<p class="text-title">{string.youvePassed}</p>
		<p class="counter text-wow"><span class="sr">100</span></p>
		<p class="text-title">{string.pushups(100)}</p>
		<p class="text-note">{string.inSinglePractice}<br>{string.movingOn}</p>
		<p class="text-subtitle">{string.respects}</p>
	</div>

	<MainAction delay="400" on:mainAction="{ accept }">{string.thanks}</MainAction>
</section>
