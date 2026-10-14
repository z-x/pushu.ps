<!--  
	menu: manually set the app language
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import appState from '../Data/state.svelte.js';
	import string from '../Data/translations.js';
	import Menu from '../UI/Menu.svelte';


	// local properties
	// ------------------------------------------------------------------------
	let selectedLanguage = $state(localStorage.language);


	// purpose:		sets the language
	// ------------------------------------------------------------------------
	function setLanguage(){
		localStorage.language = selectedLanguage;
		window.location.reload();
	};

</script>




<Menu
	contentClass="menu-form"
	buttonBackLabel={string.cancel}
	buttonNextLabel={string.accept}
	buttonNextAction={setLanguage}
>
	<div class="form-row">
		<h2 class="form-label">{string.setYourLanguageTo}</h2>
		<select bind:value="{ selectedLanguage }">
			{#each Object.keys(string.supportedLanguages) as lang}
				<option value="{lang}">{string.supportedLanguages[lang][0]}</option>
			{/each}
		</select>
	</div>
</Menu>