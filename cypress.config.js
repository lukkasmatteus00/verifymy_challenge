const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin
      const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
      await require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin(on, config)

      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));
      return config

    },
    specPattern: [
      "cypress/e2e/API/**/*.cy.{js,jsx,ts,tsx}",
      "cypress/e2e/UI/**/*.feature",
    ],
    defaultCommandTimeout: 40 * 1000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    reporter: 'junit',
    reporterOptions: {
      mochaFile: "cypress/reports/junit.[hash].xml",
      charts: true,
      configFile: "reporterOpts.json",
      reportDir: "cypress/reports",
      toConsole: true
    },
    env: {
      bugBank: 'https://bugbank.netlify.app/',
      serverest: 'https://serverest.dev'
    },
    retries: 0,
    pageLoadTimeout: 40 * 1000,
    screenshotOnRunFailure: true,
    scrollBehavior: 'nearest',
    video: true,
  },
});