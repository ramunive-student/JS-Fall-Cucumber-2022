const Commands = require("../Commands");

class SearchPage {

    commands = new Commands();

    sortByDropdownLocator = '//span[text()="Sort by:"]';
    sortOptionByFeatured = '//a[text()="Featured"]';
    sortOptionByPriceLowToHigh = '//a[text()="Price: Low to High"]';
    sortOptionByPriceHighToLow = '//a[text()="Price: High to Low"]';
    sortOptionByAvgCustomerReview = '//a[text()="Avg. Customer Review"]';
    sortOptionByNewestArrivals = '//a[text()="Newest Arrivals"]';

    searchResultsPriceLocator = '//span[@data-component-type="s-search-results"]//span[@class="a-price-whole" or @class="a-price-fraction"]';


    async clickDropdownToShowSortOptions() {
        await this.commands.clickWebElement(this.sortByDropdownLocator);
    }

    async selectSortOption(option) {
        switch (option) {
            case 'Featured':
                await this.commands.clickWebElement(this.sortOptionByFeatured);
                break;  
            case 'Price:Low to High':
                await this.commands.clickWebElement(this.sortOptionByPriceLowToHigh);
                break;
            case 'Price:High to Low':
                await this.commands.clickWebElement(this.sortOptionByPriceHighToLow);
                break;
            case 'Avg. Customer Review':
                await this.commands.clickWebElement(this.sortOptionByAvgCustomerReview);
                break;
            case 'Newest Arrivals':
                await this.commands.clickWebElement(this.sortOptionByNewestArrivals);
                break;        
            default:
                break;
        }
    }

    async getAllSearchResultsPricesInNumbers() {
        const priceElements = await this.commands.findAllWebElement(this.searchResultsPriceLocator);

        await browser.pause(10000);
        const pricesInNumber = []; 
        // [we1, we2, we3, we4,...]
        for (let i=0; i < priceElements.length-8 ; i+=2) {
            let whole = Number(await priceElements[i].getText());
            let cents = Number(await priceElements[i+1].getText());
            cents = cents/100;
            pricesInNumber.push(whole+cents);
        }
        return pricesInNumber;
        
    }

    isPricesInIncreasingOrder(pricesArray) {
        let isArrayInExpectedOrder = true;
        for (let i=0 ; i < pricesArray.length-1 ; i++) {
            if (pricesArray[i] > pricesArray[i+1]) {
                isArrayInExpectedOrder = false;
                break;
            }
        }
        return isArrayInExpectedOrder;
    }



}
module.exports = SearchPage;