const { When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');
const FeedbackPage = require('../../POM/Hotels/FeedBackPage');

const feedbackPage = new FeedbackPage();


//Given (/^I am on facebook$/, async function (){
//    await browser.url('/');
// });

When (/^I select a '(1|2|3|4|5)' star rating$/, async function (numStars){

    
    switch(numStars){
        case '1':
            await feedbackPage.clickOneStarRadioBtn();
            break;
        case '2':
            await feedbackPage.clickTwoStarRadioBtn();
            break;
        case '3':
            await feedbackPage.clickThreeStarRadioBtn();
            break;
        case '4':
            await feedbackPage.clickFourStarRadioBtn();
            break;
        case '5':
            await feedbackPage.clickFiveStarRadioBtn();
            break;
        default:
            break;                    
    }

});

When (/^I enter '(.+)' in the Page Comments$/, async function (textToEnter){

    await feedbackPage.enterTextInPageCommentsTextArea(textToEnter);

});

When (/^I select '(Highly likely|Somewhat likely|Unsure|Somewhat unlikely|Highly unlikely)' from 'How likely are you to return' dropdown$/, async function (optionToSelect){

    optionToSelect = optionToSelect.toLowerCase();
    optionToSelect = optionToSelect.substring(0,1).toUpperCase() + optionToSelect.substring(1);

    feedbackPage.selectOptionFromWillYouReturnDropDown(optionToSelect);
    await browser.pause(5000);
    
});

When (/^I select '(Yes|No)' for 'Prior to this visit, have you ever booked on Hotels.com'$/, async function (choice){

    switch(choice.toLowerCase()){
        case 'yes':
            await feedbackPage.clickBookedHereBeforeYesRadioBtn();
            break;
        case 'no':
            await feedbackPage.clickBookedHereBeforeNoRadioBtn();
            break;
        default:
            break;        
    }


});

When (/^I select '(Yes|No)' for 'Did you accomplish what you wanted to do on this page'$/, async function (choice){

    switch(choice.toLowerCase()){
        case 'yes':
            await feedbackPage.clickWereYouSuccessfulYesRadioBtn();
            break;
        case 'no':
            await feedbackPage.clickWereYouSuccessfulNoRadioBtn();
            break;
        default:
            break;        
    }

});

Then (/^I verify '(.+)' is displayed for '(.+)'$/, async function (expectedText, messageType){

    let actualText = '';

    switch(messageType.toLowerCase()){
        case 'feedback header':
            actualText = await feedbackPage.getTextFromThankYouForYourFeedbackMsgHeader();
            expect(actualText, 'Feedback thank you message header is NOT as expected').to.equal(expectedText);
            break;
        case 'feedback submission error message':
            actualText = await feedbackPage.getTextFromFeedbackSubmissionErrorMsg();
            expect(await feedbackPage.isFeedbackErrorMsgDisplayed(), 'Feedback error submission message is NOT displayed').to.be.true;
            expect(actualText, 'Feedback submission error message is NOT as expected').to.equal(expectedText);    
        default:
            break;    
    }




});

Then (/^I verify star boxes section is in a red dotted box$/, async function(){

    let isDisplayed = await feedbackPage.isRedDottedLineAroundStarBoxAfterFeedbackSubmissionErrorDisplayed();
    expect(isDisplayed, 'Star boxes section is NOT in a red dotted box').to.be.true;

});



