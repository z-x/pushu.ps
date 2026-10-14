<!--  
	menu: manually adjusting the training level
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import appState from '../Data/state.svelte.js';
	import string from '../Data/translations.js';
	import training from '../Data/training.js';
	import Menu from '../UI/Menu.svelte';


	// local properties
	// ------------------------------------------------------------------------
	let userSkill = $state(appState.level);
	let userSet = $state(appState.set);
	// the sets available in the training data for the chosen skill
	let sets = $derived(Object.keys(training[userSkill]).map(Number));


	// purpose:		sets the user info according to user input
	// returns:		dispatches a 'manualSkill' event and redirects to Home page
	// ------------------------------------------------------------------------
	function setSkill(){
		window.dispatchEvent(new CustomEvent('manualSkill', { detail: {level: userSkill, set: userSet} }));

		appState.setLevel(userSkill);
		appState.setSet(userSet);
		appState.setPage('Home');
	};

</script>




<Menu
	menuId="ManualTrainingLevel"
	contentClass="menu-form"
	buttonBackLabel={string.cancel}
	buttonNextLabel={string.accept}
	buttonNextAction={setSkill}
>
	<div class="form-row">
		<h2 class="form-label">{string.setYourSkillTo}</h2>
		<select bind:value="{ userSkill }">
			<option value={1}>{string.beginner}</option>
			<option value={2}>{string.intermediate}</option>
			<option value={3}>{string.advanced}</option>
		</select>
	</div>
	<div class="form-row">
		<h2 class="form-label">{string.setYourLevelTo}</h2>
		<select bind:value="{ userSet }">
			{#each sets as set (set)}
				<option value={set}>{set}</option>
			{/each}
		</select>
	</div>
</Menu>