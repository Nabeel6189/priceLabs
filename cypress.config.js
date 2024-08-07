const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    testIsolation: false,
    baseUrl:"https://app.pricelabs.co",
    reporter: "cypress-mochawesome-reporter",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      screenshotOnRunFailure:true 
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  {
    reporter: "mochawesome",
    reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: false,
    json: true,
    }
},
});
