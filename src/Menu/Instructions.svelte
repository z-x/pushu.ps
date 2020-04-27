<!--  
	menu: instructions
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import string from '../Data/translations.js';
	import Submenu from '../UI/Submenu.svelte';

</script>




<Submenu
	menuId="Instructions"
	contentClass="menu-article"
	longContent="{ true }"
>

	{@html string.instructionsContent}

</Submenu>