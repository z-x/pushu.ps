describe('Initialize the app', () => {

	it('Load the app', () => {
		cy.visit('/');

		cy.contains('Hello there');
	});

	it('Choose the training level based on input', () => {
		cy.contains('Ok, I want to start').click();
		cy.get('input[type="number"]').type('2');
		cy.contains('Ok, what’s next?').click();
		cy.get('.sidebar-info li:nth-child(2)').contains('2');

		cy.clearLocalStorage();
		cy.visit('/');

		cy.contains('Ok, I want to start').click();
		cy.get('input[type="number"]').type('6');
		cy.contains('Ok, what’s next?').click();
		cy.get('.sidebar-info li:nth-child(2)').contains('4');

		cy.clearLocalStorage();
		cy.visit('/');

		cy.contains('Ok, I want to start').click();
		cy.get('input[type="number"]').type('11');
		cy.contains('Ok, what’s next?').click();
		cy.get('.sidebar-info li:nth-child(2)').contains('6');
	});

});


describe('Do the workout', () => {

	it('Pass the workout', () => {
		localStorage.page = 'Home';
		localStorage.level = 1;
		
		cy.visit('/');
		cy.contains('Start next training').click();
		cy.contains('Perform 1 pushup');
		cy.contains('I made it').click();
		cy.get('.training-number').contains('2');
		cy.contains('I made it').click();
		cy.contains('Nice');
		cy.contains('It was ok').click();
		cy.get('.sidebar-info li:nth-child(1)').contains('2');
		cy.get('.sidebar-info li:nth-child(2)').contains('22');
		cy.get('.sidebar-info li:nth-child(3)').contains('2');
	});

	it('Repeat workout', () => {
		cy.contains('Start next training').click();
		cy.wait(300).contains('I made it').click();
		cy.wait(300).contains('I made it').click();
		cy.contains('It was hard').click();
		cy.get('.sidebar-info li:nth-child(1)').contains('2');
		cy.get('.sidebar-info li:nth-child(2)').contains('22');
		cy.get('.sidebar-info li:nth-child(3)').contains('2');		
	});

	it('Cancel workout', () => {
		cy.contains('Start next training').click();
		cy.contains('I made it');
		cy.get('.menu-toggle').last().click();
		cy.contains('Cancel this training').click();
		cy.contains('Yes').click();
		cy.get('.sidebar-info li:nth-child(1)').contains('2');
		cy.get('.sidebar-info li:nth-child(2)').contains('22');
		cy.get('.sidebar-info li:nth-child(3)').contains('2');
	});

	it('Skip the rest', () => {
		cy.contains('Start next training').click();
		cy.contains('I made it').click();
		cy.contains('Skip the wait').click();
		cy.contains('I made it');
	});

	it('Repeats the last training', () => {
		localStorage.page = 'Training';
		localStorage.level = 1;
		localStorage.set = 2;
		localStorage.currentStep = 1;

		cy.visit('/');

		cy.contains('I made it').click();
		cy.contains('It was ok').click();
		cy.get('.sidebar-info li:nth-child(3)').contains('2');
		cy.contains('Start next training').click();
		cy.contains('I made it');
	});

});


describe('Menu', () => {

	it('Opens menu', () => {
		cy.get('.menu-toggle').last().click();
		cy.contains('App created behind the Second Gate');
	});

	it('Closes menu', () => {
		cy.get('.menu-overlay').click();
	});

	it('Manual training level setting', () => {
		cy.clearLocalStorage();
		cy.visit('/');

		cy.get('.menu-toggle').click();
		cy.contains('Manually set your training level').click();
		cy.contains('Set your skill to:').next().select('Advanced');
		cy.contains('Set your level to:').next().select('2');
		cy.contains('Accept').click();
		cy.get('.sidebar-info li:nth-child(2)').contains('66');
		cy.get('.sidebar-info li:nth-child(3)').contains('2');
	});

	it('Instructions', () => {
		cy.clearLocalStorage();
		cy.visit('/');

		cy.get('.menu-toggle').click();
		cy.contains('Instructions').click();
		cy.contains('How to start');
		cy.contains('Back').click();
	});

	it('Change language', () => {
		cy.contains('Set app language').click({force: true});
		cy.contains('Set your language to:').next().select('Polski');
		cy.contains('Accept').click();
		cy.contains('Cześć, ta apka pomoże Ci ćwiczyć pompki');
	});

	it('Reset the app', () => {
		localStorage.page = 'Home';
		localStorage.level = 1;
		localStorage.set = 1;

		cy.visit('/');
		cy.get('.menu-toggle').click();
		cy.contains('Reset the app').click();
		cy.contains('I am sure').click();

		cy.contains('Hello there');
	});

});


describe('News', () => {

	it('Does not show the news for new user', () => {
		localStorage.lastActive = 5555;
		localStorage.page = 'Home';

		cy.visit('/');
		cy.get('.infoPopup-content').should('not.exist');
	});

	it('Shows the news for active user', () => {
		localStorage.lastActive = 5555;
		localStorage.page = 'Home';
		localStorage.pushupsTotal = 5;

		cy.visit('/');
		cy.get('.infoPopup-content').should('be.visible');
	});

	it('Closes the news popup', () => {
		cy.get('.infoPopup-action').click();
		cy.get('.infoPopup-content').should('not.exist');
	});

});


describe('User interface', () => {

	it('Shows the training idicator', () => {
		localStorage.page = 'Training';
		localStorage.level = 1;
		localStorage.set = 1;

		cy.visit('/');
		cy.get('.sidebar-info-indicator').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 61)');
		cy.contains('I made it').click();
		cy.wait(300);
		cy.get('.sidebar-info-indicator').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 122)');
	});

});