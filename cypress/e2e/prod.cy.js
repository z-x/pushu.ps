// need to disable service worker as it caches the page and this breaks Cypress
Cypress.on('window:before:load', window => {
  delete window.navigator.__proto__.ServiceWorker;
});


describe('Check if production data available', () => {

	it('Load the app', () => {
		cy.visit('/');

		cy.contains('Hello there');
	});

	it('Choose the training level based on input', () => {
		cy.contains('Ok, I want to start').click();
		cy.get('input[type="number"]').type('2');
		cy.contains('Ok, what’s next?').click();
		cy.get('.sidebar-info li:nth-child(2)').contains('11');

		cy.clearLocalStorage();
		cy.visit('/');

		cy.contains('Ok, I want to start').click();
		cy.get('input[type="number"]').type('6');
		cy.contains('Ok, what’s next?').click();
		cy.get('.sidebar-info li:nth-child(2)').contains('24');

		cy.clearLocalStorage();
		cy.visit('/');

		cy.contains('Ok, I want to start').click();
		cy.get('input[type="number"]').type('11');
		cy.contains('Ok, what’s next?').click();
		cy.get('.sidebar-info li:nth-child(2)').contains('43');
	});

});
