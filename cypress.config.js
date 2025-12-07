const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    openMode: 0, 
    runMode: 2,
  },
  e2e: {
    screenshotOnRunFailure: false,
    reporter: 'cypress-mochawesome-reporter',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
