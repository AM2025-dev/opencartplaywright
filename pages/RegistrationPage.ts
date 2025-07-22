import { Page, expect, Locator} from '@playwright/test';

export class RegistrationPage {
  private readonly page: Page;
  
  // Locators using CSS selectors
  private readonly txtFirstName: Locator;
  private readonly txtLastName: Locator;
  private readonly txtEmail: Locator;
  private readonly txtTelephone: Locator;
  private readonly txtPassword: Locator;
  private readonly txtConfirmPassword: Locator;
  private readonly chkPrivacyPolicy: Locator;
  private readonly btnContinue: Locator;
  private readonly msgConfirmation: Locator;

  // Constructor: initializes the page and locators
  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.txtFirstName = page.locator('#input-firstname');
    this.txtLastName = page.locator('#input-lastname');
    this.txtEmail = page.locator('#input-email');
    this.txtTelephone = page.locator('#input-telephone');
    this.txtPassword = page.locator('#input-password');
    this.txtConfirmPassword = page.locator('#input-confirm');
    this.chkPrivacyPolicy = page.locator('input[name="agree"]');
    this.btnContinue = page.locator('input[value="Continue"]');
    this.msgConfirmation = page.locator('h1:has-text("Your Account Has Been Created!")');
  }

  /**
   * Sets the first name in the registration form.
   * @param fname - First name to enter
   */
  async setFirstName(fname: string): Promise<void> {
    await this.txtFirstName.fill(fname);
  }

  /**
   * Sets the last name in the registration form.
   * @param lname - Last name to enter
   */
  async setLastName(lname: string): Promise<void> {
    await this.txtLastName.fill(lname);
  }

  /**
   * Sets the email in the registration form.
   * @param email - Email to enter
   */
  async setEmail(email: string): Promise<void> {
    await this.txtEmail.fill(email);
  }

  /**
   * Sets the telephone number in the registration form.
   * @param telephone - Telephone number to enter
   */
  async setTelephone(tel: string): Promise<void> {
    await this.txtTelephone.fill(tel);
  }

  /**
   * Sets the password in the registration form.
   * @param password - Password to enter
   */
  async setPassword(pwd: string): Promise<void> {
    await this.txtPassword.fill(pwd);
  }

  /**
   * Sets the confirm password in the registration form.
   * @param confirmPassword - Confirm password to enter
   */
  async setConfirmPassword(pwd: string): Promise<void> {
    await this.txtConfirmPassword.fill(pwd);
  }

  /**
   * Sets the privacy policy in the registration form.
   */
  async setPrivacyPolicy(): Promise<void> {
    await this.chkPrivacyPolicy.check();
  }

  /**
   * Clicks the continue button in the registration form.
   */
  async clickContinue(): Promise<void> {
    await this.btnContinue.click();
  }

  /**
   * Gets the confirmation message after successful registration.
   * @returns Promise<string> - confirmation message text
   */
  async getConfirmationMessage(): Promise<string> {
    return await this.msgConfirmation.textContent() ?? '';
  }

  /** 
   * Complete registration workflow.
   * @param userData - Object containing registration data
   */
async completeRegistration(userData: {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
}): Promise<void> 
{
    await this.setFirstName(userData.firstName);
    await this.setLastName(userData.lastName);
    await this.setEmail(userData.email);
    await this.setTelephone(userData.telephone);
    await this.setPassword(userData.password);
    await this.setConfirmPassword(userData.password);
    await this.setPrivacyPolicy();
    await this.clickContinue();
    await expect(this.msgConfirmation).toBeVisible();
  }
}