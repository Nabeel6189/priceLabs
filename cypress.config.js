const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    testIsolation: false,
    baseUrl:"https://app.pricelabs.co",
    reporter: "cypress-mochawesome-reporter",
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      on('after:run', async () => {
        try {
          const merge = require('mochawesome-merge');
          const generate = require('mochawesome-report-generator');

          const reportDir = 'cypress/reports';
          const jsonReport = await merge({
            files: [`${reportDir}/*.json`]
          });
          await generate.create(jsonReport, {
            reportDir: reportDir,
            reportFilename: 'report.html'
          });
        } catch (error) {
          console.error('Error generating report:', error);
        }
      });
    },
    reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: true,
    json: true,
  },
},
});
