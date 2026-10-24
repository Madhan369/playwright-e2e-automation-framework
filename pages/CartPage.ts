import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartList: Locator;
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartList = page.locator('[data-test="cart-list"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async goto() {
    await this.page.goto('/cart.html');
  }

  getCartItemByName(productName: string): Locator {
    return this.cartItems.filter({ hasText: productName });
  }

  getItemQuantity(productName: string): Locator {
    return this.getCartItemByName(productName).locator('[data-test="item-quantity"]');
  }

  getItemPrice(productName: string): Locator {
    return this.getCartItemByName(productName).locator('[data-test="inventory-item-price"]');
  }

  getRemoveButton(productName: string): Locator {
    return this.getCartItemByName(productName).locator('button[data-test^="remove"]');
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
