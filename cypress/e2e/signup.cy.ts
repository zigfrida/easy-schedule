import { COMMON_PASSWORD } from '../fixtures/credentials';

const TEST_USER = `user-${Date.now()}@gmail.com`;

describe('signup', () => {
    it('should successfully visit app', () => {
        cy.visit('https://easy-schedule-34f43.web.app/signup');
    });

    it('should successfully sign up', () => {
        // As a user, I should be able to sign up to the Easy Schedule App
        cy.contains('Sign up').should('exist');
        cy.get('input#firstName').should('exist').type('Kamal');
        cy.get('input#lastName').should('exist').type('Sekhon');
        cy.get('input#email').should('exist').type(TEST_USER);
        cy.get('input#password').should('exist').type(COMMON_PASSWORD);
        cy.get('input#address').should('exist').type('1001  98 ave, Vancouver');
        cy.contains('Senior').should('exist').click();
        cy.contains('Register').should('exist').click();

        // Should be on Sign In page
        cy.contains('Sign In').should('exist');
    });
    it('new user should successfully signin', () => {
        // As a user, I should be able to log in to the Easy Schedule App once I'm registered
        cy.get('input#email').should('exist').type(TEST_USER);
        cy.get('input#password').should('exist').type(COMMON_PASSWORD);
        cy.contains('Submit').should('exist').click();

        // As a user, I should be able to see the UI elements for me to create an appointment
        cy.contains('Appointments').should('exist');
        cy.contains('New Appointment').should('exist');
    });
    it('should successfully log out the user', () => {
        // As a user, I should be able to log out of the application.
        cy.contains('Logout').should('exist').click();

        // Should be back to the sign in page
        cy.contains('Sign In').should('exist');
    });
});
