import {Page , Locator, expect} from '@playwright/test';
import {LogoutPage } from './LogoutPage'; // Import the LogoutPage if needed

export class MyAccountPage {
  private readonly page: Page;

// Define locators for the My Account page elements
    private readonly msgHeading: Locator;
    private readonly lnkLogout: Locator;

// Constructor: initializes the page and locators
  constructor(page: Page) {
    this.page = page;
    // Initialize locators with CSS selectors
    this.msgHeading = page.locator('h2:has-text("My Account")');
    this.lnkLogout = page.locator("text=Logout").nth(1);
  }
/**
 * Verify if the My Account page is displayed 
 * @returns {Promise<boolean>} - Returns true if the heading is displayed, otherwise false
 */
async isMyAccountPageExists(): Promise<boolean> {
  try {
    const isVisible = await this.msgHeading.isVisible();
    return isVisible;
  } catch (error) {
    console.error(`Error checking My Account page visibility: ${error}`);
    return false;
  }
}

/**
 * Clicks on the Logout link on the My Account page
 * @returns {Promise<LogoutPage>} - Returns an instance of LogoutPage after clicking the link
 */
async clickLogout(): Promise<LogoutPage> {
  try {
    await this.lnkLogout.click();
    return new LogoutPage(this.page); // Return a new instance of LogoutPage
  } catch (error) {
    console.log(`Unable to click Logout link: ${error}`);
    throw error; // Re-throw the error for further handling
  }
}

/**
 * Alternative method to return page exists using title
 * @returns {Promise<boolean>} - Returns true if the page title matches, otherwise false
 */

async getPageTitle(): Promise<string> {
  return this.page.title();
  }
}

