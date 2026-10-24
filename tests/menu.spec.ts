import { test, expect } from '../fixtures/baseFixture';

test.describe('SauceDemo Sidebar Navigation Menu', () => {
  test('should open navigation menu, display all options, and close properly @regression @menu', async ({ authenticatedProductsPage, sidebarMenu }) => {
    await test.step('1. Open burger menu', async () => {
      await sidebarMenu.open();
    });

    await test.step('2. Verify all menu navigation links are visible with correct text', async () => {
      await expect(sidebarMenu.allItemsLink).toBeVisible();
      await expect(sidebarMenu.allItemsLink).toHaveText('All Items');

      await expect(sidebarMenu.aboutLink).toBeVisible();
      await expect(sidebarMenu.aboutLink).toHaveText('About');

      await expect(sidebarMenu.logoutLink).toBeVisible();
      await expect(sidebarMenu.logoutLink).toHaveText('Logout');

      await expect(sidebarMenu.resetAppStateLink).toBeVisible();
      await expect(sidebarMenu.resetAppStateLink).toHaveText('Reset App State');
    });

    await test.step('3. Close menu and verify links are hidden', async () => {
      await sidebarMenu.close();
      await expect(sidebarMenu.allItemsLink).not.toBeVisible();
      await expect(sidebarMenu.aboutLink).not.toBeVisible();
      await expect(sidebarMenu.logoutLink).not.toBeVisible();
      await expect(sidebarMenu.resetAppStateLink).not.toBeVisible();
    });
  });

  test('should log out successfully and redirect to login page @smoke @regression @menu', async ({ authenticatedProductsPage, sidebarMenu, loginPage, env, page }) => {
    await test.step('1. Open navigation menu', async () => {
      await sidebarMenu.open();
      await expect(sidebarMenu.logoutLink).toBeVisible();
    });

    await test.step('2. Click Logout', async () => {
      await sidebarMenu.clickLogout();
    });

    await test.step('3. Verify redirection back to login page with input fields visible', async () => {
      await expect(page).toHaveURL(env.baseURL);
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    });
  });
});
