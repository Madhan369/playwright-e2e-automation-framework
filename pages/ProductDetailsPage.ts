import { Locator, Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly backToProductsButton: Locator;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly productImage: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.productImage = page.locator('.inventory_details_img');
    this.addToCartButton = page.locator('.btn_inventory');
  }

  async clickBackToProducts() {
    await this.backToProductsButton.click();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
