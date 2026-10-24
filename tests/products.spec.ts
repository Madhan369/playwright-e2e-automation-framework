import { test, expect } from '../fixtures/baseFixture';

test.describe('SauceDemo Products Page', () => {
  test('should display product list with names, prices, images, and add to cart buttons @smoke @regression @products', async ({ authenticatedProductsPage, page }) => {
    await test.step('1. Verify inventory container and heading are displayed', async () => {
      await expect(page).toHaveURL(/.*inventory\.html/);
      await expect(authenticatedProductsPage.inventoryContainer).toBeVisible();
      await expect(authenticatedProductsPage.pageTitle).toHaveText('Products');
    });

    await test.step('2. Verify product count is greater than zero', async () => {
      const productCount = await authenticatedProductsPage.inventoryItems.count();
      expect(productCount).toBeGreaterThan(0);
      await expect(authenticatedProductsPage.productNames).toHaveCount(productCount);
      await expect(authenticatedProductsPage.productPrices).toHaveCount(productCount);
    });

    await test.step('3. Verify all product cards contain names, prices, images, and action buttons', async () => {
      const productCount = await authenticatedProductsPage.inventoryItems.count();
      for (let i = 0; i < productCount; i++) {
        await expect(authenticatedProductsPage.getProductName(i)).toBeVisible();
        await expect(authenticatedProductsPage.getProductPrice(i)).toBeVisible();

        const productImage = authenticatedProductsPage.getProductImage(i);
        await expect(productImage).toBeVisible();
        await expect(productImage).toHaveAttribute('src', /.+/);

        const addToCartButton = authenticatedProductsPage.getAddToCartButton(i);
        await expect(addToCartButton).toBeVisible();
        await expect(addToCartButton).toHaveText('Add to cart');
      }
    });
  });

  test('should sort product names in ascending alphabetical order when Name (A to Z) is selected @regression @products', async ({ authenticatedProductsPage }) => {
    await test.step('1. Select sort option Name (A to Z)', async () => {
      await authenticatedProductsPage.selectSortOption('Name (A to Z)');
      await expect(authenticatedProductsPage.activeOption).toHaveText('Name (A to Z)');
    });

    await test.step('2. Verify product names are alphabetically sorted', async () => {
      const productNames = await authenticatedProductsPage.getProductNames();
      expect(productNames.length).toBeGreaterThan(0);
      const sortedProductNames = [...productNames].sort((a, b) => a.localeCompare(b));
      expect(productNames).toEqual(sortedProductNames);
    });
  });

  test('should sort product prices in ascending numerical order when Price (low to high) is selected @regression @products', async ({ authenticatedProductsPage }) => {
    await test.step('1. Select sort option Price (low to high)', async () => {
      await authenticatedProductsPage.selectSortOption('Price (low to high)');
      await expect(authenticatedProductsPage.activeOption).toHaveText('Price (low to high)');
    });

    await test.step('2. Verify product prices are numerically sorted', async () => {
      const prices = await authenticatedProductsPage.getProductPrices();
      expect(prices.length).toBeGreaterThan(0);
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sortedPrices);
    });
  });

  test('should navigate to product details page and display details correctly @smoke @regression @products', async ({ authenticatedProductsPage, productDetailsPage, env, page }) => {
    const productName = env.products.backpack;

    await test.step(`1. Click product "${productName}" title`, async () => {
      await authenticatedProductsPage.clickProductName(productName);
      await expect(page).toHaveURL(/.*inventory-item\.html/);
    });

    await test.step('2. Verify product details (name, description, price, image)', async () => {
      await expect(productDetailsPage.productName).toBeVisible();
      await expect(productDetailsPage.productName).toHaveText(productName);
      await expect(productDetailsPage.productDescription).toBeVisible();
      await expect(productDetailsPage.productDescription).not.toBeEmpty();
      await expect(productDetailsPage.productPrice).toBeVisible();
      await expect(productDetailsPage.productPrice).toHaveText('$29.99');
      await expect(productDetailsPage.productImage).toBeVisible();
      await expect(productDetailsPage.productImage).toHaveAttribute('alt', productName);
    });

    await test.step('3. Click Back to products and verify catalog return', async () => {
      await productDetailsPage.clickBackToProducts();
      await expect(page).toHaveURL(/.*inventory\.html/);
      await expect(authenticatedProductsPage.inventoryContainer).toBeVisible();
      await expect(authenticatedProductsPage.pageTitle).toHaveText('Products');
    });
  });
});
