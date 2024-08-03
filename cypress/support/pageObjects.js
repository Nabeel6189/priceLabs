class LoginPage {
    visit() {
      cy.visit('/signin');
    }
  
    fillEmail(email) {
      cy.get('input[name="user[email]"]').type(email);
    }
  
    fillPassword(password) {
      cy.get('input[name="user[password]"]').type(password);
    }
  
    submit() {
      cy.get('input[type="submit"]').click();
    }
  }

  class MultipleCalendar {
    visit(options = {}){
        cy.visit('/multicalendar', options)
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('Minified React error #419')) {
              return false;
            }
            return true;
        });
        cy.get('#mc-main').should('exist');
    }

    tableHeaderListName() {
        return cy.get('[qa-id="header-listingName"]');
    }
}
  

  module.exports = {
    LoginPage,
    MultipleCalendar
  };