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

    pricingSelection(listingName, qaId, index) {
      cy.contains('tr', listingName).within(() => {
        cy.get(`[class*="pricing-cell css-"] ${qaId}`).eq(index).click();
      })
    }

    syncPriceToggle(listingNameforToggle){
      return cy.get(`label[qa-id="mc-sync-toggle-${listingNameforToggle}"]`);
    }

    popup(){
      return cy.get('[role="alert"]');
    }

    popupClose(){
      this.popup().within(() => {
        cy.get('[aria-label="Close"]').click();
      }) 
    }
}
  

  module.exports = {
    LoginPage,
    MultipleCalendar
  };