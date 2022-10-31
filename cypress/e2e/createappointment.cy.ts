import { SENIOR_EMAIL, COMMON_PASSWORD } from '../fixtures/credentials';

describe('Authentication Test', () => {
    it('should successfully visit app', () => {
        cy.visit('https://easy-schedule-34f43.web.app/');
    });

    it('should successfully sign in user', () => {
        cy.contains('Sign In').should('exist');
        cy.get('input#email').should('exist').type(SENIOR_EMAIL);
        cy.get('input#password').should('exist').type(COMMON_PASSWORD);
        cy.contains('Submit').should('exist').click();

        // Should be inside the app
        cy.contains('Appointments').should('exist');
    });
    it('create new appointment', () => {
        cy.get('.MuiButton-contained').click();
        // Should be back to the sign in page
        // cy.get('input#demo-simple-select').should('exist').type();
        cy.get('#demo-simple-select').click().get('li.MuiButtonBase-root:nth-child(10)').click();
        cy.get('input#title').should('exist').type('buy groceries');
        cy.get('input#location').should('exist').type('flower road, vancouver');
        //  cy.get('button.MuiButtonBase-root:nth-child(1) > svg:nth-child(1)').click();
        // cy.contains('div.MuiDayPicker-weekContainer:nth-child(6) > button:nth-child(2)').click();
        //cy.contains('31').should('exist').click({ force: true });

        cy.get('.appointment-date-input')
            .should('exist')
            .type('10/31/2022 10:00 AM', { force: true });
        cy.get('.MuiButton-containedSizeMedium').click();
        // Should be inside the app
        cy.contains('Appointments').should('exist');
    });
});
