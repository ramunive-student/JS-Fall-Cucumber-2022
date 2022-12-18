const { Given, When, Then } = require("@wdio/cucumber-framework");
const LoginPage = require('../../POM/Facebook/LoginPage');
const LoginErrorPage = require('../../POM/Facebook/LoginErrorPage');
const { expect } = require("chai");

const loginPage = new LoginPage();
const loginErrorPage = new LoginErrorPage();

// Glue Code
/**
 * Glue code is a regular expression which helps to map Scenario-steps with functions (step-definitions)
 */

// ***************TEMPLATE*************************************

// Given (/^I am on facebook$/, async function (){
//     await browser.url('/');
// });

Given(/^I am on (facebook|hotels|darksky|yahoo|amazon)$/, async function (urlName) {
    switch (urlName.toLowerCase()) {
        case 'facebook':
            await browser.url('/');
            break;
        case 'hotels':
            await browser.url('https://www.hotels.com');
            break;
        case 'darksky':
            await browser.url('https://www.darksky.net');
            break;
        case 'yahoo':
            await browser.url('https://www.yahoo.com');
            break;
        case 'amazon':
            await browser.url('https://www.amazon.com');
            break;
        default:
            break;
    }
});

// When(/^I type '(.*)' as username$/, async function (username) {
//     await loginPage.enterLoginEmail(username);
// });

// When(/^I type '(.*)' as password$/, async function (pwd) {
//     await loginPage.enterLoginPassword(pwd);
// });

/*
    I type 'X' as username
    I type 'X' as password
*/
When(/^I type '(.+)' as (username|password)$/, async function (data, field) {
    switch (field.toLowerCase()) {
        case 'username':
            await loginPage.enterLoginEmail(data);
            break;
        case 'password':
            await loginPage.enterLoginPassword(data);
            break;    
        default:
            break;
    }
});


When(/^I click login button$/, async function () {
    await loginPage.clickLoginInButton();
})

When(/^I verify error is displayed$/, async function () {
    expect(await loginErrorPage.isLoginErrorDisplayed(), 'Login error is not displayed').to.be.true;
});

// /*
//     I verify login "A" is enabled
// */
// When(/^I verify login "(email|password|button)" is enabled$/, async function (field) {
//     let isFieldEnabled = false;
//     switch (field.toLowerCase()) {
//         case 'email':
//             isFieldEnabled = await loginPage.isLoginEmailEnabled();
//             break;
//         case 'password':
//             isFieldEnabled = await loginPage.isLoginPasswordEnabled();
//             break;
//         case 'button':
//             isFieldEnabled = await loginPage.isLoginButtonEnabled();
//             break;        
//         default:
//             break;
//     }
//     expect(isFieldEnabled, `Login ${field} is NOT enabled`).to.be.true;
// });

// When(/^I click on (.+) link$/, async function (linkName) {
//     this.totalWindowsBeforeClick = await loginPage.getCurrentWindowsCount();
//     await loginPage.clickLinkName(linkName);
// });

// Then(/^I verify opens in a new window with title "(.+)"$/, async function (pageTitle) {
//     loginPage.waitForNewLinkWindow(this.totalWindowsBeforeClick);
//     this.totalWindowsAfterClick = await loginPage.getCurrentWindowsCount();
//     expect(this.totalWindowsBeforeClick + 1, 'Number of windows are not as expected').to.equal(this.totalWindowsAfterClick);
// });