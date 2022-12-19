const { Given, When } = require("@wdio/cucumber-framework");
const { expect } = require("chai");
const HomePage = require("../../POM/Amazon/HomePage");
const SearchPage = require("../../POM/Amazon/SearchPage");


const homepage = new HomePage();
const searchpage = new SearchPage();

// When(/^I type (.+) in search$/, async function (searchText) {
//     await homepage.enterSearchText(searchText);
//     await homepage.clickSearchButton();
// });

// Given(/^I sort result by (.+)$/, async function (sortOption) {
//     await searchpage.clickDropdownToShowSortOptions();
//     await searchpage.selectSortOption(sortOption);
//     await browser.pause(7000);
// });

// Given(/^I verify all results are displayed in increasing order$/, async function () {
//    const allPrices = await searchpage.getAllSearchResultsPricesInNumbers();
//    expect(searchpage.isPricesInIncreasingOrder(allPrices), 'Prices are not in increasing order').to.be.true;
// });