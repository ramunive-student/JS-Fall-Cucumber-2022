const { When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');
const { min } = require('moment/moment');
const FeedBackPage = require('../../POM/Hotels/FeedBackPage');
const HomePage = require('../../POM/Hotels/HomePage');
const SignInPage = require('../../POM/Hotels/SignInPage');
const SignUpPage = require('../../POM/Hotels/SignUpPage');
const Dates = require('../../Utils/Dates');



const homePage = new HomePage();
const feedbackPage = new FeedBackPage();
const signInPage = new SignInPage();
const signUpPage = new SignUpPage();


//Given (/^I am on facebook$/, async function (){
//    await browser.url('/');
// });


When (/^I click on '(.+)' (button|link)$/, async function (buttonType, elementType){

    let expectedHandle = '';

    switch(buttonType.toLowerCase()){
        case 'dates':
            await homePage.clickCalendarOpenButton();
            break;
        case 'search':
            await homePage.clickSearchBtnLocator();
            break;    
        case 'get the app':
            await homePage.clickGetTheAppButton();
            break;
        case 'travelers':
            await homePage.clickTravelersSelectionButton(); 
            break;
        case 'travelers done':
            await homePage.clickTravelersDoneButton();
            break;
        case 'date selector done':
            await homePage.clickDoneOnCalendar();
            break;    
        case 'sign in':
            await homePage.clickSignInLink();
            break;
        case 'account sign in':
            await homePage.clickAccountSignInBtn();
            break; 
        case 'sign in form sign in':
            await signInPage.clickLoginFormSignInBtn();
            break;
        case 'sign up':
            await homePage.clickAccountSignUpLink();
            break;        
        case 'feedback':
            await homePage.clickFeedbackLink();

            //switch browser to new page
            expectedHandle = await feedbackPage.switchBrowserToFeedbackPage();
            break;
        case 'feedback submit':
            await feedbackPage.clickFeedbackSubmitBtn();
            break;
        case 'english language':
            await homePage.clickEnglishDefaultLanguage();
            break;
        case 'language selector save':
            await homePage.clickLanguageSelectorSaveBtn();
            break;
        case 'español language':
            await homePage.clickSpanishLanguage();
            break;
        case 'language selector guardar':
            await homePage.clickLanguageSelectorGuardarBtn();
            break;
        case 'terms and conditions':
            await signUpPage.clickTermsAndConditionsLink();
            break; 
        case 'privacy statement':
            // switch browser to hotels.com Create an account page
            await signUpPage.clickPrivacyStatementLink();
            break;                                  
        default:
            break;

    }



});

When (/^I scroll to '(.+)' button$/, async function (buttonType){

    switch(buttonType.toLowerCase()){
        case 'get the app':
            await homePage.scrollToGetTheAppButton();
            break;    
        default:
            break;

    }

});


When (/^I go to current month if not displayed$/, async function(){

    await homePage.goToCurrentMonthOfCalendar();

});

Then (/^I verify past dates are disabled for the current month$/, async function(){

    const numDisabledDates = await homePage.findNumberOfDisabledDatesForCurrentMonth();
    const currentDate = Number(Dates.getCurrentDate());

    expect(numDisabledDates, 'Past dates are NOT disabled').to.equal(currentDate-1);

});

Then (/^I verify the back button is disabled for the current month$/, async function(){


    expect(await homePage.isPreviousCalendarButtonEnabled(), 'Back button is NOT disabled').to.be.false;

});

Then (/^I verify '(.+)' error message is displayed$/, async function(expectedErrorMsg){

    let actualErrorMsg = '';

    switch(expectedErrorMsg.toLowerCase()){
        case 'please enter a valid phone number.':
            actualErrorMsg = await homePage.getPhoneNumberErrorMsgText();
            expect(actualErrorMsg, 'Error message is NOT as expected').to.equal(expectedErrorMsg);
            break;
        case 'Email and password don\'t match. Please try again.':
            
        //because the locator uses the entire displayed text of the error message, can just determine if message is displayed rather than
        //comparing the expected error message to the actual error message
        
        expect(await signInPage.isLoginFormSubmissionErrorMessageDisplayed(), 'Sign in error message is NOT as expected').to.be.true; 
            break;        
        case 'enter a valid email.':
            actualErrorMsg = await signUpPage.getSignUpFormEmailInputErrorMsgText();
            expect(actualErrorMsg, 'Invalid email error message is NOT as expected').to.equal(expectedErrorMsg);
            break;
        case 'first name cannot contain special characters':
            actualErrorMsg = await signUpPage.getSignUpFormFirstNameInputErrorMsgText();
            expect(actualErrorMsg, 'Invalid first name error message is NOT as expected').to.equal(expectedErrorMsg);
            break;
        case 'last name cannot contain special characters':
            actualErrorMsg = await signUpPage.getSignUpFormLastNameInputErrorMsgText();
            expect(actualErrorMsg, 'Invalid last name error message is NOT as expected').to.equal(expectedErrorMsg);
            break;        
        default:
            break;

    }


});

When (/^I enter '(.+)' in '(.+)'$/, async function(dataToEnter, textBox){


    switch(textBox.toLowerCase()){
        case 'phone number':
            await homePage.enterPhoneNumberForApp(dataToEnter);
            break; 
        case 'signup email address':
            await signUpPage.enterTextInSignupFormEmailInput(dataToEnter);
            break;
        case 'first name':
            await signUpPage.enterTextInSignupFormFirstNameInput(dataToEnter);
            break;
        case 'last name':
            await signUpPage.enterTextInSignupFormLastNameInput(dataToEnter);
            break;
        case 'signup password':
            await signUpPage.enterTextInSignupFormPasswordInput(dataToEnter);
            break;
        case 'going to':
            await homePage.enterDestination(dataToEnter);
            break;            
        default:
            break;

    }


});

When (/^I select '(Adults|Children)' as '(.+)'$/, async function(personCategory, numPersons){



    let numPersonsAsNumber = Number(numPersons);

    switch(personCategory.toLowerCase()){
        case 'adults':
            let numAdults = Number(await homePage.getNumOfAdults());
            const maxNumberOfAdultsAsNumber = Number(await homePage.getMaxNumOfAdults());
            const minNumberOfAdultsAsNumber = Number(await homePage.getMinNumOfAdults());

            
            if(numPersonsAsNumber >= minNumberOfAdultsAsNumber && numPersonsAsNumber <= maxNumberOfAdultsAsNumber){   


                // user entered value is less than default number of adults
                if(numPersonsAsNumber < numAdults) {

                    while (numAdults > numPersonsAsNumber){
    
                        await homePage.clickNumAdultsDecreaseButton();
                        numAdults = Number(await homePage.getNumOfAdults());
    
                    }
    
                }else if (numPersonsAsNumber > numAdults){  // user entered value is greater than default number of adults

                    while (numAdults <  numPersonsAsNumber){
    
                        await homePage.clickNumAdultsIncreaseButton();
                        numAdults = Number(await homePage.getNumOfAdults());
    
                    }


                }


            }
            break;    
        case 'children':

        let numChildren = Number(await homePage.getNumOfChildren());
        const maxNumberOfChildrenAsNumber = Number(await homePage.getMaxNumOfChildren());
        const minNumberOfChildrenAsNumber = Number(await homePage.getMinNumOfChildren());

        if(numPersonsAsNumber >= minNumberOfChildrenAsNumber && numPersonsAsNumber <= maxNumberOfChildrenAsNumber){ 


            // user entered value is less than default number of children
            if(numPersonsAsNumber < numChildren) {

                while (numChildren > numPersonsAsNumber){

                    await homePage.clickNumChildrenDecreaseButton();  
                    numChildren = Number(await homePage.getNumOfChildren());

                }

            }else if (numPersonsAsNumber > numChildren){  // user entered value is greater than default number of children

                while (numChildren <  numPersonsAsNumber){

                    await homePage.clickNumChildrenIncreaseButton();
                    numChildren = Number(await homePage.getNumOfChildren());

                }


            }


        }

            break;
        default:
            break;

    }

    

});

Then (/^I verify the number of 'Children-age dropdowns' displayed are '(0|1|2|3|4|5|6)'$/, async function(numChildren){

    const isNumChildrenDropdownsDisplayedCorrect = await homePage.areCorrectNumOfChildAgeSelectorDropdownsAreDisplayed(numChildren);
    expect(isNumChildrenDropdownsDisplayedCorrect, 'Number of child-age dropdowns are NOT the same as the number of children selected').to.be.true;

});



When (/^I select '(first|second|third|fourth|fifth|sixth)' child age: '(.+)'$/, async function(childOrder, age){

    let childOrderAsDigit = '';

    switch(childOrder.toLowerCase()){
        case 'first':
            childOrderAsDigit = '0';
            break;
        case 'second':
            childOrderAsDigit = '1';
            break;
        case 'third':
            childOrderAsDigit = '2';
            break;
        case 'fourth':
            childOrderAsDigit = '3';
            break;
        case 'fifth':
            childOrderAsDigit = '4';
            break;  
        case 'sixth':
            childOrderAsDigit = '5';
            break;                      
        default:
            break;
    }  
    
    await homePage.selectAgeFromChildAgeSelectorDropdown(childOrderAsDigit, age);

});

Then (/^I verify total number of travelers is sum of adults selected and children selected$/, async function (){

    const numAdults = Number(await homePage.getNumOfAdults());
    const numChildren = Number(await homePage.getNumOfChildren());
    const expectedNumOfTravelers = numAdults + numChildren;

    //actualNumberOfTravelers - figure out how to get text containing the 9 in the travelers box (split based on space????). Convert to number then compare actual to expected

    let actualNumberOfTravelers = await homePage.getTextFromTravelersSelectionButton();
    
    actualNumberOfTravelers = Number(actualNumberOfTravelers.split("\n")[1].split(" ")[0].trim());

    expect(actualNumberOfTravelers, 'Actual number of travels does NOT match expected number of travelers').to.equal(expectedNumOfTravelers);

    
});



When (/^I select '(Español \(Estados Unidos\)|English \(United States\))' in Language dropdown$/, async function(language){

    
    await homePage.selectLanguageFromLanguageSelectorDropdown(language);


});

Then (/^I verify '(Español|English)' is displayed$/, async function (language){

    let elementIsDisplayed = await homePage.isLanguageDisplayed(language);

    expect(elementIsDisplayed, 'Language is NOT displayed as expected').to.be.true;

});

When (/^I select '(.+)' from auto-suggestions$/, async function(destination){

     await homePage.selectFromSuggestedDestinations(destination);

});

When (/^I enter '(Check-in|Check-out)' date as '(.+)'$/, async function (actionType, date){

    //date must be formatted as e.g., December 5 2022 -- Can a regular expression be written to restrict format?

    switch(actionType.toLowerCase()){
        case 'check-in':
            await homePage.selectCheckInDate(date);
            break;
        case 'check-out':
            await homePage.selectCheckOutDate(date);
            break;
        default:
            break;        
    }

});

When (/^I click on '(1|2|3|4|5)' stars from Star rating filter$/, async function (numStars){

    await homePage.selectStarRatingFilterBtn(numStars);

});

Then (/^I verify '(Children plus|Children minus)' button is '(enabled|disabled)' for '(0|1|2|3|4|5|6)'$/, async function (buttonType, btnStatus, numChildren){

    let isEnabled = false;
    numChildren = Number(numChildren);
    let minNumOfChildren = await homePage.getMinNumOfChildren();
    let maxNumOfChildren = await homePage.getMaxNumOfChildren();



    switch(buttonType.toLowerCase()){
        case 'children plus':
            isEnabled = await homePage.isNumChildrenIncreaseButtonParentEnabled();
            if (numChildren >= minNumOfChildren && numChildren < maxNumOfChildren ){
                expect(isEnabled, 'Children plus button is NOT enabled').to.be.true;
            }else if (numChildren == maxNumOfChildren){
                expect(isEnabled, 'Children plus button IS enabled').to.be.false;
            }
            break;
        case 'children minus':
            isEnabled = await homePage.isNumChildrenDecreaseButtonParentEnabled();
            if (numChildren > minNumOfChildren && numChildren <= maxNumOfChildren ){
                expect(isEnabled, 'Children minus button is NOT enabled').to.be.true;
            }else if (numChildren == minNumOfChildren){
                expect(isEnabled, 'Children minus button IS enabled').to.be.false;
            }

            break;
        default:
            break;           
    }

});


// When(/^I type '(.+)' in destination$/, async function(destination){

//     await homePage.enterDestination(destination);

//     await browser.pause(2000);

    


// });



// When (/^I select number of adults in Room 1 as 1$/, async function ( ) {

//     homePage.clickTravelersSelectionButton();

    
//     let numAdults = await homePage.getNumOfAdults();
//     console.log(`\n\nnumAdults -> ${numAdults}`);
    
//     while(numAdults > 1){
//         console.log(`\n\nnumAdults -> ${numAdults}`);
//         homePage.clickNumAdultsDecreaseButton();
//         numAdults = await homePage.getNumOfAdults();
//     }
//     console.log(`\n\nnumAdults -> ${numAdults}`);
//     console.log('Out of loop');
     

//     await browser.pause(5000); 
    

// });

// Then (/^I verify the minus button for adults is disabled$/, async function(){

//     expect(await homePage.isNumAdultsDecreaseButtonParentEnabled(), 'Number of Adults Decrease Button is NOT disabled').to.be.false;
    

// });

// Then (/^I verify the plus button for adults is enabled$/, async function(){

//     expect(await homePage.isNumAdultsIncreaseButtonEnabled(), 'Number of Adults Increase Button is NOT enabled').to.be.true;
    

// });

// When (/^I select number of adults in Room 1 as 14$/, async function ( ) {

    
//     let numAdults = await homePage.getNumOfAdults();
//     console.log(`\n\nnumAdults -> ${numAdults}`);

   

//     while(numAdults < 14){
//         console.log(`\n\nnumAdults -> ${numAdults}`);
//         homePage.clickNumAdultsIncreaseButton();
//         numAdults = await homePage.getNumOfAdults();
//     }
//     console.log(`\n\nnumAdults -> ${numAdults}`);
//     console.log('Out of loop');
     

//     await browser.pause(5000); 
    

// });

// Then (/^I verify the plus button for adults is disabled$/, async function(){

//     expect(await homePage.isNumAdultsIncreaseButtonParentEnabled(), 'Number of Adults Increase Button is NOT disabled').to.be.false;
    

// });

// Then (/^I verify the minus button for adults is enabled$/, async function(){

//     expect(await homePage.isNumAdultsDecreaseButtonEnabled(), 'Number of Adults Decrease Button is NOT enabled').to.be.faltruese;
    

// });

