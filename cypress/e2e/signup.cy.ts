import { COMMON_PASSWORD } from '../fixtures/credentials';

describe('signup', () => {
    it('should successfully visit app', () => {
        cy.visit('https://easy-schedule-34f43.web.app/signup');
    });

    it('should successfully sign up', () => {
        cy.contains('Sign up').should('exist');
        cy.get('input#firstName').should('exist').type('Olivia');
        cy.get('input#lastName').should('exist').type('Bright');
        cy.get('input#email').should('exist').type('olivia@gmail.com');
        cy.get('input#password').should('exist').type(COMMON_PASSWORD);
        cy.get('input#address').should('exist').type('8988 41 ave, Burnaby');
        cy.contains('Register').should('exist').click();

        // Should be on Sign In page
        cy.contains('Sign In').should('exist');
    });
});
