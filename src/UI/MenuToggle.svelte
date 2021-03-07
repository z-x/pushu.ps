<!--  
	The menu toggle button
-->

<script>

	// imports
	// ------------------------------------------------------------------------
	import { onMount } from 'svelte';
	import state from '../Data/state.js';
	import string from '../Data/translations.js';


	// if menu is closed bring the focus back to menu toggle
	$: if(!$state.menu){
		document.querySelector('.menu-toggle')?.focus();	
	}


</script>



<style>

	.menu-toggle {
		width: 40px;
		height: 40px;
		display: block;
		margin-top: auto;
		margin-bottom: .43rem;
		margin-left: auto;
		margin-right: auto;
		position: relative;
		top: 12px;

		overflow: hidden;

		background-image: url('data:image/svg+xml;utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 15"%3E%3Cpath d="M0 0h22v1H0zM0 7h22v1H0zM0 14h22v1H0z"/%3E%3C/svg%3E');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 22px 15px;

		white-space: nowrap;
		text-indent: 100%;
	}

</style>




<button
	on:click="{ (event) => { state.setMenu('Main'); } }"
	class="menu-toggle"
	title="{string.showMenu}"
>
	{string.menu}
</button>