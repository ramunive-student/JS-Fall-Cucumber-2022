const Commands = require("../Commands");

class HomePage {

    commands = new Commands();

    searchBarLocator = '#twotabsearchtextbox';
    searchButtonLocator = '#nav-search-submit-button';



    async enterSearchText(data) {
        await this.commands.clickWebElement(this.searchBarLocator);
        await this.commands.typeInWebElement(this.searchBarLocator, data);
    }

    async clickSearchButton() {
        await this.commands.clickWebElement(this.searchButtonLocator);
        
    }



}
module.exports = HomePage;