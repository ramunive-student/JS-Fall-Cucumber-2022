const Commands = require('../Commands');


class ListYourPropertyPage {

    commands = new Commands();

    // Locators for web-Elements on the ListYourPropertyPage (variables)

    lodgingButtonLocator = '//img[@alt="Lodging"]';
    propertyLocationInputBoxLocator = '//input[@id="locationTypeAhead"]';
    autoSuggestionsLocator = '//ul[@role="menu"]//li';

    // functions to interact with the web-Elements on the ListYourPropertyPage

    async clickLodgingButton() {
        await this.commands.clickWebElement(this.lodgingButtonLocator);
    }

    async typeInPropertyLocationInputBox(dataToEnter){
        await this.commands.typeInWebElement(this.propertyLocationInputBoxLocator, dataToEnter);
    }

    async selectFromSuggestedLocations(userChoice) {
        await this.commands.selectPartialFromAutoSuggestion(this.autoSuggestionsLocator, userChoice);
        await browser.pause(7000);
    }

    



}
module.exports = ListYourPropertyPage;