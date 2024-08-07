const { MultipleCalendar } = require('../../../support/pageObjects');

describe('Validate Multiple Calendar Page Date-Specific Override', () => {
    const multipleCalendar = new MultipleCalendar();

    beforeEach(() => {
        cy.login('qa.pricelabs@gmail.com', 'qg33N$yxJP');
        multipleCalendar.visit({timeout: 10000});
    });

    it('Validate Multiple Calendar Price Selection and DSO page', () => {
        cy.viewport(1500, 1500)
        multipleCalendar.tableHeaderListName().should('contain', 'Listing Name');
        multipleCalendar.pricingSelection('[NB76] - Apartamento lindo', '.css-0', 0);
    })
})