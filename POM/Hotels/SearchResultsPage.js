const Commands = require('../Commands');

class SearchResultsPage{

    commands = new Commands();

    // Locators for web-Elements on the search results page (variables)

    sortByDropDownLocator = '//select[@id="sort-filter-dropdown-sort"]';
    //starRankingForAllDisplayedPropertiesLocator = '//div[@class="uitk-rating"]'; // -> this one gave 50 out of 54 properties
    //starRankingForAllDisplayedPropertiesLocator = '//div[@class="uitk-rating"]//span[@class="is-visually-hidden"]';  //using getText() on this one should give 5.0 out of 5
    //h2/following::span[text()="5.0 out of 5"] -> this one gave 50
    //a[@data-stid="open-hotel-information"]

    //starRankingForAllDisplayedPropertiesLocator = '//div[@data-stid="property-listing-results"]//a[@data-stid="open-hotel-information"]';
    //div[@data-stid="property-listing-results"]//a[@data-stid="open-hotel-information"]

    starRankingForAllDisplayedPropertiesLocator = '//div[@data-stid="property-listing-results"]//div[@class="uitk-rating"]'; 



    // functions to interact with the web-Elements on the search results page

    async selectFromSortByDropDown(dropDownChoice){

        let value = '';
        let attribute = 'data-opt-id';

        switch(dropDownChoice.toLowerCase()){
            case 'price':
                value = 'PRICE_LOW_TO_HIGH';
                break;
            case 'recommended':
                value = 'RECOMMENDED';
                break;
            case 'distance':
                value = 'DISTANCE';
                break;
            case 'guest rating':
                value = 'REVIEW_RELEVANT';
                break;
            case 'price plus our picks':
                value = 'PRICE_RELEVANT';
                break;
            case 'star rating':
                value = 'PROPERTY_CLASS'
                break;
            default:
                break;                        
            

                
        }



        await this.commands.selectDataInDropdownByAttribute(this.sortByDropDownLocator, attribute, value);

    }

    async areAllPropertiesInSearchResultTheCorrectStarRating(starRating){

        let locatorText = '';
        //let allHotelsInSearch = await $$(this.starRankingForAllDisplayedPropertiesLocator);
        let allHotelsInSearch = await this.commands.findAllWebElement(this.starRankingForAllDisplayedPropertiesLocator);
        console.log(allHotelsInSearch.length);

        
        
        let allAre5Stars = true;

        for (let i = 0; i < 3; i+=1){   // when use allHotelsInSearch.length or the actual length, which was 18, it times out
            //console.log(await this.commands.getTextOfWebElement(allHotelsInSearch[i])); --------------------------------- for some reason this isn't working
             //console.log(await allHotelsInSearch[i].getText());
            //console.log(await this.commands.getTextOfWebElement(allHotelsInSearch[i])); ----------------------------------using this function is not working
            locatorText = await allHotelsInSearch[i].getText();
            let starIndicator = starRating + '.0 out of ' + starRating;
            if(locatorText.localeCompare(starIndicator) !== 0){
                allAre5Stars = false;
            }



        }

        return allAre5Stars;

        



        

        

        

    }

    


}
module.exports = SearchResultsPage;