<script>

	// pages
	// ------------------------------------------------------------------------
	import Hello from './Screens/Hello.svelte';
	import Test from './Screens/Test.svelte';
	import Home from './Screens/Home.svelte';
	import Training from './Screens/Training.svelte';
	import Finish from './Screens/Finish.svelte';

	// stores
	// ------------------------------------------------------------------------
	import state from './Data/state.js';
	import translations from './Data/translations.js';


	// app state info
	// ------------------------------------------------------------------------
	let pages = {Hello, Test, Home, Training, Finish};

</script>



<main class="app">
	<svelte:component this="{ pages[$state.page] }" />
</main>