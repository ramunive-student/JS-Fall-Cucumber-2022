const { Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');
const HomePage = require('../../POM/Hotels/HomePage');
const Dates = require('../../Utils/Dates');


const homePage = new HomePage();

//Given (/^I am on facebook$/, async function (){
//    await browser.url('/');
// });

Then (/^I verify that past dates are disabled in calendar$/, async function (){

    /**
         * 2a. Find all dates for the current month
         * 2b. Determine how many of those dates are actually disabled
         * 2c. Expect the total number of disabled dates to equal todaysDate - 1
         */
    await homePage.openCalendar();
    await browser.pause(1000);

    
    const totalDisabledDatesThisMonth = await homePage.findNumberOfDisabledDatesForCurrentMonth();
    const currentDate = Dates.getCurrentDate();

    expect (totalDisabledDatesThisMonth, 'Total number of disabled dates is not as expected').to.equal(currentDate-1);

});

Then (/^I select "(.+)" as Check-in$/, async function (date){

    await homePage.openCalendar();

    await browser.pause(2000);

    await homePage.selectCheckInDate('May 25 2023');

});

Then (/^I select "(.+)" as Check-out$/, async function (date){

    await homePage.selectCheckOutDate(date);

    //await browser.pause(7000);


});

Then (/^I click Done button$/, async function (){

    await homePage.clickDoneOnCalendar();

    //await browser.pause(7000);

})







