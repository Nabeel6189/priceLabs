describe("Form Test First Page", () => {

    before(()=>{
        cy.visit("https://cypress-interview-mastermind.lovable.app/forms");
    }) 

    it("Validate All Mandatory fields without text and selection", () => {
        cy.get('[data-cy="submit-form"]').click();
        cy.get('[data-cy="first-name-error"]').should('exist').should('contain.text', "First name is required");
        cy.get('[data-cy="last-name-error"]').should('exist').should('contain.text', "Last name is required");
        cy.get('[data-cy="email-error"]').should('exist').should('contain.text', "Email is required");
        cy.get('[data-cy="experience-error"]').should('exist').should('contain.text', "Experience level is required");
    })

    it("Validate Name Fields with a valid characters", () => {
        cy.get('[data-cy="first-name"]').type("Nabeel");
        cy.get('[data-cy="last-name"]').type("N");
        cy.get('[data-cy="email"]').type("nabeel13b@gmail.com");
        cy.get('button[role="combobox"]').click();
        cy.get('[role="presentation"]').should('exist');
        cy.get('[data-cy="exp-2-3"]').click();
        cy.get('button[role="combobox"]').should('be.visible').within(() => {
            cy.get('span').should('contain.text', "2-3 years");
        });
        cy.get('[data-cy="skill-intermediate"]').click();
        cy.get('[data-cy="framework-jest"]').invoke('attr', "data-state").should('equal', "unchecked");
        cy.get('[data-cy="framework-jest"]').click().invoke('attr', "data-state").should('equal', "checked");
        cy.get('[data-cy="submit-form"]').click();
        cy.get('li[role="status"]').should('contain', "Form submitted successfully!");
    })

    it('Validate iframe form', () => {
        cy.visit('https://cypress-interview-mastermind.lovable.app/iframe-test.html')
        cy.get('[data-cy="name"]').type("Nabeel");
        cy.get('[data-cy="email"]').type("nabeel13b@gmail.com");
        cy.get('[data-cy="subject"]').select('general');
        cy.get('[data-cy="submit"]').click();
        cy.get('#result').should('be.visible').should('contain.text', "Thank you! Your message has been sent successfully.")
    });

     it('Validate Drag and Drop', () => {
        cy.visit("https://cypress-interview-mastermind.lovable.app/interactions");
        cy.get('[data-cy="draggable-item-1"]').drag('[data-cy="drop-zone"]');
        cy.get('[data-cy="drop-zone"]').within(() => {
            cy.get('[data-cy="dropped-item-1"]').should('exist');
        });
    });

    it('Validate New Tab open', () => {
        cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
        });

        cy.get('[data-cy="open-cypress-tab"]').click();
        cy.get('@windowOpen').should('be.calledWithMatch', 'https://www.cypress.io');
    });
});