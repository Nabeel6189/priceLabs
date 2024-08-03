const { MultipleCalendar } = require('../../support/pageObjects');

describe('Validate Multiple Calendar Page in Pricelabs', () => {
    const multipleCalendar = new MultipleCalendar();

    beforeEach(() => {
        cy.login('qa.pricelabs@gmail.com', 'qg33N$yxJP');
        multipleCalendar.visit({timeout: 10000});
    });

    it('Validate Multiple Calendar page table', () => {
        cy.viewport(1500, 700)
        multipleCalendar.tableHeaderListName().should('contain', 'Listing Name');
    })
})