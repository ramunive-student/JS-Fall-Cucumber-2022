const { When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');
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

When (/^I select number of adults in Room 1 as 1$/, async function ( ) {

    homePage.clickTravelersSelectionButton();

    
    let numAdults = await homePage.getNumOfAdults();
    console.log(`\n\nnumAdults -> ${numAdults}`);
    
    while(numAdults > 1){
        console.log(`\n\nnumAdults -> ${numAdults}`);
        homePage.clickNumAdultsDecreaseButton();
        numAdults = await homePage.getNumOfAdults();
    }
    console.log(`\n\nnumAdults -> ${numAdults}`);
    console.log('Out of loop');
     

    await browser.pause(5000); 
    

});

Then (/^I verify the minus button for adults is disabled$/, async function(){

    expect(await homePage.isNumAdultsDecreaseButtonParentEnabled(), 'Number of Adults Decrease Button is NOT disabled').to.be.false;
    

});

Then (/^I verify the plus button for adults is enabled$/, async function(){

    expect(await homePage.isNumAdultsIncreaseButtonEnabled(), 'Number of Adults Increase Button is NOT enabled').to.be.true;
    

});

When (/^I select number of adults in Room 1 as 14$/, async function ( ) {

    
    let numAdults = await homePage.getNumOfAdults();
    console.log(`\n\nnumAdults -> ${numAdults}`);

   

    while(numAdults < 14){
        console.log(`\n\nnumAdults -> ${numAdults}`);
        homePage.clickNumAdultsIncreaseButton();
        numAdults = await homePage.getNumOfAdults();
    }
    console.log(`\n\nnumAdults -> ${numAdults}`);
    console.log('Out of loop');
     

    await browser.pause(5000); 
    

});

Then (/^I verify the plus button for adults is disabled$/, async function(){

    expect(await homePage.isNumAdultsIncreaseButtonParentEnabled(), 'Number of Adults Increase Button is NOT disabled').to.be.false;
    

});

// Then (/^I verify the minus button for adults is enabled$/, async function(){

//     expect(await homePage.isNumAdultsDecreaseButtonEnabled(), 'Number of Adults Decrease Button is NOT enabled').to.be.faltruese;
    

// });

