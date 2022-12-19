const { expect } = require('chai');
const Commands = require('../Commands');

class HomePage {

    commands = new Commands();

    // Locators for web-Elements on the HomePage (variables)

    zipCodeSearchBoxLocator = '//input[@type="text"]';
    searchButtonLocator = '//a[@class="searchButton"]';
    feelsLikeTempLocator = '//span[@class="feels-like-text"]';
    lowTempLocator = '//span[@class="low-temp-text"]';
    highTempLocator = '//span[@class="high-temp-text"]';
    allTimelineTempElementsLocator = '//span[starts-with(@class, "hour")]//span';


    // functions to interact with the web-Elements on the HomePage

    async enterTextInZipCodeSearchBox (textToEnter){
        await this.commands.typeInWebElement(this.zipCodeSearchBoxLocator, textToEnter)
    }

    async clickOnSearchButton(){
        await this.commands.clickWebElement(this.searchButtonLocator);
    }

    async getTextFromFeelsLikeTemp(){
        return await this.commands.getTextOfWebElement(this.feelsLikeTempLocator);
    }

    async getTextFromLowTemp(){
        return await this.commands.getTextOfWebElement(this.lowTempLocator);
    }

    async getTextFromHighTemp(){
        return await this.commands.getTextOfWebElement(this.highTempLocator);
    }

    async getAllTimelineTempElements(){
        return await this.commands.findAllWebElement(this.allTimelineTempElementsLocator);
    }

}
module.exports = HomePage;