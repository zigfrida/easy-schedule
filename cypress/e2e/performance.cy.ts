/* eslint-disable @typescript-eslint/no-loop-func */
import { COMMON_PASSWORD, TEST_NURSE_NAME } from '../fixtures/credentials';

const TEST_USER = `user-${Date.now()}@gmail.com`;

describe('Appointments Test', () => {
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

    // Create 50 appointments
    for (let i = 0; i < 50; i += 1)
        it('should successfully create a new appointment as a senior', () => {
            const timeNow = new Date().getTime().toString();
            const APPOINTMENT_TITLE = `help with groceries ${timeNow}`;
            const APPOINTMENT_LOCATION = '1123 star ave, Richmond';
            const APPOINTMENT_DATE = '12/29/2022 03:00 PM';

            // As a user, a form should be displayed when I clicked on the New Appointment button
            cy.contains('New Appointment').should('exist').click({ multiple: true });
            // Seeing the "Schedule New Appointment" text means that the modal is open
            cy.contains('Schedule New Appointment').should('exist');

            // As a user, I should be able to select the desired nurse for a task
            cy.get('#demo-simple-select').click();
            cy.contains(TEST_NURSE_NAME).click();

            // As a user, I should be able to enter the appointment title
            cy.get('input#title').should('exist').type(APPOINTMENT_TITLE);
            // As a user, I should be able to enter the appointment location
            cy.get('input#location').should('exist').type(APPOINTMENT_LOCATION);
            // As a user, I should be able to enter the appointment date
            cy.get('input[placeholder="mm/dd/yyyy hh:mm (a|p)m"]')
                .should('exist')
                .clear()
                .type(APPOINTMENT_DATE);

            // As a user, once all fields are entered, I should be able to save the appointment
            cy.contains('button', 'Schedule').should('exist').click({ multiple: true });
            // Once the appointment is created, the modal should no longer appear.
            cy.contains('Schedule New Appointment').should('not.exist');

            // As a user, once the appointment is saved, I should be able to see the
            // appointment in the Appointments List
            cy.contains(APPOINTMENT_TITLE).should('exist');
            cy.contains(APPOINTMENT_LOCATION).should('exist');
        });

    it('should successfully log out the user as a senior', () => {
        // As a user, I should be able to log out of the application
        cy.contains('Logout').should('exist').click();

        // Should be back to the sign in page
        cy.contains('Sign In').should('exist');
    });
});
