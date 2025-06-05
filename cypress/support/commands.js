// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const { LoginPage } = require('../support/pageObjects');
import '@4tw/cypress-drag-drop';

const loginPage = new LoginPage()

Cypress.Commands.add('login', (email, password) => {
    cy.session([email, password], () => {
        loginPage.visit();
        loginPage.fillEmail(email);
        loginPage.fillPassword(password);
        loginPage.submit();
    });
});

Cypress.Commands.add('apiLogin', (email, password) => {
    cy.session([email, password], () => {
        cy.request({
            method: 'POST',
            url: 'https://pricelabs.co/signin',
            form: true,
            body:{
                "user[email]": email,
                "user[password]": password
            },
        });
    });
});

Cypress.Commands.add('makeRequest', (method, endpointKey, options ={}) => {
        cy.fixture('endpoints').then((endpoints) => {
            let endpoint = endpoints[endpointKey];
            
            let queryString = '';

            if (options.queryParams) {
                queryString = options.queryParams.toString();
            }
            const fullUrl = queryString ? `${endpoint}?${queryString}` : endpoint;

            cy.request({
                method: method,
                url: fullUrl,
                body: options.body ? options.body : undefined
            });
    });

    Cypress.Commands.add('iframeBody', () => {    
        return cy.get('iframe[data-cy="test-iframe"]').should('exist').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap);
    })
});