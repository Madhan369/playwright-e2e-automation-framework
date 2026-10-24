import { test, expect } from '../fixtures/baseFixture';

test.describe('SauceDemo Authentication', () => {
  test('should login successfully with valid credentials and navigate to Products page @smoke @regression @login', async ({ loginPage, productsPage, env, page }) => {
    await test.step('1. Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('2. Enter valid credentials and click login', async () => {
      await loginPage.enterUsername(env.users.standard.username);
      await loginPage.enterPassword(env.users.standard.password);
      await loginPage.clickLoginButton();
    });

    await test.step('3. Verify successful navigation to Products page', async () => {
      await expect(page).toHaveURL(/.*inventory\.html/);
      await expect(productsPage.inventoryContainer).toBeVisible();
      await expect(productsPage.pageTitle).toBeVisible();
      await expect(productsPage.pageTitle).toHaveText('Products');
    });
  });

  test('should display error message and remain on login page with invalid credentials @regression @login', async ({ loginPage, env, page }) => {
    await test.step('1. Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('2. Enter invalid credentials and click login', async () => {
      await loginPage.enterUsername(env.users.invalid.username);
      await loginPage.enterPassword(env.users.invalid.password);
      await loginPage.clickLoginButton();
    });

    await test.step('3. Verify error message and page state', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
      await expect(page).toHaveURL(env.baseURL);
      await expect(loginPage.loginButton).toBeVisible();
    });
  });

  test('should display validation error message when credentials are empty @regression @login', async ({ loginPage }) => {
    await test.step('1. Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('2. Click login with empty fields', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('3. Verify validation error message', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText('Epic sadface: Username is required');
    });
  });

  test('should display locked out error message and prevent navigation to Products page @regression @login', async ({ loginPage, productsPage, env, page }) => {
    await test.step('1. Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('2. Enter locked-out credentials and click login', async () => {
      await loginPage.enterUsername(env.users.lockedOut.username);
      await loginPage.enterPassword(env.users.lockedOut.password);
      await loginPage.clickLoginButton();
    });

    await test.step('3. Verify locked out error message and catalog hidden', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
      await expect(page).toHaveURL(env.baseURL);
      await expect(productsPage.inventoryContainer).not.toBeVisible();
      await expect(productsPage.pageTitle).not.toBeVisible();
    });
  });
});
