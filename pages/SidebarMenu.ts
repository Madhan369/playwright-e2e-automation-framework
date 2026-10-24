import { Locator, Page } from '@playwright/test';

export class SidebarMenu {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly closeButton: Locator;
  readonly menuContainer: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.closeButton = page.locator('#react-burger-cross-btn');
    this.menuContainer = page.locator('.bm-menu-wrap');
    this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');
  }

  async open() {
    await this.menuButton.click();
  }

  async close() {
    await this.closeButton.click();
  }

  async clickAllItems() {
    await this.allItemsLink.click();
  }

  async clickAbout() {
    await this.aboutLink.click();
  }

  async clickLogout() {
    await this.logoutLink.click();
  }

  async clickResetAppState() {
    await this.resetAppStateLink.click();
  }
}
