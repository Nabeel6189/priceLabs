const { MultipleCalendar } = require('../../../support/pageObjects');
const payloadData = require('../../../fixtures/payloadData.json');
const responseData = require('../../../fixtures/responseData.json');

describe('Validate Multiple Calendar Page Sync Price toggle', () => {
    const multipleCalendar = new MultipleCalendar(); 

    function checkToggleApi(push_status, listing_id, pms_name, listing_name){
        let payload = {...payloadData.push_price_status, 
            "push_status":push_status,
            "listing_id":listing_id,
            "pms_name":pms_name
        };

        let responseToggleOn = {
            ...responseData.push_price_status.enableSyncPriceToggleResponseMessage.response, 
            "listing_name":listing_name,
            "sync": push_status
        }

        let responseToggleOff = {
            ...responseData.push_price_status.disableSyncPriceToggleResponseMessage.response,
            "listing_name":listing_name,
            "sync": push_status
        }

        cy.intercept({
            method: 'POST',
            url: '/api/push_price_status*'
          }).as('pushPriceStatus');
        cy.wait('@pushPriceStatus', {timeout:10000}).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
    
            expect(interception.request.body).to.deep.equal(payload);
   
            expect(interception.response.body).to.have.property('message', 'SUCCESS');
            if(push_status === true){
                cy.log(responseToggleOn)
                expect(interception.response.body.response).to.deep.equal(responseToggleOn);
            } else {
                cy.log(responseToggleOff)
                expect(interception.response.body.response).to.deep.equal(responseToggleOff);
            }
          });
    }

    function ValidatePopupAndToggle(popupMessage){
        checkToggleApi(false, 'SUNSETPROPS_OLSE___323', 'vrm', '1101B WM - Sunset Clipper W');
        multipleCalendar.popup().should('exist').should('contain', popupMessage)
        multipleCalendar.popupClose();
        
    }

    beforeEach(() => {
        cy.login('qa.pricelabs@gmail.com', 'qg33N$yxJP');
        multipleCalendar.visit({timeout: 10000});
        multipleCalendar.tableHeaderListName().should('contain', 'Listing Name');
    });

    it('Validate Enabling Multiple Calendar Sync Pricing toggle', () => {
        cy.viewport(1500, 1500)
        multipleCalendar.syncPriceToggle('SUNSETPROPS_OLSE___323').then(($toggle) => {
            const isChecked = $toggle.attr('data-checked') !== undefined;
            if (isChecked) {
                cy.wrap($toggle).click();
                multipleCalendar.popupClose();
            }
            cy.wrap($toggle).click();
            ValidatePopupAndToggle('Your prices are scheduled to be updated');
            cy.wrap($toggle).should('have.attr', 'data-checked');
        })
    })

    it('Validate Disabling Multiple Calendar Sync Pricing toggle', () => {
        cy.viewport(1500, 1500)
        multipleCalendar.syncPriceToggle('SUNSETPROPS_OLSE___323').then(($toggle) => {
            const isNotChecked = $toggle.attr('data-checked') === undefined;
            if (isNotChecked) {
                cy.wrap($toggle).click();
                multipleCalendar.popupClose();
            }
            cy.wrap($toggle).click();
            ValidatePopupAndToggle('We have stopped updating your prices.')
            cy.wrap($toggle).should('not.have.attr', 'data-checked');
        })
    })
})