<!--  
	menu: manually adjusting the training level
-->



<script>

	// imports
	// ------------------------------------------------------------------------
	import state from '../Data/state.js';
	import string from '../Data/translations.js';
	import Menu from '../UI/Menu.svelte';


	// local properties
	// ------------------------------------------------------------------------
	let userSkill = $state.level.toString();
	let userSet = $state.set.toString();


	// purpose:		sets the user info according to user input
	// returns:		dispatches a 'manualSkill' event and redirects to Home page
	// ------------------------------------------------------------------------
	function setSkill(){
		window.dispatchEvent(new CustomEvent('manualSkill', { detail: {level: parseInt(userSkill), set: parseInt(userSet)} }));

		state.setLevel(parseInt(userSkill));
		state.setSet(parseInt(userSet));
		state.setPage('Home');
	};

</script>




<Menu
	menuId="ManualTrainingLevel"
	contentClass="menu-form"
	buttonBackLabel="{ string.cancel }"
	buttonNextLabel="{ string.accept }"
	buttonNextAction="{ () => setSkill() }"
>
	<div class="form-row">
		<h2 class="form-label">{string.setYourSkillTo}</h2>
		<select bind:value="{ userSkill }">
			<option value="1">{string.beginner}</option>
			<option value="2">{string.intermediate}</option>
			<option value="3">{string.advanced}</option>
		</select>
	</div>
	<div class="form-row">
		<h2 class="form-label">{string.setYourLevelTo}</h2>
		<select bind:value="{ userSet }">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
			<option value="10">10</option>
			<option value="11">11</option>
			<option value="12">12</option>
			<option value="13">13</option>
			<option value="14">14</option>
			<option value="15">15</option>
			<option value="16">16</option>
			<option value="17">17</option>
			<option value="18">18</option>
		</select>
	</div>
</Menu>