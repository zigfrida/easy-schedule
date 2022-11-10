import { SENIOR_EMAIL, COMMON_PASSWORD } from '../fixtures/credentials';
for (let i = 0; i < 10; i++) {
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

        it('should successfully log out the user', () => {
            cy.contains('Logout').should('exist').click();

            // Should be back to the sign in page
            cy.contains('Sign In').should('exist');
        });
    });
}
