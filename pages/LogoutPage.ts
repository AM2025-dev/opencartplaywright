import { Page, Locator } from "@playwright/test";
import { HomePage } from "./HomePage"; 

export class LogoutPage {
  private readonly page: Page;
  private readonly btnContinue: Locator;

  // Constructor: initializes the page and locators
  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.btnContinue = page.locator('.btn.btn-primary'); // Button with class 'btn btn-primary'
  }

  /**
   * Clicks the Continue button after logout.
   * @returns {Promise<HomePage>} - Returns an instance of HomePage after clicking continue.
   */
  async clickContinue(): Promise<HomePage>  {
    await this.btnContinue.click();
    return new HomePage(this.page);
  }

  /**
   * Verifies if the Continue button is visible on the Logout page
   * @returns {Promise<boolean>} - Returns true if the Continue button is visible, otherwise false.
   */
  async isContinueButtonVisible(): Promise<boolean> {
    return await this.btnContinue.isVisible();
  }
}