const { When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');
const moment = require("moment/moment");

const SignUpPage = require('../../POM/Hotels/SignUpPage');
const HomePage = require('../../POM/Hotels/HomePage');
const TermsAndConditionsPage = require('../../POM/Hotels/TermsAndConditionsPage');
const PrivacyStatementPage = require('../../POM/Hotels/PrivacyStatementPage');
const Dates = require('../../Utils/Dates');
const { convertPackageHashToObject } = require('@wdio/cli/build/utils');

const signUpPage = new SignUpPage();
const homePage = new HomePage();
const termsAndConditionsPage = new TermsAndConditionsPage();
const privacyStatementPage = new PrivacyStatementPage();


//Given (/^I am on facebook$/, async function (){
    //    await browser.url('/');
    // });

Then (/^I verify '(Terms and Conditions|Privacy Statement)' page opens in new tab$/, async function(pageType){

    

    let isPageOpenedInNewTab = false;

    switch(pageType.toLowerCase()){
        case 'terms and conditions':
            isPageOpenedInNewTab = await signUpPage.isTermsAndConditionsPageOpenedInNewTab(2);
            expect(isPageOpenedInNewTab, 'Terms and Conditions page did NOT open in new tab').to.be.true;
            break;
        case 'privacy statement':
            isPageOpenedInNewTab = await privacyStatementPage.isPrivacyStatementPageOpenedInNewTab(3);
            expect(isPageOpenedInNewTab, 'Privacy Statement page did NOT open in new tab').to.be.true;
            break; 
        default:
            break;       
    }

});    

Then (/^I verify '(Last revised)' date format is MM\/DD\/YY$/, async function(page){

    let isDateValid = '';

    switch(page.toLowerCase()){
        case 'last revised':
            isDateValid = await termsAndConditionsPage.isLastRevisedDateInExpectedFormat();
            expect(isDateValid, 'Last revised date of Terms and Conditions page is NOT in expected format').to.be.true;
            break;
        default:
            break;        
    }

    
    

});

Then (/^I verify '(Last Updated)' date format is DD MMMM, YYYY$/, async function (page){

    let isDateValid = '';

    switch(page.toLowerCase()){
        case 'last updated':
            isDateValid = await privacyStatementPage.isLastUpdatedDateInExpectedFormat();
            expect(isDateValid, 'Last updated date of Privacy Statement page is NOT in expected format').to.be.true;
            break;
        default:
            break;        
    }

})

When (/^I enter invalid email address with at least @ symbol - enter (.*@+.*)$/, async function(dataToEnter){

            await signUpPage.enterTextInSignupFormEmailInput(dataToEnter);
            
});

When (/^I enter invalid \(cannot contain special characters\) '(first name|last name)' - enter (.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])$/, async function(fieldType, dataToEnter){

    switch(fieldType.toLowerCase()){
        case 'first name':
            await signUpPage.enterTextInSignupFormFirstNameInput(dataToEnter);
            break;
        case 'last name':
            await signUpPage.enterTextInSignupFormLastNameInput(dataToEnter);
            break;
        default:
            break;        
    }


});

When (/^I enter '(.+)' in Sign up form 'password' field$/, async function(textToEnter){

    await signUpPage.enterTextInSignupFormPasswordInput(textToEnter);

});

Then (/^I verify '(Keep me signed in|Continue)' (.*) is displayed$/, async function(webElementName, webElementType){

    let isDisplayed = '';
    
    switch(webElementName.toLowerCase()){
        case 'keep me signed in':
            isDisplayed = await signUpPage.isKeepMeSignedInCheckboxDisplayed();
            expect(isDisplayed, 'Keep me signed in checkbox is NOT displayed').to.be.true;
            break;
        case 'continue':
            isDisplayed = await signUpPage.isSignupFormSubmitButtonDisplayed();
            expect(isDisplayed, 'Continue button is NOT displayed').to.be.true;
            break;
        default:
            break;        
    }



});

Then (/^I verify '(Keep me signed in|Continue)' (.*) is enabled$/, async function(webElementName, webElementType){

    let isEnabled = '';

    switch(webElementName.toLowerCase()){
        case 'keep me signed in':
            isEnabled = await signUpPage.isKeepMeSignedInCheckboxEnabled();
            expect(isEnabled, 'Keep me signed in checkbox is NOT enabled').to.be.true;
            break;
        case 'continue':
            isEnabled = await signUpPage.isSignupFormSubmitButtonEnabled();
            expect(isEnabled, 'Continue button IS enabled').to.be.false;
            break;
        default:
            break;        
    }


});

Then (/^I verify Password strength bar is (not|half|almost|completely) filled and Password strength message is (Weak|Strong|Very Strong)$/, async function (strengthBar, strengthMsg){

    let expectedTextForStrengthBar = '';
    let expectedTextForStrengthMsg = '';
    let messageForStrengthBar = '';
    let messageForStrengthMsg = '';
    let actualTextForStrengthBar = await signUpPage.getPasswordStrengthBarText();
    actualTextForStrengthBar = actualTextForStrengthBar.split(' ');
    actualTextForStrengthBar = actualTextForStrengthBar[2].trim();
    let actualTextForStrengthMsg = await signUpPage.getPasswordStrengthMessageText();
    actualTextForStrengthMsg = actualTextForStrengthMsg.trim();
    
    switch(strengthBar.toLowerCase()){
        case 'not':
            expectedTextForStrengthBar = '0%';
            messageForStrengthBar = 'Password strength bar for "not filled" is NOT as expected';
            expectedTextForStrengthMsg = 'Weak';
            messageForStrengthMsg = 'Password strength message for "not filled" is NOT as expected';
            break;
        case 'half':
            expectedTextForStrengthBar = '50%';
            messageForStrengthBar = 'Password strength bar for "half filled" is NOT as expected';
            expectedTextForStrengthMsg = 'Weak';
            messageForStrengthMsg = 'Password strength message for "half filled" is NOT as expected';
            break;
        case 'almost':
            expectedTextForStrengthBar = '75%';
            messageForStrengthBar = 'Password strength bar for "almost filled" is NOT as expected';
            expectedTextForStrengthMsg = 'Strong';
            messageForStrengthMsg = 'Password strength message for "almost filled" is NOT as expected';
            break;
        case 'completely':
            expectedTextForStrengthBar = '100%';
            messageForStrengthBar = 'Password strength bar for "completely filled" is NOT as expected';
            expectedTextForStrengthMsg = 'Very Strong';
            messageForStrengthMsg = 'Password strength message for "completely filled" is NOT as expected';
            break;
        default:
            break;                
    }

    expect(actualTextForStrengthBar, messageForStrengthBar).to.equal(expectedTextForStrengthBar);
    expect(actualTextForStrengthMsg, messageForStrengthMsg).to.equal(expectedTextForStrengthMsg);

});



Then (/^I verify '(.+)' weak password message is displayed$/, async function (expectedMsg){


    let isMsgDisplayed = await signUpPage.isWeakPasswordMsgDisplayed(expectedMsg);
    expect(isMsgDisplayed,  'weak password message ' + expectedMsg + ' is NOT displayed').to.be.true;

    

});



