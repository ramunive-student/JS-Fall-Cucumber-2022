const Commands = require('../Commands');

class SignUpPage{

    commands = new Commands();

    // Locators for web-Elements on the signUp page (variables)

    termsAndConditionsLinkLocator = '//a[text()="Terms and Conditions"]';
    privacyStatementLinkLocator = '//a[text()="Privacy Statement"]';
    signUpFormEmailInputLocator = '//input[@id="signupFormEmailInput"]';
    signupFormEmailInputErrorLocator = '//div[@id="signupFormEmailInput-error"]';
    signupFormFirstNameInputLocator = '//input[@id="signupFormFirstNameInput"]';
    signupFormFirstNameInputErrorLocator = '//div[@id="signupFormFirstNameInput-error"]';
    signupFormLastNameInputLocator = '//input[@id="signupFormLastNameInput"]';
    signupFormLastNameInputErrorLocator = '//div[@id="signupFormLastNameInput-error"]';
    signupFormPasswordInputLocator = '//input[@id="signupFormPasswordInput"]';
    keepMeSignedInCheckboxLocator = '//label[@for="rememberMeSignUpCheckbox"]';
    signupFormSubmitButtonLocator = '//button[@id="signupFormSubmitButton"]';
    passwordStrengthBarLocator = '//div[@class="uitk-progress-bar-container"]';  
    passwordStrengthMessageLocator = '//div[@class="uitk-layout-flex-item uitk-type-right uitk-progress-bar-description uitk-type-bold"]';
    weakPasswordMessagesLocator = '//li';
    



    // functions to interact with the web-Elements on the signUp page

    async clickTermsAndConditionsLink(){

        await this.commands.switchBrowserWindowUsingPageTitle('Create an account');
        await this.commands.clickWebElement(this.termsAndConditionsLinkLocator);
    }

    async isTermsAndConditionsPageOpenedInNewTab(expectedNumOfTabs){

        let isPageOpenInNewTab = false;
        const expectedTitle = 'Terms of Service';

        let actualNumOfTabs = await this.commands.getNumberOfOpenBrowserTabs();

        if(actualNumOfTabs !== expectedNumOfTabs){
            return false;
        }

        let expectedHandle = await this.commands.switchBrowserWindowUsingPageTitle(expectedTitle);
        let actualTitle = await this.commands.getPageTitle();

        if (actualTitle.localeCompare(expectedTitle) === 0){
            isPageOpenInNewTab = true;
        }

        return isPageOpenInNewTab;


    }

    async clickPrivacyStatementLink(){
        await this.commands.switchBrowserWindowUsingPageTitle('Create an account');
        await this.commands.clickWebElement(this.privacyStatementLinkLocator);
        await browser.pause(5000);
    
    }

    async switchBrowserToCreateAnAccountPage(){

        return await this.commands.switchBrowserWindowUsingPageTitle('Create an account');
        
    }

    async enterTextInSignupFormEmailInput(textToEnter){

        await this.commands.typeInWebElement(this.signUpFormEmailInputLocator, textToEnter);
    }

    async getSignUpFormEmailInputErrorMsgText(){
        return await this.commands.getTextFromWebElement(this.signupFormEmailInputErrorLocator);

    }

    async enterTextInSignupFormFirstNameInput(textToEnter){

        await this.commands.typeInWebElement(this.signupFormFirstNameInputLocator, textToEnter);
    }

    async getSignUpFormFirstNameInputErrorMsgText(){
        return await this.commands.getTextFromWebElement(this.signupFormFirstNameInputErrorLocator);

    }

    async enterTextInSignupFormLastNameInput(textToEnter){

        await this.commands.typeInWebElement(this.signupFormLastNameInputLocator, textToEnter);
    }

    async getSignUpFormLastNameInputErrorMsgText(){
        return await this.commands.getTextFromWebElement(this.signupFormLastNameInputErrorLocator);

    }

    async enterTextInSignupFormPasswordInput(textToEnter){

        await this.commands.typeInWebElement(this.signupFormPasswordInputLocator, textToEnter);
    }

    async clickKeepMeSignedInCheckbox(){
        await this.commands.clickWebElement(this.keepMeSignedInCheckboxLocator);
    }

    async isKeepMeSignedInCheckboxDisplayed(){

        return await this.commands.isWebElementDisplayed(this.keepMeSignedInCheckboxLocator);

    }

    async isKeepMeSignedInCheckboxEnabled(){

        return await this.commands.isWebElementEnabled(this.keepMeSignedInCheckboxLocator);

    }

    async isSignupFormSubmitButtonDisplayed(){

        return await this.commands.isWebElementDisplayed(this.signupFormSubmitButtonLocator);

    }

    async isSignupFormSubmitButtonEnabled(){

        return await this.commands.isWebElementEnabled(this.signupFormSubmitButtonLocator);

    }

    async getPasswordStrengthBarText(){
        return await this.commands.getTextFromWebElement(this.passwordStrengthBarLocator);

    }

    async getPasswordStrengthMessageText(){
        return await this.commands.getTextFromWebElement(this.passwordStrengthMessageLocator);
    }


    async isWeakPasswordMsgDisplayed(expectedMsg){

        let allMsgs = await this.commands.findAllWebElement(this.weakPasswordMessagesLocator);
        let actualMsgText = '';
        let isMsgDisplayed = false;

        for (let message of allMsgs){
            actualMsgText = await this.commands.getTextFromWebElement(message);
            if(actualMsgText.localeCompare(expectedMsg) === 0){
                isMsgDisplayed = await this.commands.isWebElementDisplayed(message);
                
            }

        }

        return isMsgDisplayed;


    }









    




    


   


}
module.exports = SignUpPage;