const { defineConfig } = require("cypress");

module.exports = defineConfig({
  blockHosts: ["*googletagmanager.com"],
  chromeWebSecurity: false,

  e2e: {
    baseUrl: "http://localhost:8080",
    supportFile: false,
    // tests in a spec continue from the previous test's page
    testIsolation: false
  },
});
