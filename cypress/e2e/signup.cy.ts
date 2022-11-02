import { COMMON_PASSWORD } from '../fixtures/credentials';

describe('signup', () => {
    it('should successfully visit app', () => {
        cy.visit('https://easy-schedule-34f43.web.app/signup');
    });

    it('should successfully sign up', () => {
        cy.contains('Sign up').should('exist');
        cy.get('input#firstName').should('exist').type('Jerry');
        cy.get('input#lastName').should('exist').type('Garner');
        cy.get('input#email').should('exist').type('jerry@gmail.com');
        cy.get('input#password').should('exist').type(COMMON_PASSWORD);
        cy.get('input#address').should('exist').type('1001  98 ave, Vancouver');
        cy.contains('Register').should('exist').click();

        // Should be on Sign In page
        cy.contains('Sign In').should('exist');
    });
    it('new user should successfully signin', () => {
        cy.get('input#email').should('exist').type('jerry@gmail.com');
        cy.get('input#password').should('exist').type(COMMON_PASSWORD);
        cy.contains('Submit').should('exist').click();

        // Should be inside the app
        cy.contains('Appointments').should('exist');
    });
});
