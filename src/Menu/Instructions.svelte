<!--  
	menu: instructions
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import string from '../Data/translations.js';
	import Menu from '../UI/Menu.svelte';

</script>




<Menu
	menuId="Instructions"
	contentClass="menu-article"
	longContent="{ true }"
>

	{@html string.instructionsContent}

</Menu>