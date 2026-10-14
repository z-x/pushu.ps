<!--  
	menu: privacy policy
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import string from '../Data/translations.js';
	import Menu from '../UI/Menu.svelte';

</script>




<Menu
	menuId="PrivacyPolicy"
	contentClass="menu-article"
	longContent
>

	{@html string.privacyPolicyContent}

</Menu>