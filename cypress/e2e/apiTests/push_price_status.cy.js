const responseData = require('../../fixtures/responseData.json')
const payloadData = require('../../fixtures/payloadData.json')

describe.only('Validate Sync toggle api', () => {

    before(() => {
        cy.apiLogin('qa.pricelabs@gmail.com', 'qg33N$yxJP');
    });

    it('Validate enabling the Sync Prices toggle', () => {
        let payload = payloadData.push_price_status
        cy.makeRequest('POST', 'push_price_status', {queryParams: '1722757091324', body: payload}).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).property('message').eq('SUCCESS');
            expect(response.body).property('response').deep.eq(responseData.push_price_status.enableSyncPriceToggleResponseMessage.response);
        });
    });

    it('Validate disabling the Sync Prices toggle', () => {
        let newPayload = {...payloadData.push_price_status, push_status: false}
        cy.makeRequest('POST', 'push_price_status', {queryParams: '1722757091324', body: newPayload}).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).property('message').eq('SUCCESS');
            expect(response.body).property('response').deep.eq(responseData.push_price_status.disableSyncPriceToggleResponseMessage.response);
        });
    });

    it('Validate Sync Prices toggle when the listings_id is incorrect', () => {
        let newPayload = {...payloadData.push_price_status, "listing_id": 'SUNSETPROPS___533'}
        cy.makeRequest('POST', 'push_price_status', {queryParams: '1722757091324', body: newPayload}).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).property('message').eq('SUCCESS');
            expect(response.body).property('response').deep.eq(responseData.push_price_status.noListingError);
        });
    });

    it('Validate Sync Prices toggle when the pms_name is incorrect', () => {
        let newPayload = {...payloadData.push_price_status, pms_name: 'prm'}
        cy.makeRequest('POST', 'push_price_status', {queryParams: '1722757091324', body: newPayload}).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).property('message').eq('SUCCESS');
            expect(response.body).property('response').deep.eq(responseData.push_price_status.noListingError);
        });
    });

    it('Validate Sync Prices toggle when the listing_id is not sent in the payload', () => {
        let newPayload = {...payloadData.push_price_status}
        delete newPayload.listing_id
        cy.makeRequest('POST', 'push_price_status', {queryParams: '1722757091324', body: newPayload}).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).property('message').eq('SUCCESS');
            expect(response.body).property('response').deep.eq(responseData.push_price_status.noListingError);
        });
    });

    it('Validate Sync Prices toggle when the pms_name is not sent in the payload', () => {
        let newPayload = {...payloadData.push_price_status}
        delete newPayload.pms_name
        cy.makeRequest('POST', 'push_price_status', {queryParams: '1722757091324', body: newPayload}).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).property('message').eq('SUCCESS');
            expect(response.body).property('response').deep.eq(responseData.push_price_status.noListingError);
        });
    });

    //The below case is supposed to fail or give an error message as there is no queryParams passed in the api
    it('Validate API response for missing query parameters', () => {
        let noParamResponse = {
            ...responseData.push_price_status.enableSyncPriceToggleResponseMessage.response, listing_name:null
        }
        cy.makeRequest('POST', 'push_price_status', {body: payloadData.push_price_status}).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).property('message').eq('SUCCESS');
            expect(response.body).property('response').deep.eq(noParamResponse);
        });
    });
});