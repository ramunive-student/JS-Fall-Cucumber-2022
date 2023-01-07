const { When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');
const HomePage = require('../../POM/Darksky/HomePage');
const Dates = require('../../Utils/Dates');
const moment = require("moment/moment");

const homePage = new HomePage();

// Given (/^I am on facebook$/, async function (){
//     await browser.url('/');
// });

// When (/^I enter '(.*)' in the search box$/, async function (zipcode) {
//     await homePage.enterTextInZipCodeSearchBox(zipcode);

// });

// When (/^I click on the search button$/, async function (){
//     await homePage.clickOnSearchButton();

// });

// Then (/^I verify the feelsLikeTempValue is in between the lowTempValue and the highTempValue$/, async function () {

//     //await browser.pause(5000);

//     await browser.waitUntil(async () => {
//         const pageTitle = await browser.getTitle();
//         return !pageTitle.includes ('1 City Hall');
//     }, {
//         timeout: 5000,
//         timeoutMsg: 'Still on default Dark Sky homepage'
        
//     })

//     const feelsLikeTempStr = await homePage.getTextFromFeelsLikeTemp();
//     const feelsLikeTempNum = Number(feelsLikeTempStr.split('˚')[0]);

//     const lowTempStr = await homePage.getTextFromLowTemp();
//     const lowTempNum = Number(lowTempStr.split('˚')[0]);

//     const highTempStr = await homePage.getTextFromHighTemp();

//     const highTempNum = Number(highTempStr.split('˚')[0]);

//     const isFeelsLikeInBetweenLowAndHigh = lowTempNum < feelsLikeTempNum && feelsLikeTempNum < highTempNum;

    // console.log(`\n\nlowTempNum -> ${lowTempNum}`);
    // console.log(`\n\nfeelsLikeTempNum -> ${feelsLikeTempNum}`);
    // console.log(`\n\nhighTempNum -> ${highTempNum}`);


//     expect(isFeelsLikeInBetweenLowAndHigh, 'Feels Like temperature is NOT in between the low temperature and the high temperature').to.be.true;


// });


// Then (/^I verify there are (.+) data points with (.+) hours gap on timeline$/, async function (dataPoints, hourGap) {

//     const allTimelineTempElements = await homePage.getAllTimelineTempElements();
    
//     const allTimelineTempValues = [];

//     for (const tempElement of allTimelineTempElements){
//         allTimelineTempValues.push(await tempElement.getText());
//     }

//     let expectedTimelineTempValues = ['Now'];

//     // adding 1 to the hourGap to accommodate the fact that my machine is CST rather than EST
//     let newTime = moment().add(1, 'hour');
//     newTime = newTime.add(hourGap, 'hour');
    

//     for (let i = 2; i <= dataPoints; i++){
//         expectedTimelineTempValues.push(newTime.format('ha'));
//         newTime = newTime.add(hourGap, 'hour');
//     }

//     expect(allTimelineTempValues, 'Timeline is not as expected').to.deep.equal(expectedTimelineTempValues);
    

// });


