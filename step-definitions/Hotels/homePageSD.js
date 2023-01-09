const { When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');
const { min } = require('moment/moment');
const FeedBackPage = require('../../POM/Hotels/FeedBackPage');
const HomePage = require('../../POM/Hotels/HomePage');
const Dates = require('../../Utils/Dates');


const homePage = new HomePage();
const feedbackPage = new FeedBackPage();

//Given (/^I am on facebook$/, async function (){
//    await browser.url('/');
// });


When (/^I click on '(.+)' (button|link)$/, async function (buttonType, elementType){

    switch(buttonType.toLowerCase()){
        case 'dates':
            await homePage.clickCalendarOpenButton();
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
        case 'sign in':
            await homePage.clickSignInButton();
            break;
        case 'feedback':
            await homePage.clickFeedbackLink();

            //switch browser to new page
            const expectedHandle = await feedbackPage.switchBrowserToFeedbackPage();
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

    switch(expectedErrorMsg.toLowerCase()){
        case 'please enter a valid phone number.':
            const actualErrorMsg = await homePage.getPhoneNumberErrorMsgText();
            expect(actualErrorMsg, 'Error message is NOT as expected').to.equal(expectedErrorMsg);
            break;    
        default:
            break;

    }


});

When (/^I enter '(.+)' in '(.+)'$/, async function(phoneNumber, textBox){


    switch(textBox.toLowerCase()){
        case 'phone number':
            await homePage.enterPhoneNumberForApp(phoneNumber);
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


// When(/^I type '(.+)' in destination$/, async function(destination){

//     await homePage.enterDestination(destination);

//     await browser.pause(2000);

    


// });

// Then(/^I select "(.+)" from auto-suggestions$/, async function(destination){

//     await homePage.selectFromSuggestedDestinations(destination);

//     await browser.pause(7000);

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

