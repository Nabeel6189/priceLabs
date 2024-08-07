const payloadData = require('../../fixtures/payloadData.json')

describe('API Test for Add Custom Pricing', () => {
  
    before(() => {
        cy.apiLogin('qa.pricelabs@gmail.com', 'qg33N$yxJP');
    });

    it('should successfully add custom pricing and return the expected response', () => {
  
      cy.makeRequest('POST', 'add_custom_pricing', {body: payloadData.add_custom_pricing}).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'SUCCESS');
        expect(response.body.response).to.have.property('success', 'I prezzi personalizzati sono stati aggiornati.');
      });
    });
  
    it('should return an error when required fields are missing', () => {
      const payload = {
        "price": "22",
        "reason": "test",
        "basePrice": "60"
      };
  
      cy.makeRequest('POST', 'add_custom_pricing', {body: payload}).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'SUCCESS');
        expect(response.body.response).to.have.property('message', 'Alloggio non trovato');
      });
    });
  
    it('should return an error when invalid values are provided', () => {
      const payload = { ...payloadData.add_custom_pricing,
        "price": "-22", 
        "minPrice": "-43", 
        "maxPrice": "-66", 
        "startDate": "Invalid Date", 
        "endDate": "Invalid Date"
      };
  
      cy.makeRequest('POST', 'add_custom_pricing', {body: payload}).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'SUCCESS');
        expect(response.body.response).to.have.property('message', 'Il prezzo massimo fisso deve essere maggiore di 0.');
      });
    });
  
    it('should return an error when payload is empty', () => {
      const payload = {};
  
      cy.makeRequest('POST', 'add_custom_pricing', {body: payload}).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'SUCCESS');
        expect(response.body.response).to.have.property('message', 'Alloggio non trovato');
      });
    });
  });