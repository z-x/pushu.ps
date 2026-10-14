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
	contentClass="menu-article"
	longContent
>

	{@html string.instructionsContent}

</Menu>