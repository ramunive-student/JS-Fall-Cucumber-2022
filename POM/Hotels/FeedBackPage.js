const Commands = require('../Commands');
const Dates = require('../../Utils/Dates');
//const HomePage = require('../Hotels/HomePage');
const { expect } = require('chai');


class FeedBackPage {

    commands = new Commands();


    // Locators for web-Elements on the feedback page (variables)

    oneStarRadioBtnLocator = '//div[@class="radio-button"]//label[@for="page-rating-1"]';
    twoStarRadioBtnLocator = '//div[@class="radio-button"]//label[@for="page-rating-2"]';
    threeStarRadioBtnLocator = '//div[@class="radio-button"]//label[@for="page-rating-3"]';
    fourStarRadioBtnLocator = '//div[@class="radio-button"]//label[@for="page-rating-4"]';
    fiveStarRadioBtnLocator = '//div[@class="radio-button"]//label[@for="page-rating-5"]';

    pageCommentsTextAreaLocator = '//textarea[@id="verbatim"]';

    willYouReturnDropDownLocator = '//select[@id="will-you-return"]';

    bookedHereBeforeYesRadioBtnLocator = '//div[@class="radio-button"]//label[@for="booked-here-before-yes"]';
    bookedHereBeforeNoRadioBtnLocator = '//div[@class="radio-button"]//label[@for="booked-here-before-no"]';

    wereYouSuccessfulYesRadioBtnLocator = '//div[@class="radio-button"]//label[@for="were-you-successful-yes"]';
    wereYouSuccessfulNoRadioBtnLocator = '//div[@class="radio-button"]//label[@for="were-you-successful-no"]';

    feedbackSubmitBtnLocator = '//button[@id="submit-button"]';

    thankYouForYourFeedbackMsgHeaderLocator = '//h5[text()="THANK YOU FOR YOUR FEEDBACK."]';

    feedbackSubmissionErrorMsgLocator = '//div[@id="required"]//p[text()="Please fill in the required information highlighted below."]';
    redDottedBoxSurroundingStarBoxAfterFeedbackSubmissionErrorLocator = '//fieldset[@id="required_box_page_rating" and contains(@style, "border")]';



   

    // functions to interact with the web-Elements on the feedback page

    async switchBrowserToFeedbackPage(){

        return await this.commands.switchBrowserWindowUsingPageTitle('DirectWord');
        
    }

    async clickOneStarRadioBtn() {
        await this.commands.clickWebElement(this.oneStarRadioBtnLocator);
    }

    async clickTwoStarRadioBtn() {
        await this.commands.clickWebElement(this.twoStarRadioBtnLocator);
    }

    async clickThreeStarRadioBtn() {
        await this.commands.clickWebElement(this.threeStarRadioBtnLocator);
    }

    async clickFourStarRadioBtn() {
        await this.commands.clickWebElement(this.fourStarRadioBtnLocator);
    }

    async clickFiveStarRadioBtn() {
        await this.commands.clickWebElement(this.fiveStarRadioBtnLocator);
    }

    async enterTextInPageCommentsTextArea(textToEnter){
        await this.commands.typeInWebElement(this.pageCommentsTextAreaLocator, textToEnter);
    }

    async selectOptionFromWillYouReturnDropDown (optionToSelect){
        await this.commands.selectDataInDropdown(this.willYouReturnDropDownLocator, optionToSelect);
    }

    async clickBookedHereBeforeYesRadioBtn() {
        await this.commands.clickWebElement(this.bookedHereBeforeYesRadioBtnLocator);
    }

    async clickBookedHereBeforeNoRadioBtn() {
        await this.commands.clickWebElement(this.bookedHereBeforeNoRadioBtnLocator);
    }

    async clickWereYouSuccessfulYesRadioBtn() {
        await this.commands.clickWebElement(this.wereYouSuccessfulYesRadioBtnLocator);
    }

    async clickWereYouSuccessfulNoRadioBtn() {
        await this.commands.clickWebElement(this.wereYouSuccessfulNoRadioBtnLocator);
    }

    async clickFeedbackSubmitBtn(){
        await this.commands.clickWebElement(this.feedbackSubmitBtnLocator);
    }

    async getTextFromThankYouForYourFeedbackMsgHeader (){
        return await this.commands.getTextFromWebElement(this.thankYouForYourFeedbackMsgHeaderLocator);

    }

    async getTextFromFeedbackSubmissionErrorMsg (){
        return await this.commands.getTextFromWebElement(this.feedbackSubmissionErrorMsgLocator);

    }

    async isFeedbackErrorMsgDisplayed(){
        return await this.commands.isWebElementDisplayed(this.feedbackSubmissionErrorMsgLocator);
    }

    async isRedDottedLineAroundStarBoxAfterFeedbackSubmissionErrorDisplayed(){
        return await this.commands.isWebElementDisplayed(this.redDottedBoxSurroundingStarBoxAfterFeedbackSubmissionErrorLocator);
    }

    




}
module.exports = FeedBackPage;