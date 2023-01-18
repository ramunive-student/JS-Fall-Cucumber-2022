const { When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');

const SignInPage = require('../../POM/Hotels/SignInPage');
const HomePage = require('../../POM/Hotels/HomePage');

const signInPage = new SignInPage();
const homePage = new HomePage();

//Given (/^I am on facebook$/, async function (){
//    await browser.url('/');
// });

When (/^I enter '(.+)' in Sign in form '(email address|password)' field$/, async function (inputText, fieldType){

    switch(fieldType.toLowerCase()){
        case 'email address':
            await signInPage.enterTextIntoLoginFormEmailInput(inputText);
            break;
        case 'password':
            await signInPage.enterTextIntoLoginFormPasswordInput(inputText);
            break;
        default:
            break;        
    }

});