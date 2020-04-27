<!--  
	menu: privacy policy
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import string from '../Data/translations.js';
	import Submenu from '../UI/Submenu.svelte';

</script>




<Submenu
	menuId="PrivacyPolicy"
	contentClass="menu-article"
	longContent="{ true }"
>

	{@html string.privacyPolicyContent}

</Submenu>