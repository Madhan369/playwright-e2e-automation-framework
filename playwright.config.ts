import { defineConfig, devices } from '@playwright/test';
import { version } from '@playwright/test/package.json';
import os from 'node:os';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Detect friendly Operating System name (e.g. "Windows 11")
 */
function getOperatingSystem(): string {
  const platform = os.platform();
  const release = os.release();
  if (platform === 'win32') {
    const build = parseInt(release.split('.')[2] || '0', 10);
    return build >= 22000 ? 'Windows 11' : 'Windows 10';
  } else if (platform === 'darwin') {
    return 'macOS';
  } else if (platform === 'linux') {
    return 'Linux';
  }
  return `${platform} ${release}`;
}

/**
 * Retrieve installed TypeScript version
 */
function getTypescriptVersion(): string {
  try {
    return require('typescript/package.json').version;
  } catch {
    try {
      const pkg = require('./package.json');
      return pkg.devDependencies?.typescript?.replace(/[^0-9.]/g, '') || '5.7.3';
    } catch {
      return '5.7.3';
    }
  }
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'], // Real-time test progress in terminal
    ['html', { open: 'never' }],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results',
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          'OS': getOperatingSystem(),
          'Browser': 'Chromium (Desktop Chrome)',
          'Environment': process.env.ENVIRONMENT,
          'Executed By': process.env.EXECUTED_BY,
          'Automation Framework': 'Playwright',
          'Node Version': process.version,
          'TypeScript Version': getTypescriptVersion(),
          'Playwright Version': version,
          'Application URL': process.env.BASE_URL,
        },
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',

    /* Collects videos for all tests */
    video: 'retain-on-failure',

    /* Collects screenshots for all tests */
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }, */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
