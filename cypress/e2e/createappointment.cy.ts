import { SENIOR_EMAIL, COMMON_PASSWORD } from '../fixtures/credentials';

describe('Create New Appointment', () => {
    const timeNow = new Date().getTime().toString();
    const APPOINTMENT_TITLE = 'help with groceries ' + timeNow;

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
        cy.contains('New Appointment').should('exist').click({ multiple: true });
        cy.get('#demo-simple-select')
            .click()
            .get('li.MuiButtonBase-root:nth-child(10)')
            .click({ multiple: true });

        cy.get('input#title').should('exist').type(APPOINTMENT_TITLE);
        cy.get('input#location').should('exist').type('1123 star ave, Richmond');
        cy.get('button.MuiButtonBase-root:nth-child(1) > svg:nth-child(1)');
        cy.get('input[placeholder="mm/dd/yyyy hh:mm (a|p)m"]')
            .should('exist')
            .clear()
            .type('11/29/2022 03:00 PM');

        cy.contains('button', 'Schedule').should('exist').click({ multiple: true });
        cy.contains('Appointments').should('exist');

        // Check if the appointment details are displayed on the list
        cy.contains(APPOINTMENT_TITLE).should('exist');
        cy.contains('1123 star ave, Richmond').should('exist');
    });
    it('successfully view appointment details', () => {
        cy.contains('View Appointment').first().should('exist').click();
        cy.wait(1000);
        cy.contains('Home').should('exist').click();
    });
    it('successfully delete appointment', () => {
        console.log(APPOINTMENT_TITLE);

        cy.contains(APPOINTMENT_TITLE).parent().parent().find('[data-testid="DeleteIcon"]').click();

        //check if deleted appointment exists

        cy.contains(APPOINTMENT_TITLE).should('not.exist');
    });
    it('should successfully log out the user', () => {
        cy.contains('Logout').should('exist').click();

        // Should be back to the sign in page
        cy.contains('Sign In').should('exist');
    });
});
