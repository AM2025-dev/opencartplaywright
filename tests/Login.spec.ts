/**
 * Test Case: Login with valid credentials
 * Description: This test case verifies that a user can log in successfully with valid credentials.
 * Tags: @smoke @Regression
 *
 * Steps:
 * 1. Navigate to the application URL.
 * 2. Navigate to the login page via Home page.
 * 3. Enter valid credentials (username and password) and click the login button.
 * 4. Verify successfull login by checking "My Account" link page presence.
 */


import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;   
let config: TestConfig;


//this hooks runs before each test
test.beforeEach(async ({ page }) => {
    // Initialize the TestConfig instance
    config = new TestConfig();
    // Navigate to the application URL
    await page.goto(config.appUrl);
    
    // Initialize page objects
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
});

//Optional cleanup after each test
test.afterEach(async ({ page }) => {
    await page.close();  // Close the page after each test
}); 
            
// Test case: Login with valid credentials
test('Login with valid credentials @smoke  @regression', async () => {
   
    // Navigate to the login page via Home page
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    
    // Enter valid credentials and click the login button
    await loginPage.setEmail(config.email);
    await loginPage.setPassword(config.password);
    await loginPage.clickLogin();

    //Alternatively, you can use the login method
    //await loginPage.login(config.email, config.password);

    // Verify successful login by checking "My Account" link presence
    const isLoggedIn = await myAccountPage.isMyAccountPageExists();
    expect(isLoggedIn).toBeTruthy();

});
