import { Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly productImages: Locator;
  readonly addToCartButtons: Locator;
  readonly sortDropdown: Locator;
  readonly activeOption: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.productImages = page.locator('[data-test="inventory-item"] img.inventory_item_img');
    this.addToCartButtons = page.locator('.btn_inventory');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.activeOption = page.locator('[data-test="active-option"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  getProductItem(index: number): Locator {
    return this.inventoryItems.nth(index);
  }

  getProductName(index: number): Locator {
    return this.productNames.nth(index);
  }

  getProductPrice(index: number): Locator {
    return this.productPrices.nth(index);
  }

  getProductImage(index: number): Locator {
    return this.productImages.nth(index);
  }

  getAddToCartButton(index: number): Locator {
    return this.addToCartButtons.nth(index);
  }

  getProductItemByName(productName: string): Locator {
    return this.inventoryItems.filter({ hasText: productName });
  }

  getProductButton(productName: string): Locator {
    return this.getProductItemByName(productName).locator('.btn_inventory');
  }

  async addProductToCart(productName: string) {
    await this.getProductButton(productName).click();
  }

  async clickProductName(productName: string) {
    await this.getProductItemByName(productName).locator('[data-test="inventory-item-name"]').click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async selectSortOption(option: string) {
    await this.sortDropdown.selectOption({ label: option });
  }

  async getProductNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.productPrices.allTextContents();
    return priceTexts.map(text => parseFloat(text.replace('$', '')));
  }
}
