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
            body: { 
                'authenticity_token': 'Q1AWUYPX84wVpUYmXdlc5k4C3qrdMoJ7wW/M25VAkuS8Eawtv50IZ5LcoiCziTJWEPhkFGvULb0e8GJ4V094Pg==', 
                'user[email]': email,
                'user[password]': password,
                'user[remember_me]': 0,
                'commit': 'Sign in'
            },
        }).then(({ body }) => {
                window.localStorage.setItem('authToken', body);
            });
    });
});

Cypress.Commands.add('makeRequest', (method, endpointKey, options = {}) => {
        cy.fixture('endpoints').then((endpoints) => {
            let endpoint = endpoints[endpointKey];
            
            const { queryParams, headers, body } = options;
            let queryString = '';

            if (queryParams) {
                queryString = new URLSearchParams(queryParams).toString();
            }
            const fullUrl = queryString ? `${endpoint}?${queryString}` : endpoint;

            cy.getCookies().then((cookies) => {
                const cookieHeaders = cookies.reduce((acc, cookie) => {
                    acc[cookie.name] = cookie.value;
                    return acc;
                }, {});

            const requestOptions = {
                method: method,
                url: fullUrl,
                headers: {...cookieHeaders},
                body: options.body || undefined
            };

            cy.request(requestOptions);
        });
    });
});