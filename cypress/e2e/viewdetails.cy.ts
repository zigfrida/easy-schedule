import { SENIOR_EMAIL, COMMON_PASSWORD } from '../fixtures/credentials';

describe('View Details', () => {
    it('should successfully visit app', () => {
        cy.visit('https://easy-schedule-34f43.web.app/');
    });

    it('should successfully sign in user', () => {
        cy.get('input#email').should('exist').type(SENIOR_EMAIL);
        cy.get('input#password').should('exist').type(COMMON_PASSWORD);
        cy.contains('Submit').should('exist').click();

        // Should be inside the app
        cy.contains('Appointments').should('exist');
    });
    it('successfully view appointment details', () => {
        cy.get('div.MuiBox-root:nth-child(2) > div:nth-child(1)').click();
        cy.wait(3000);
        cy.contains('Home').should('exist').click();
    });
    it('should successfully log out the user', () => {
        cy.contains('Logout').should('exist').click();

        // Should be back to the sign in page
        cy.contains('Sign In').should('exist');
    });
});
