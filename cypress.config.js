const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    testIsolation: false,
    baseUrl:"https://app.pricelabs.co",
    setupNodeEvents(on, config) {
      // implement node event listeners here 
    },
  },
});
