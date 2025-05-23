const { MultipleCalendar } = require('../../../support/pageObjects');

describe('Validate Multiple Calendar Page Date-Specific Override', () => {
    const multipleCalendar = new MultipleCalendar();

    beforeEach(() => {
        cy.login('qa.pricelabs@gmail.com', 'qg33N$yxJP');
    });

    it('Validate Multiple Calendar Price Selection and DSO page', () => {
        cy.viewport(1080, 720)
        multipleCalendar.tableHeaderListName().should('contain', 'Listing Name');
        multipleCalendar.pricingSelection('[NB76] - Apartamento lindo');
    })
})