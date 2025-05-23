describe('Cypress Test for Tricentis.com', () => {
    before(() => {
        cy.on('uncaught:exception', (error) => {
            return false;
        });
    });

    const searchText = "Computer";

    it('should browse and search for a product', () => {
        // Visiting the website and validating the logo
        cy.visit('https://demowebshop.tricentis.com/');
        cy.get('.header-logo').should('exist');
        cy.get('img[src="/Themes/DefaultClean/Content/images/logo.png"]').should('be.visible');
        cy.get('.header-menu').should('be.visible');

        // Search
        cy.get('.search-box').should('be.visible').within(() => {
            cy.get('#small-searchterms').should('exist')
            .should('have.value', 'Search store')
            .type(searchText);
        });
        cy.get('.ui-autocomplete.ui-front.ui-menu.ui-widget.ui-widget-content.ui-corner-all').should('be.visible').within(() => {
            cy.get('.ui-menu-item').contains('Simple Computer').should('be.visible');
        });

        // Getting the search box above and traversing the search button within to 
        // avoid the button getting conflicted with the search input box if that also appears in the page. 
        // As both of them have the same classes
        cy.get('.search-box').within(() => {
            cy.get('[type="submit"]').click();
        });

        // Asserting the search Result
        cy.get('.search-input').should('be.visible').within(() => {
            cy.get('.search-text').should('have.value', searchText);
        })

        cy.get('.search-results').should('be.visible');
    });

    it('Selecting the search item and additing it to the cart', () => {
        cy.viewport(1500, 1000);
            cy.get('[title="Show details for Simple Computer"]').click({multiple:true, force:true});
            cy.get('.overview').should('exist').within(() => {
                cy.get('[value="Add to cart"]').click();
            });
            cy.get('.bar-notification.error').should('be.visible').should('contain.text', 'Please select Processor');
            cy.get('label').contains('Slow').click();
            cy.get('.overview').should('exist').within(() => {
                cy.get('[value="Add to cart"]').click();
            });
            cy.get('.bar-notification.success').should('be.visible').within(() => {
                cy.get('.content').should('contain.text', "The product has been added to your ");
                cy.get('a[href="/cart"]').click();
            });
            cy.get('.product-picture').should('be.visible');
            cy.get('.product-name').should('contain.text', 'Simple Computer');
        });

});