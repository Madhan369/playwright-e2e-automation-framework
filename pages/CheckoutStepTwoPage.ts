import { Locator, Page } from '@playwright/test';

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  async goto() {
    await this.page.goto('/checkout-step-two.html');
  }

  getCartItemByName(productName: string): Locator {
    return this.cartItems.filter({ hasText: productName });
  }

  getItemPrice(productName: string): Locator {
    return this.getCartItemByName(productName).locator('[data-test="inventory-item-price"]');
  }

  async clickFinish() {
    await this.finishButton.click();
  }
}
