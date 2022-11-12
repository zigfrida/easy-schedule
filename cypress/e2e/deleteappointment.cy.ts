import { text } from 'stream/consumers';
import { SENIOR_EMAIL, COMMON_PASSWORD } from '../fixtures/credentials';
//for (let i = 0; i < 10; i++) {
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
    it('delete appointment', () => {
        cy.get('body')
            .then(($body) => {
                if (
                    $body.find(
                        'div.MuiPaper-root:nth-child(1) > div:nth-child(1) > div:nth-child(1)',
                    ).length
                ) {
                    return 'div.MuiPaper-root:nth-child(1) > div:nth-child(1) > div:nth-child(1)';
                }
                return 'div.MuiPaper-root:nth-child(1) > div:nth-child(1) > div:nth-child(1)';
            })
            .then((selector) => {
                cy.get(selector);

                cy.get(selector).should(($div) => {
                    const text = $div.text();
                });
                cy.get('div.MuiPaper-root:nth-child(1) > div:nth-child(2) > button:nth-child(2)')
                    .should('exist')
                    .click();

                // cy.get('div.MuiPaper-root:nth-child(1) > div:nth-child(2) > button:nth-child(2)')
                //     .should('have.value', text)
                //     .should('not.exist');
            });
    });
    it('should successfully log out the user', () => {
        cy.contains('Logout').should('exist').click();

        // Should be back to the sign in page
        cy.contains('Sign In').should('exist');
    });
});

//}

//    cy.get('div.MuiPaper-root:nth-child(1) > div:nth-child(1) > div:nth-child(1)').should(
//         ($div) => {
//             text = $div.text();
//         },
//     );
//     cy.get('div.MuiPaper-root:nth-child(1) > div:nth-child(2) > button:nth-child(2)')
//         .should('exist')
//         .click();
//     cy.contains(
//         'div.MuiPaper-root:nth-child(1) > div:nth-child(2) > button:nth-child(2)',
//         text,
//     ).should('not.exist');
