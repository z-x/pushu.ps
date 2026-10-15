<!--  
	The menu toggle button
-->

<script>

	// imports
	// ------------------------------------------------------------------------
	import appState from '../Data/state.svelte.js';
	import string from '../Data/translations.js';


	// variables
	// ------------------------------------------------------------------------
	// if the menu was open the last time we checked (bool)
	let wasOpen = false;
	// if the last user interaction was with the keyboard (bool)
	let usingKeyboard = false;


	// purpose:		when the menu closes bring the focus back to menu toggle,
	//				but only for keyboard users that were inside the menu,
	//				so it doesn't show the focus ring on app start or after a tap
	// arguments:	the toggle button element
	// ------------------------------------------------------------------------
	function focusWhenMenuClosed(toggle){
		if(appState.menu){
			wasOpen = true;
		} else if(wasOpen){
			wasOpen = false;

			if(usingKeyboard && document.activeElement?.closest('.menu')){
				toggle.focus();
			}
		}
	};


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




<svelte:window
	onkeydown={() => usingKeyboard = true}
	onpointerdown={() => usingKeyboard = false}
/>

<button
	{@attach focusWhenMenuClosed}
	onclick={() => appState.setMenu('Main')}
	class="menu-toggle"
	title={string.showMenu}
>
	{string.menu}
</button>