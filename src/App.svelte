<script>

	// set defaults
	// ------------------------------------------------------------------------
	if(!localStorage.language){ localStorage.language = 'en-US'; }
	localStorage.lastActive = Date.now();

	import { onMount } from 'svelte';

	// pages
	// ------------------------------------------------------------------------
	import Hello from './Screens/Hello.svelte';
	import Test from './Screens/Test.svelte';
	import Home from './Screens/Home.svelte';
	import Training from './Screens/Training.svelte';
	import Finish from './Screens/Finish.svelte';
	import News from './Screens/News.svelte';

	// stores
	// ------------------------------------------------------------------------
	import state from './Data/state.js';
	import translations from './Data/translations.js';


	// app state info
	// ------------------------------------------------------------------------
	let pages = {Hello, Test, Home, Training, Finish};


	// handle news loading
	// ------------------------------------------------------------------------
	let lastActive = $state.lastActive;


</script>


<News />


<main class="app" class:app-outOfPlan="{ $state.popupShown }">
	<svelte:component this="{ pages[$state.page] }" />
</main>