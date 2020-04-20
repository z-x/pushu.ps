<!--  
	The initial welcome message screen
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import string from '../Data/translations.js';
	import { appear, slide } from '../Helpers/transitions.js';
	import MainAction from '../UI/MainAction.svelte';
	import Sidebar from '../UI/Sidebar.svelte';


	// detecting devices so we can inform the user how to add the app to home screen
	// this will not detect every possible Android configuration but we can live with it
	let isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
	let isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;

</script>

<style>

	.text-note {
		padding-right: 50px;

		background-repeat: no-repeat;
	}

	.note-ios {
		background-image: url('data:image/svg+xml;utf8,%3Csvg height="50" width="50" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill="none" stroke="%23446bc6" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M17 10l8-8 8 8M25 32V2.333"/%3E%3Cpath fill="none" d="M0 0h50v50H0z"/%3E%3Cpath d="M17 17H8v32h34V17h-9" fill="none" stroke="%23446bc6" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/%3E%3C/svg%3E');
		background-size: 33px;
		background-position: right top 40%;
	}

	.note-android {
		background-image: url('data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 89"%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:%23666;fill-rule:evenodd;%7D%3C/style%3E%3C/defs%3E%3Cpath class="a" d="M10.5,21A10.5,10.5,0,1,0,0,10.5,10.5,10.5,0,0,0,10.5,21Zm0,47A10.5,10.5,0,1,0,21,78.5,10.5,10.5,0,0,0,10.5,68Zm0-34A10.5,10.5,0,1,0,21,44.5,10.5,10.5,0,0,0,10.5,34Z"/%3E%3C/svg%3E');
		background-size: 33px 33px;
		background-position: right center;
	}

</style>




<Sidebar />

<section class="main" out:slide="{ {direction: 'out'} }">
	<div class="content content-readable">
		<h1 in:appear="{ {delay: 200, duration: 600} }" class="text-title">{string.helloThere}</h1>
		<p in:appear="{ {delay: 900} }"class="text-subtitle">{string.progressRemember}</p>
		{#if isIOS}
			<p in:appear="{ {delay: 1500} }" class="text-note note-ios">{string.saveAppApple}</p>
		{/if}
		{#if isAndroid}
			<p in:appear="{ {delay: 1500} }" class="text-note note-android">{string.saveAppAndroid}</p>
		{/if}
	</div>

	<MainAction delay="1800" changePageTo="Test">{string.wantToStart}</MainAction>
</section>