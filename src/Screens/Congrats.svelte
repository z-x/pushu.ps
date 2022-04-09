<!--  
	When the user passes 100 pushups in a single set
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import state from '../Data/state.js';
	import string from '../Data/translations.js';
	import { appear, slide } from '../Helpers/transitions.js';
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

	@supports at-rule(@property){
		.counter {
			animation-name: counter;
			animation-duration: 4s;
			animation-timing-function: ease-in-out;
			animation-fill-mode: forwards;
			counter-reset: num var(--num);
		}

		.counter:after {
			content: counter(num);
		}

		.sr {
			position: absolute;
			top: -200%;
			left: -200%;
		}
	}

</style>




<Sidebar />

<section class="main" in:slide out:slide="{ {direction: 'out'} }">
	<div class="content content-readable">
		<p in:appear="{ {delay: 400, duration: 600} }" class="text-title">{string.youvePassed}</p>
		<p in:appear="{ {delay: 500, duration: 300} }" class="counter text-wow"><span class="sr">100</span></p>
		<p in:appear="{ {delay: 600, duration: 300} }" class="text-title">{string.pushups(100)}</p>
		<p in:appear="{ {delay: 800, duration: 600} }" class="text-note">{string.inSinglePractice}<br>{string.movingOn}</p>
		<p in:appear="{ {delay: 1000, duration: 600} }" class="text-subtitle">{string.respects}</p>
	</div>

	<MainAction delay="1300" on:mainAction="{ accept }">{string.thanks}</MainAction>
</section>
