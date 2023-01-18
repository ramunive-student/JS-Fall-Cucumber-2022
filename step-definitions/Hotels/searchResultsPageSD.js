const { When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');
const HomePage = require('../../POM/Hotels/HomePage');
const SearchResultsPage = require('../../POM/Hotels/SearchResultsPage');
const SignInPage = require('../../POM/Hotels/SignInPage');
const SignUpPage = require('../../POM/Hotels/SignUpPage');
const Dates = require('../../Utils/Dates');


const homePage = new HomePage();
const searchResultsPage = new SearchResultsPage();
const signInPage = new SignInPage();
const signUpPage = new SignUpPage();

//Given (/^I am on facebook$/, async function (){
//    await browser.url('/');
// });


When (/^I select '(Recommended|Price|Distance|Guest rating|Price plus our picks|Star rating)' from sort-by dropdown$/, async function (sortByChoice){


    await searchResultsPage.selectFromSortByDropDown(sortByChoice);



});

Then (/^I verify all hotels in search results are '(1|2|3|4|5)' star rated$/, async function(numStars){

    let areAllStarRatingsCorrect = await searchResultsPage.areAllPropertiesInSearchResultTheCorrectStarRating(numStars);
    expect(areAllStarRatingsCorrect, 'All star ratings are NOT as expected').to.be.true;

});

