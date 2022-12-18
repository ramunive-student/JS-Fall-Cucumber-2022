const Commands = require('../Commands');
class LoginErrorPage {

    commands = new Commands();

    // Locators for web-Elements on the LoginErrorPage (variables)
    loginErrorMsgLocator = '//div[contains(text(), "t connected to an account.")]'


    // functions to interact with the web-Elements on the LoginErrorPage
    async isLoginErrorDisplayed() {
        return await this.commands.isWebElementDisplayed(this.loginErrorMsgLocator);
        // return await $(this.loginErrorMsgLocator).isDisplayed();
    }


}
module.exports = LoginErrorPage