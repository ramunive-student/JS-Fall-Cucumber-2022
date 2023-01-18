const Commands = require('../Commands');
const Dates = require('../../Utils/Dates');

class TermsAndConditionsPage{

    commands = new Commands();

    // Locators for web-Elements on the Terms and Conditions page (variables)

    lastRevisedDateLocator = '//span[contains(text(), "Last revised:")]';



    // functions to interact with the web-Elements on the signUp page

    async isLastRevisedDateInExpectedFormat(){
    
    
        let date = await this.commands.getTextOfWebElement(this.lastRevisedDateLocator);
    
        date = date.split(':');
        date = date[1].trim();

        let isDateValid = Dates.isDateValid(date);
    
        return isDateValid;

    }






}
module.exports = TermsAndConditionsPage;