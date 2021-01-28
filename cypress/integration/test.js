const { intros } = require("svelte/internal")

describe('Pass the first test', () => {
	it('Loads the app', () => {
		cy.visit('/');

		cy.contains('Ok, I want to start').click();

		cy.get('input[type="number"]').type('2');

		cy.contains('Ok, what’s next?').click();

		cy.contains('Start next training').click();

		cy.contains('Perform 1 pushup');

		cy.contains('I made it').click();

		cy.wait(60000);

		cy.contains('I made it').click();
	});
});