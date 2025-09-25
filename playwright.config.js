// @ts-check
const { defineConfig, devices, chromium } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: 10,
  timeout: 30 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  snapshotPathTemplate: './resources/screenshots/{testFilePath}/{arg}{ext}',
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: {
  //       ...devices['Galaxy S8'],
  //       // isMobile: false
  //     },
  //   },
  // ],

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  reporter: [
    ['list'], ['html']
  ],
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'on-first-retry',
    browserName: 'chromium',
    // testIdAttribute: 'data-testid',
    permissions: ['clipboard-read', 'clipboard-write']
    // permissions: ["clip-bord-copy"]
  },
  globalSetup: './global-setup'

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

