import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  screenshotOnRunFailure: true,
  chromeWebSecurity: false,
  reporter: "junit",
  reporterOptions: {
    mochaFile: "tests-reports/e2e/cypress-junit-[hash].xml",
    attachments: true,
    jenkinsMode: true,
  },
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:4173",
    retries: {
      runMode: 5,
      openMode: 0,
    },
    experimentalRunAllSpecs: true,
  },
});
