<!--  
	When the user passes 100 pushups in a single set
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import appState from '../Data/state.svelte.js';
	import string from '../Data/translations.js';
	import { appear, slide } from '../Helpers/transitions.js';
	import MainAction from '../UI/MainAction.svelte';
	import Sidebar from '../UI/Sidebar.svelte';


	// the shown number counts up from 0 to 100 when the screen appears
	// (done in JS, as iOS Safari does not repaint a CSS counter animated with @property)
	// ------------------------------------------------------------------------
	const count = new Tween(0, { duration: 4000, easing: cubicInOut });

	onMount(() => {
		count.target = 100;
	});


	// purpose:		move on to the home page after reading the congrats
	// return:		redirects to home screen
	// ------------------------------------------------------------------------
	function accept(){
		appState.setCongrats(true);
		appState.setPage('Home');
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

	/* the shown number changes while counting, this one is for screen readers */
	.sr {
		position: absolute;
		top: -200%;
		left: -200%;
	}

</style>




<Sidebar />

<section class="main" in:slide|global out:slide|global={{ direction: 'out' }}>
	<div class="content content-readable">
		<p in:appear|global={{ delay: 400, duration: 600 }} class="text-title">{string.youvePassed}</p>
		<p in:appear|global={{ delay: 500, duration: 300 }} class="text-wow"><span aria-hidden="true">{Math.round(count.current)}</span><span class="sr">100</span></p>
		<p in:appear|global={{ delay: 600, duration: 300 }} class="text-title">{string.pushups(100)}</p>
		<p in:appear|global={{ delay: 800, duration: 600 }}>{string.inSinglePractice}</p>
		<p in:appear|global={{ delay: 1000, duration: 600 }} class="text-subtitle">{string.respects}</p>
	</div>

	<MainAction delay={1300} onMainAction={accept}>{string.thanks}</MainAction>
</section>
