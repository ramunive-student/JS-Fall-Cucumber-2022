const Commands = require('../Commands');
const Dates = require('../../Utils/Dates');

class PrivacyStatementPage{

    commands = new Commands();

    // Locators for web-Elements on the Privacy Statement page (variables)

    privacyStatementHeaderLocator = '(//h2[text()="Privacy Statement"])[1]';
    lastUpdatedDateLocator = '//p[text()="Last Updated: 20 December, 2022"]'

    // functions to interact with the web-Elements on the Privacy Statement page



    async isPrivacyStatementPageOpenedInNewTab(expectedNumOfTabs){

        let isPageOpenInNewTab = false;
        const expectedHeader = 'Privacy Statement';
        const expectedPartialTitle = 'Hotels.com - Deals';

    
        let actualNumOfTabs = await this.commands.getNumberOfOpenBrowserTabs();
    
        if(actualNumOfTabs !== expectedNumOfTabs){
            return false;
        }
    
        let expectedHandle = await this.commands.switchBrowserWindowUsingPartialPageTitle(expectedPartialTitle);

        let isDisplayed = await this.commands.isWebElementDisplayed(this.privacyStatementHeaderLocator);
        let actualPageTitle = this.commands.getPageTitle();
        let isPageTitleAsExpected = (await actualPageTitle).startsWith(expectedPartialTitle);

        if (isDisplayed && isPageTitleAsExpected){

            isPageOpenInNewTab = true;

        }

    
        return isPageOpenInNewTab;
    
    
    }

    async isLastUpdatedDateInExpectedFormat(){
    
    
        let date = await this.commands.getTextOfWebElement(this.lastUpdatedDateLocator);
    
        date = date.split(':');
        date = date[1].trim();

        let isDateValid = Dates.isDateValid2(date);
    
        return isDateValid;

    }
}
module.exports = PrivacyStatementPage;