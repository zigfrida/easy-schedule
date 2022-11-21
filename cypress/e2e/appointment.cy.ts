import {
    NURSE_EMAIL,
    SENIOR_EMAIL,
    COMMON_PASSWORD,
    TEST_NURSE_NAME,
    TEST_SENIOR_NAME,
} from '../fixtures/credentials';

describe('Appointments Test', () => {
    const timeNow = new Date().getTime().toString();
    const APPOINTMENT_TITLE = `help with groceries ${timeNow}`;
    const APPOINTMENT_LOCATION = '1123 star ave, Richmond';
    const APPOINTMENT_DATE = '12/29/2022 03:00 PM';
    const ADD_NOTE = 'message client for appointment confirmation';

    it('should successfully visit app', () => {
        cy.visit('https://easy-schedule-34f43.web.app/');
    });

    it('should successfully sign in as a senior', () => {
        // As a user, I should be able to login as a Senior to the Easy Schedule app.
        cy.contains('Sign In').should('exist');
        cy.get('input#email').should('exist').type(SENIOR_EMAIL);
        cy.get('input#password').should('exist').type(COMMON_PASSWORD);
        cy.contains('Submit').should('exist').click();

        // As a user, I should be able to see the UI elements that allows me to create an appointment
        cy.contains('Appointments').should('exist');
        cy.contains('New Appointment').should('exist');
    });

    it('should successfully create a new appointment as a senior', () => {
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

    it('successfully view appointment details as a senior', () => {
        // As a user, I should be able to view the details of the appointment
        cy.contains(APPOINTMENT_TITLE)
            .parent()
            .parent()
            .within(() => {
                cy.contains('View Appointment').should('exist').click();
            });
        cy.wait(2000);

        // As a user, I should see the correct title, date, nurse and location
        // when viewing the details of the appointment
        cy.get('input#title').should('have.value', APPOINTMENT_TITLE);
        cy.get('input#location').should('have.value', APPOINTMENT_LOCATION);
        cy.get('input#service').should('have.value', TEST_NURSE_NAME);

        // As a user, I should be able to go back to the Appointments list
        cy.contains('Home').should('exist').click();
        cy.contains('Appointments').should('exist');
    });

    it('should successfully log out the user as a senior', () => {
        // As a user, I should be able to log out of the application
        cy.contains('Logout').should('exist').click();

        // Should be back to the sign in page
        cy.contains('Sign In').should('exist');
    });

    // We are now logging in as the nurse that was assigned by the senior to the
    // appointment created above

    it('should successfully sign in as a nurse', () => {
        // As a user, I should be able to login as a Nurse to the Easy Schedule app.
        cy.contains('Sign In').should('exist');
        cy.get('input#email').should('exist').type(NURSE_EMAIL);
        cy.get('input#password').should('exist').type(COMMON_PASSWORD);
        cy.contains('Submit').should('exist').click();
    });

    it('should display the appointments assigned to the nurse', () => {
        // As a nurse, I should be able to see the appointments assigned to me
        cy.contains('Appointments').should('exist');

        // As a nurse, I should be able to see the correct title and location
        // in the appointments list
        cy.contains(APPOINTMENT_TITLE).should('exist');
        cy.contains(APPOINTMENT_LOCATION).should('exist');
    });

    it('successfully add notes by a nurse', () => {
        // As a user, I should be able to add the notes to the appointment
        cy.contains(APPOINTMENT_TITLE)
            .parent()
            .parent()
            .within(() => {
                cy.contains('View Appointment').should('exist').click();
            });
        cy.wait(1000);
        cy.get('#notes').should('exist').type(ADD_NOTE);
        cy.contains('Save').should('exist').click();
        cy.wait(1000);
        // As a user, I should be able to go back to the Appointments list
        cy.contains('Home').should('exist').click();
        cy.contains('Appointments').should('exist');
    });

    it('successfully view appointment details as a nurse', () => {
        // As a user, I should be able to view the details of the appointment
        cy.contains(APPOINTMENT_TITLE)
            .parent()
            .parent()
            .within(() => {
                cy.contains('View Appointment').should('exist').click();
            });
        cy.wait(2000);
        // As a user, I should see the correct title, date, senior, location and notes
        // when viewing the details of the appointment
        cy.get('input#title').should('have.value', APPOINTMENT_TITLE);
        cy.get('input#location').should('have.value', APPOINTMENT_LOCATION);
        cy.get('input#service').should('have.value', TEST_SENIOR_NAME);
        cy.get('#notes').should('have.value', ADD_NOTE);

        // As a user, I should be able to go back to the Appointments list
        cy.contains('Home').should('exist').click();
        cy.contains('Appointments').should('exist');
    });

    it('should successfully log out the user as a nurse', () => {
        // As a user, I should be able to log out of the application
        cy.contains('Logout').should('exist').click();

        // Should be back to the sign in page
        cy.contains('Sign In').should('exist');
    });

    // We are now logging in as the senior once again as we're going to test
    // the appointment deletion feature

    it('should successfully sign in as a senior', () => {
        // As a user, I should be able to login as a Senior to the Easy Schedule app.
        cy.contains('Sign In').should('exist');
        cy.get('input#email').should('exist').type(SENIOR_EMAIL);
        cy.get('input#password').should('exist').type(COMMON_PASSWORD);
        cy.contains('Submit').should('exist').click();

        // As a user, I should be able to see the UI elements that allows me to create an appointment
        cy.contains('Appointments').should('exist');
        cy.contains('New Appointment').should('exist');
    });

    it('successfully delete appointment', () => {
        cy.contains(APPOINTMENT_TITLE).parent().parent().find('[data-testid="DeleteIcon"]').click();

        // check if deleted appointment no longer exists
        cy.contains(APPOINTMENT_TITLE).should('not.exist');

        // Wait a few seconds so that deletion reflects on the server
        cy.wait(3000);
    });

    it('should successfully log out the user as a senior', () => {
        // As a user, I should be able to log out of the application
        cy.contains('Logout').should('exist').click();

        // Should be back to the sign in page
        cy.contains('Sign In').should('exist');
    });
});
