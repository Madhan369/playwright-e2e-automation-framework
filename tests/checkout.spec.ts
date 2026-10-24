import { test, expect } from '../fixtures/baseFixture';

test.describe('SauceDemo Checkout Flow', () => {
  test('should navigate to checkout information page and display all input fields @regression @checkout', async ({ authenticatedProductsPage, cartPage, checkoutStepOnePage, env, page }) => {
    await test.step('1. Add product to cart and open cart', async () => {
      await authenticatedProductsPage.addProductToCart(env.products.backpack);
      await expect(authenticatedProductsPage.cartBadge).toHaveText('1');
      await authenticatedProductsPage.openCart();
      await expect(page).toHaveURL(/.*cart\.html/);
      await expect(cartPage.pageTitle).toHaveText('Your Cart');
    });

    await test.step('2. Click Checkout and navigate to Step One', async () => {
      await cartPage.checkout();
      await expect(page).toHaveURL(/.*checkout-step-one\.html/);
      await expect(checkoutStepOnePage.pageTitle).toHaveText('Checkout: Your Information');
    });

    await test.step('3. Verify First Name, Last Name, and Postal Code input fields are visible', async () => {
      await expect(checkoutStepOnePage.firstNameInput).toBeVisible();
      await expect(checkoutStepOnePage.lastNameInput).toBeVisible();
      await expect(checkoutStepOnePage.postalCodeInput).toBeVisible();
    });
  });

  test('should display validation error message when required fields are empty @regression @checkout', async ({ authenticatedProductsPage, cartPage, checkoutStepOnePage, env, page }) => {
    await test.step('1. Add product to cart and proceed to checkout', async () => {
      await authenticatedProductsPage.addProductToCart(env.products.backpack);
      await authenticatedProductsPage.openCart();
      await cartPage.checkout();
      await expect(page).toHaveURL(/.*checkout-step-one\.html/);
    });

    await test.step('2. Submit empty checkout form by clicking Continue', async () => {
      await checkoutStepOnePage.clickContinue();
    });

    await test.step('3. Verify required field validation error message', async () => {
      await expect(checkoutStepOnePage.errorMessage).toBeVisible();
      await expect(checkoutStepOnePage.errorMessage).toContainText('Error: First Name is required');
    });
  });

  test('should complete end-to-end checkout flow successfully @smoke @regression @checkout', async ({ authenticatedProductsPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage, env, page }) => {
    await test.step('1. Add product to cart and navigate to checkout', async () => {
      await authenticatedProductsPage.addProductToCart(env.products.backpack);
      await expect(authenticatedProductsPage.cartBadge).toHaveText('1');
      await authenticatedProductsPage.openCart();
      await expect(page).toHaveURL(/.*cart\.html/);
      await cartPage.checkout();
      await expect(page).toHaveURL(/.*checkout-step-one\.html/);
    });

    await test.step('2. Fill customer information from .env and continue', async () => {
      await checkoutStepOnePage.fillInformation(
        env.checkout.firstName,
        env.checkout.lastName,
        env.checkout.postalCode
      );
      await checkoutStepOnePage.clickContinue();
    });

    await test.step('3. Verify order overview items and totals', async () => {
      await expect(page).toHaveURL(/.*checkout-step-two\.html/);
      await expect(checkoutStepTwoPage.pageTitle).toHaveText('Checkout: Overview');

      const backpackItem = checkoutStepTwoPage.getCartItemByName(env.products.backpack);
      await expect(backpackItem).toBeVisible();
      await expect(checkoutStepTwoPage.getItemPrice(env.products.backpack)).toHaveText('$29.99');
      await expect(checkoutStepTwoPage.totalLabel).toBeVisible();
      await expect(checkoutStepTwoPage.totalLabel).toContainText('Total: $32.39');
    });

    await test.step('4. Click Finish and verify confirmation message', async () => {
      await checkoutStepTwoPage.clickFinish();
      await expect(page).toHaveURL(/.*checkout-complete\.html/);
      await expect(checkoutCompletePage.pageTitle).toHaveText('Checkout: Complete!');
      await expect(checkoutCompletePage.completeHeader).toBeVisible();
      await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    });
  });
});
