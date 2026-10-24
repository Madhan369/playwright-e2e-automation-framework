import { test, expect } from '../fixtures/baseFixture';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

interface LoginRecord {
  Username: string;
  Password: string;
  Expected: string;
}

// Read test data from the external CSV file located in the test_data folder
const csvFilePath = path.resolve(__dirname, '../test_data/loginData.csv');
const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

// Parse CSV content using csv-parse/sync
const records: LoginRecord[] = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
});

test.describe('SauceDemo CSV Data-Driven Login Validation', () => {
  for (const record of records) {
    test(`Login test for "${record.Username}" - Expected: "${record.Expected}" @datadriven @regression @csv`, async ({ loginPage, productsPage, sidebarMenu, env, page }) => {
      console.log(`[START] Running test for Username: ${record.Username} | Expected: ${record.Expected}`);

      try {
        await test.step('1. Navigate to login page', async () => {
          await loginPage.goto();
        });

        await test.step(`2. Enter credentials for ${record.Username} and click login`, async () => {
          await loginPage.enterUsername(record.Username);
          await loginPage.enterPassword(record.Password);
          await loginPage.clickLoginButton();
        });

        await test.step(`3. Validate expected result: ${record.Expected}`, async () => {
          if (record.Expected === 'Products') {
            await expect(page).toHaveURL(/.*inventory\.html/);
            await expect(productsPage.inventoryContainer).toBeVisible();
            await expect(productsPage.pageTitle).toHaveText('Products');

            // Log out to reset state
            await sidebarMenu.open();
            await expect(sidebarMenu.logoutLink).toBeVisible();
            await sidebarMenu.clickLogout();
            await expect(page).toHaveURL(env.baseURL);
            await expect(loginPage.loginButton).toBeVisible();
          } else if (record.Expected === 'Locked out') {
            await expect(page).toHaveURL(env.baseURL);
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
          } else if (record.Expected === 'Invalid credentials') {
            await expect(page).toHaveURL(env.baseURL);
            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
          } else {
            throw new Error(`Unrecognized expected value in dataset: ${record.Expected}`);
          }
        });

        console.log(`[PASS] Test passed for Username: ${record.Username} | Expected: ${record.Expected}`);
      } catch (error) {
        console.error(`[FAIL] Test failed for Username: ${record.Username} | Expected: ${record.Expected}`);
        throw error;
      }
    });
  }
});
