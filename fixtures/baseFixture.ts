import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { SidebarMenu } from '../pages/SidebarMenu';
import { env } from '../utils/environment';

/**
 * Custom Fixtures Type Definition
 * Injects pre-initialized Page Objects, environment inputs, and authenticated sessions.
 */
export type CustomFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
  sidebarMenu: SidebarMenu;
  env: typeof env;

  /**
   * Pre-authenticated fixture that navigates to SauceDemo,
   * logs in using .env credentials, and ensures the inventory page is ready.
   */
  authenticatedProductsPage: ProductsPage;
};

export const test = baseTest.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutStepOnePage: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
  },

  checkoutStepTwoPage: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page));
  },

  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },

  sidebarMenu: async ({ page }, use) => {
    await use(new SidebarMenu(page));
  },

  env: async ({}, use) => {
    await use(env);
  },

  authenticatedProductsPage: async ({ page, loginPage, productsPage }, use) => {
    await loginPage.goto();
    await loginPage.login(env.users.standard.username, env.users.standard.password);
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(productsPage.inventoryContainer).toBeVisible();
    await use(productsPage);
  },
});

export { expect };
