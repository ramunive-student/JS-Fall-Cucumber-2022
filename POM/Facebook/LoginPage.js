const { expect } = require('chai');
const Commands = require('../Commands');

class LoginPage {

    commands = new Commands();

    // Locators for web-Elements on the LoginPage (variables)
    loginEmailLocator = '#email';
    loginPassLocator = '#pass';
    loginButtonLocator = '<button>';
    createNewAccountLocator = '//a[text()="Create New Account" or text()="Create new account"]';
    linkNameLocator = ''

    // functions to interact with the web-Elements on the LoginPage
    async enterLoginEmail(userEmail) {
        await this.commands.typeInWebElement(this.loginEmailLocator, userEmail);
    }

    async enterLoginPassword(userPwd) {
        await this.commands.typeInWebElement(this.loginPassLocator, userPwd);
    }

    async clickLoginInButton() {
        await this.commands.clickWebElement(this.loginButtonLocator);
    }

    async clickCreateNewAccountButton() {
        await this.commands.clickWebElement(this.createNewAccountLocator);
    }

    async isLoginFieldEnabled(fieldName) {
        let isFieldEnabled = false;
        switch (fieldName.toLowerCase()) {
            case 'email':
                isFieldEnabled = await this.commands.isWebElementEnabled(this.loginEmailLocator);
                break;
            case 'password':
                isFieldEnabled = await this.commands.isWebElementEnabled(this.loginPassLocator);
                break;
            case 'button':
                isFieldEnabled = await this.commands.isWebElementEnabled(this.loginButtonLocator);
                break;        
            default:
                break;
        }
        return isFieldEnabled;
    }

    async isLoginEmailEnabled() {
        return await this.commands.isWebElementEnabled(this.loginEmailLocator);
    }

    async isLoginPasswordEnabled() {
        return await this.commands.isWebElementEnabled(this.loginPassLocator);
    }

    async isLoginButtonEnabled() {
        return await this.commands.isWebElementEnabled(this.loginButtonLocator);
    }

    async clickLinkName(linkName) {
        await this.commands.clickWebElement(`=${linkName}`);
    }

    async isMultipleWindowsOpen(expWindowsCount) {
        console.log(`\n\n this.commands.getHandles().length -> ${(await this.commands.getHandles()).length}`);
        return (await this.commands.getHandles()).length === expWindowsCount;
    }

    async getCurrentWindowsCount() {
        return (await this.commands.getHandles()).length;
    }

    async waitForNewLinkWindow(numWindowBeforeClick) {
        // waitFor until number of windows/handles is equals to (this.totalWindowsBeforeClick+1)
        this.commands.waitForNewWindow(numWindowBeforeClick);
    }


}
module.exports = LoginPage;