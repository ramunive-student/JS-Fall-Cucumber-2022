const Commands = require('../Commands');


class SignInPage{

    commands = new Commands();

    // Locators for web-Elements on the signIn page (variables)

    loginFormEmailInputLocator = '//input[@id="loginFormEmailInput"]';
    loginFormPasswordInputLocator = '//input[@id="loginFormPasswordInput"]';
    loginFormSignInBtnLocator = '//button[@id="loginFormSubmitButton"]';
    loginFormSubmissionErrorMessageLocator = '//h3[text()="Email and password don\'t match. Please try again."]';

    // functions to interact with the web-Elements on the signIn page

    async enterTextIntoLoginFormEmailInput(inputText){
        await this.commands.typeInWebElement(this.loginFormEmailInputLocator, inputText);
    }

    async enterTextIntoLoginFormPasswordInput(inputText){
        await this.commands.typeInWebElement(this.loginFormPasswordInputLocator, inputText);
    }

    async clickLoginFormSignInBtn(){
        await this.commands.clickWebElement(this.loginFormSignInBtnLocator);
    }

    async isLoginFormSubmissionErrorMessageDisplayed(){
        await this.commands.isWebElementDisplayed(this.loginFormSubmissionErrorMessageLocator);
    }




}
module.exports = SignInPage;