import { Page, expect, Locator} from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
    // Define locators for the login page elements
  private readonly txtEmailAddress: Locator;
  private readonly txtPassword: Locator;
  private readonly btnLogin: Locator;
  private readonly txtErrorMessage: Locator;

    // Constructor:initializes the page and locators
    constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.txtEmailAddress = page.locator('#input-email');
    this.txtPassword = page.locator('#input-password');
    this.btnLogin = page.locator('input[value="Login"]');
    this.txtErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
  }

  /**
   * Sets the email address in the email input field.
   * @param email - The email address to set.
   */
    async setEmail(email: string) {
        await this.txtEmailAddress.fill(email);
    }

    /**
     * Sets the password in the password input field.
     * @param pwd - The password to set.
     */
    async setPassword(pwd: string) {
        await this.txtPassword.fill(pwd);
    }

    /**
     * Clicks the login button.
     */
    async clickLogin() {
        await this.btnLogin.click();

    }

    /**
     * Perfoms the login action with the provided email and password.
     * @param email - The email address to use for login.
     * @param password - The password to use for login.
     */
  async login(email: string, password: string) {
    await this.setEmail(email);
    await this.setPassword(password);
    await this.clickLogin();
  }

  async getLoginErrorMessage(): Promise<string | null> {
    // Wait for the error message to be visible and return its text
    return this.txtErrorMessage.textContent();
  }
}