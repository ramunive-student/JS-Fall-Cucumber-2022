const { When, Then } = require('@wdio/cucumber-framework');
const HomePage = require('../../POM/Hotels/HomePage');


const homePage = new HomePage();

//Given (/^I am on facebook$/, async function (){
//    await browser.url('/');
// });

When(/^I type '(.+)' in destination$/, async function(destination){

    await homePage.enterDestination(destination);

    await browser.pause(2000);

    


});

Then(/^I select "(.+)" from auto-suggestions$/, async function(destination){

    await homePage.selectFromSuggestedDestinations(destination);

    await browser.pause(7000);

});