import { Page, expect, Locator} from '@playwright/test';

export class HomePage {
  
    private readonly page: Page;
    // Locators
    private readonly linkMyAccount: Locator;
    private readonly linkRegister: Locator; 
    private readonly linkLogin: Locator;  
    private readonly txtSearchBox: Locator;  
    private readonly btnSearch: Locator;


    // Constructor:initializes the page and locators
    constructor(page: Page) {
        
        this.page = page;
        // Initialize locators
        this.linkMyAccount = page.locator('span:has-text("My Account")');
        this.linkRegister = page.locator('a:has-text("Register")');
        this.linkLogin = page.locator('a:has-text("Login")');
        this.txtSearchBox = page.locator('//*[@id="search"]/input');
        this.btnSearch = page.locator('#search button[type="button"]');

    }

    //action methods
async isHomePageExists() {

    let title: string = await this.page.title();
    if (title) 
        return true;
    else 
        return false;   
}

//click "My Account" link
async clickMyAccount() {
    try {
        await this.linkMyAccount.click();
    } catch (error) {
        console.error(`Exception occured while clicking 'My Account': ${error}`);
        throw error;
    }
}

//click "Register" link
async clickRegister() {
    try {
        await this.linkRegister.click();
    } catch (error) {
        console.error(`Exception occured while clicking 'Register': ${error}`);
        throw error;
    }
}


//click "Login" link
async clickLogin() {
    try {
        await this.linkLogin.click();
    } catch (error) {
        console.error(`Exception occured while clicking 'Login': ${error}`);
        throw error;
    }
}   


//search for a product
async enterProductName(productName: string) {
    try {
        await this.txtSearchBox.fill(productName);
    } catch (error) {
        console.error(`Exception occured while entering product name '${productName}': ${error}`);
        throw error;
    }
}

//click search button
async clickSearchButton() 
{
    try {
        await this.btnSearch.click();
    } catch (error) {
        console.error(`Exception occured while clicking search button: ${error}`);
        throw error;
    }
}

}
