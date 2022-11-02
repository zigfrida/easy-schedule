import { SENIOR_EMAIL, COMMON_PASSWORD } from '../fixtures/credentials';

describe('Create New Appointment', () => {
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
        cy.contains('New Appointment').should('exist').click();
        cy.get('#demo-simple-select').click().get('li.MuiButtonBase-root:nth-child(10)').click();
        cy.get('input#title').should('exist').type('help with food prep');
        cy.get('input#location').should('exist').type('1123 star ave, Richmond');
        cy.get('button.MuiButtonBase-root:nth-child(1) > svg:nth-child(1)')
            .click()
            .get('div.MuiDayPicker-weekContainer:nth-child(1) > button:nth-child(6)')
            .click()
            .get('div.MuiPaper-root')
            .click()
            .get('.MuiClock-squareMask')
            .click();
        cy.contains('button', 'Schedule').should('exist').click();
        cy.contains('Appointments').should('exist');
        // Check if the appointment details are displayed on the list
        cy.contains('help with food prep').should('exist');
        cy.contains('1123 star ave, Richmond').should('exist');
    });
    it('should successfully log out the user', () => {
        cy.contains('Logout').should('exist').click();

        // Should be back to the sign in page
        cy.contains('Sign In').should('exist');
    });
});
