/**
 * Test Case: Account Registration
 * 
 * Tags: @smoke  @regression 
 * This test case verifies the account registration functionality of the OpenCart application.
 * 
 * Steps:
 * 1. Navigate to the OpenCart application URL.
 * 2. Click on the "My Account" dropdown and click on "Register"
 * 3. Fill in the registration form with randomly generated user data.
 * 4.Agree to Privacy Policy and submit the form.
 * 5.Validate that the registration was successful by checking for a success message.
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

//defiene global variables for page objects
let homePage: HomePage;
let registrationPage: RegistrationPage;

//hook to run before each test
test.beforeEach(async ({ page }) => {
    // Navigate to the OpenCart application URL before each test
    const config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
});

// Hook to run after each test
test.afterEach(async ({ page }) => {
    // Optionally, you can add cleanup code here if needed
    await page.waitForTimeout(3000); // Wait for 3 seconds to observe the result
    await page.close();
});

//test case for account registration
test('User registration test  @smoke  @regression', async () => {

    //Click on the "My Account" dropdown and click on "Register"
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    //Fill in the registration form with randomly generated user data
    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());
    const password = RandomDataUtil.getPassword();
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);

    //Agree to Privacy Policy and submit the form
    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    //Validate that the registration was successful by checking for a success message
    const confirmationMessage = await registrationPage.getConfirmationMessage();
    expect(confirmationMessage).toContain('Your Account Has Been Created!');

});

