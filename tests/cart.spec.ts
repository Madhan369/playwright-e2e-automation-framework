import { test, expect } from '../fixtures/baseFixture';

test.describe('SauceDemo Shopping Cart', () => {
  test('should add product to cart, change button to Remove, and update cart badge to 1 @smoke @regression @cart', async ({ authenticatedProductsPage, env }) => {
    const productName = env.products.backpack;
    const productButton = authenticatedProductsPage.getProductButton(productName);

    await test.step('1. Verify initial button state is "Add to cart"', async () => {
      await expect(productButton).toBeVisible();
      await expect(productButton).toHaveText('Add to cart');
    });

    await test.step('2. Click Add to cart and verify button toggles to Remove', async () => {
      await productButton.click();
      await expect(productButton).toHaveText('Remove');
    });

    await test.step('3. Verify shopping cart badge shows 1', async () => {
      await expect(authenticatedProductsPage.cartBadge).toBeVisible();
      await expect(authenticatedProductsPage.cartBadge).toHaveText('1');
    });
  });

  test('should remove product from cart, hide cart badge, and allow re-adding product @regression @cart', async ({ authenticatedProductsPage, env }) => {
    const productName = env.products.backpack;
    const productButton = authenticatedProductsPage.getProductButton(productName);

    await test.step('1. Add product to cart', async () => {
      await productButton.click();
      await expect(productButton).toHaveText('Remove');
      await expect(authenticatedProductsPage.cartBadge).toHaveText('1');
    });

    await test.step('2. Click Remove button and verify badge is hidden', async () => {
      await productButton.click();
      await expect(productButton).toHaveText('Add to cart');
      await expect(authenticatedProductsPage.cartBadge).not.toBeVisible();
    });

    await test.step('3. Re-add product and verify cart badge re-appears with 1', async () => {
      await productButton.click();
      await expect(productButton).toHaveText('Remove');
      await expect(authenticatedProductsPage.cartBadge).toBeVisible();
      await expect(authenticatedProductsPage.cartBadge).toHaveText('1');
    });
  });

  test('should display all selected products with correct name, price, and quantity in cart @smoke @regression @cart', async ({ authenticatedProductsPage, cartPage, env, page }) => {
    await test.step('1. Add multiple products from .env to cart', async () => {
      await authenticatedProductsPage.addProductToCart(env.products.backpack);
      await authenticatedProductsPage.addProductToCart(env.products.bikeLight);
      await expect(authenticatedProductsPage.cartBadge).toHaveText('2');
    });

    await test.step('2. Open cart and verify cart page is displayed', async () => {
      await authenticatedProductsPage.openCart();
      await expect(page).toHaveURL(/.*cart\.html/);
      await expect(cartPage.pageTitle).toHaveText('Your Cart');
      await expect(cartPage.cartItems).toHaveCount(2);
    });

    await test.step('3. Verify details for first product (Backpack)', async () => {
      const backpackItem = cartPage.getCartItemByName(env.products.backpack);
      await expect(backpackItem).toBeVisible();
      await expect(cartPage.getItemQuantity(env.products.backpack)).toHaveText('1');
      await expect(cartPage.getItemPrice(env.products.backpack)).toHaveText('$29.99');
    });

    await test.step('4. Verify details for second product (Bike Light)', async () => {
      const bikeLightItem = cartPage.getCartItemByName(env.products.bikeLight);
      await expect(bikeLightItem).toBeVisible();
      await expect(cartPage.getItemQuantity(env.products.bikeLight)).toHaveText('1');
      await expect(cartPage.getItemPrice(env.products.bikeLight)).toHaveText('$9.99');
    });
  });

  test('should return to Products page when Continue Shopping is clicked and retain items in cart @regression @cart', async ({ authenticatedProductsPage, cartPage, env, page }) => {
    const productName = env.products.backpack;

    await test.step('1. Add product to cart and open cart', async () => {
      await authenticatedProductsPage.addProductToCart(productName);
      await expect(authenticatedProductsPage.cartBadge).toHaveText('1');
      await authenticatedProductsPage.openCart();
      await expect(page).toHaveURL(/.*cart\.html/);
      await expect(cartPage.pageTitle).toHaveText('Your Cart');
    });

    await test.step('2. Click Continue Shopping and verify return to Products page', async () => {
      await cartPage.continueShopping();
      await expect(page).toHaveURL(/.*inventory\.html/);
      await expect(authenticatedProductsPage.inventoryContainer).toBeVisible();
      await expect(authenticatedProductsPage.pageTitle).toHaveText('Products');
    });

    await test.step('3. Verify previously added product is retained in cart', async () => {
      const productButton = authenticatedProductsPage.getProductButton(productName);
      await expect(productButton).toHaveText('Remove');
      await expect(authenticatedProductsPage.cartBadge).toBeVisible();
      await expect(authenticatedProductsPage.cartBadge).toHaveText('1');
    });
  });
});
