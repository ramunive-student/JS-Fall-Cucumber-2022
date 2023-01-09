const Commands = require('../Commands');
const Dates = require('../../Utils/Dates');

class HomePage {

    commands = new Commands();

    // Locators for web-Elements on the HomePage (variables)
    // Destination
    goingToLocator = '//button[@aria-label="Going to"]';
    goingToTypeLocator = '#destination_form_field';
    autoSuggestionsLocator = '//div[@class="truncate"]//strong';
    listYourPropertyLinkLocator = '//div[text()="List your property"]';

    //Travelers
    travelersSelectionButtonLocator = '//button[@data-stid="open-room-picker"]';
    numAdultsDecreaseButtonLocator = '(//span[@class="uitk-step-input-button"])[1]';
    numAdultsDecreaseButtonLocatorParent = '(//span[@class="uitk-step-input-button"])[1]/parent::button';
    numOfAdultsLocator = '//input[@id="traveler_selector_adult_step_input-0"]';
    numAdultsIncreaseButtonLocator = '(//span[@class="uitk-step-input-button"])[2]';
    numAdultsIncreaseButtonLocatorParent = '(//span[@class="uitk-step-input-button"])[2]/parent::button';
    numOfChildrenLocator = '//input[@id="traveler_selector_children_step_input-0"]';
    numChildrenDecreaseButtonLocator = '(//span[@class="uitk-step-input-button"])[3]';
    numChildrenIncreaseButtonLocator = '(//span[@class="uitk-step-input-button"])[4]';
    childAgeSelectorLocator_starts = '//select[@id="age-traveler_selector_children_age_selector-0-';
    childAgeSelectorLocator_ends ='"]';
    travelersDoneButtonLocator = '//button[@id="traveler_selector_done_button"]';

    // Hotels.com App
    getTheAppButtonLocator = '//button[@id="submitBtn"]';
    phoneNumberInputBoxLocator = '//input[@id="phoneNumber"]';
    phoneNumberErrorMsgLocator = '//div[@id="phoneNumber-error"]';

    // Sign in
    signInButtonLocator = '//button[text()="Sign in"]';
    feedbackLinkLocator = '//a[text()="Feedback"]';



    // Calendar
    calendarOpenLocator = '#date_form_field-btn';
    
    allDatesLocator_starts = '//button[starts-with(@aria-label, "'
    allDatesLocator_ends = '")]'

    calendarDoneButtonLocator = '//button[text()="Done" and @data-stid]';
    nextCalendarButtonLocator = '(//button[@data-stid="date-picker-paging"])[2]';
    prevCalendarButtonLocator = '(//button[@data-stid="date-picker-paging"])[1]';
    leftSideCalendarHeaderLocator = '(//div[@class="uitk-date-picker-month"])[1]//h2';

    allDisabledDatesLocator_starts = '//button[starts-with(@aria-label, "';
    allDisabledDatesLocator_ends = '") and @disabled]';

    //Change language
    englishDefaultLanguageLocator = '//div[text()="English"]';
    spanishLanguageLocator = '//div[text()="Español"]';
    languageSelectorDropdownLocator = '//select[@id="language-selector"]';
    languageSelectorSaveBtnLocator = '//button[text()="Save"]';
    languageSelectorGuardarBtnLocator = '//button[text()="Guardar"]';


    // functions to interact with the web-Elements on the HomePage
    async enterDestination(destination) {
        await this.commands.clickWebElement(this.goingToLocator);
        await this.commands.typeInWebElement(this.goingToTypeLocator, destination);
    }

    async selectFromSuggestedDestinations(userChoice) {
        await this.commands.selectFromAutoSuggestion(this.autoSuggestionsLocator, userChoice);
    }

    async openCalendar() {
        await this.commands.clickWebElement(this.calendarOpenLocator);
    }

    async selectCheckInDate(date) {
        // date = "December 5 2022"
        // 'December', '5', '2022'
        const dateArray = date.split(' ');
        await this.goToMonth(`${dateArray[0]} ${dateArray[2]}`);
        const allDatesLocator = this.allDatesLocator_starts + date.substring(0,3) + this.allDatesLocator_ends;
        await this.commands.selectDateInCalendar(allDatesLocator, dateArray[1]);
    }

    async selectCheckOutDate(date) {
        const dateArray = date.split(' ');
        await this.goToMonth(`${dateArray[0]} ${dateArray[2]}`);
        const allDatesLocator = this.allDatesLocator_starts + date.substring(0,3) + this.allDatesLocator_ends;
        await this.commands.selectDateInCalendar(allDatesLocator, dateArray[1]);
    }

    async clickDoneOnCalendar() {
        await this.commands.clickWebElement(this.calendarDoneButtonLocator);
    }

    async clickToGoToNextCalendar() {
        await this.commands.clickWebElement(this.nextCalendarButtonLocator);
    }

    async clickToGoToPrevCalendar() {
        await this.commands.clickWebElement(this.prevCalendarButtonLocator);
    }

    async clickListYourPropertyLink() {
        await this.commands.clickWebElement(this.listYourPropertyLinkLocator);
    }

    // 'May 2023'
    async goToMonth(monthYear) {
        /**
         * using leftSideCalendarHeaderLocator get headerElement
         * find text of webElement
         * if (text NOT equal to monthYear) 
         *      click >
         */
        let count = 1;
        while(count<=12) {
            const monthHeader = await this.commands.getTextOfWebElement(this.leftSideCalendarHeaderLocator);
            console.log(`\n monthHeader -> ${monthHeader} \n`);
            if (monthHeader.localeCompare(monthYear) === 0) {
                break;
            }
            await this.commands.clickWebElement(this.nextCalendarButtonLocator);
            await browser.pause(1000);
            count++;
        }
    }

    async findNumberOfDisabledDatesForCurrentMonth( ){

        const currentMonth = await Dates.getCurrentMonthNameInShort();
        

        const leftSideCalendarHeader = await this.commands.getTextOfWebElement(this.leftSideCalendarHeaderLocator);
        if (!leftSideCalendarHeader.startsWith(currentMonth)){
            await this.clickToGoToPrevCalendar();
        }

        if (!leftSideCalendarHeader.startsWith(currentMonth)){
            await this.clickToGoToNextCalendar();
        }
        

        const allDisabledDatesLocator = this.allDisabledDatesLocator_starts + currentMonth + this.allDisabledDatesLocator_ends;
        const allDisabledDates = await this.commands.findAllWebElement(allDisabledDatesLocator);
        
        return allDisabledDates.length;
        
    }

    async goToCurrentMonthOfCalendar(){

        const currentMonth = await Dates.getCurrentMonthNameInShort();
        
        // Go to current month if not displayed

        const leftSideCalendarHeader = await this.commands.getTextOfWebElement(this.leftSideCalendarHeaderLocator);
        if (!leftSideCalendarHeader.startsWith(currentMonth)){
            await this.clickToGoToPrevCalendar();
        }

        if (!leftSideCalendarHeader.startsWith(currentMonth)){
            await this.clickToGoToNextCalendar();
        }

    }

    async clickTravelersSelectionButton() {
        await this.commands.clickWebElement(this.travelersSelectionButtonLocator);   
    
    }   

    async clickNumAdultsDecreaseButton() {
        await this.commands.clickWebElement(this.numAdultsDecreaseButtonLocator);   
    
    }

    async clickNumChildrenDecreaseButton() {
        await this.commands.clickWebElement(this.numChildrenDecreaseButtonLocator);   
    
    }

    async isNumAdultsDecreaseButtonEnabled() {
        return await this.commands.isWebElementEnabled(this.numAdultsDecreaseButtonLocator);   
    
    }

    async getNumOfAdults(){
        return await this.commands.getAttributeWebElement(this.numOfAdultsLocator, "value");
    }

    async getNumOfChildren(){
        return await this.commands.getAttributeWebElement(this.numOfChildrenLocator, "value");
    }


    async getMaxNumOfAdults(){
        return await this.commands.getAttributeWebElement(this.numOfAdultsLocator, "max");
    }

    async getMaxNumOfChildren(){
        return await this.commands.getAttributeWebElement(this.numOfChildrenLocator, "max");
    }

    async getMinNumOfAdults(){
        return await this.commands.getAttributeWebElement(this.numOfAdultsLocator, "min");
    }

    async getMinNumOfChildren(){
        return await this.commands.getAttributeWebElement(this.numOfChildrenLocator, "min");
    }

    async isNumAdultsDecreaseButtonParentEnabled() {
        return await $(this.numAdultsDecreaseButtonLocatorParent).isEnabled();   // This needs to be a function in commands, but I am running out of time
    
    }

    async isNumAdultsIncreaseButtonEnabled() {
        return await this.commands.isWebElementEnabled(this.numAdultsIncreaseButtonLocator);   
    
    }

    async clickNumAdultsIncreaseButton() {
        await this.commands.clickWebElement(this.numAdultsIncreaseButtonLocator);   
    
    }

    async clickNumChildrenIncreaseButton() {
        await this.commands.clickWebElement(this.numChildrenIncreaseButtonLocator);   
    
    }

    async isNumAdultsIncreaseButtonParentEnabled() {
        return await $(this.numAdultsIncreaseButtonLocatorParent).isEnabled();   // This needs to be a function in commands, but I am running out of time
    
    }

    async clickCalendarOpenButton() {
        await this.commands.clickWebElement(this.calendarOpenLocator);   
    
    }

    async isPreviousCalendarButtonEnabled(){
       return await this.commands.isWebElementEnabled(this.prevCalendarButtonLocator);

    }

    async scrollToGetTheAppButton(){
        await this.commands.scrollToWebElement(this.getTheAppButtonLocator);
    
    }

    async enterPhoneNumberForApp(phoneNumber){

        await this.commands.typeInWebElement(this.phoneNumberInputBoxLocator, phoneNumber);

    }
    async clickGetTheAppButton() {
        await this.commands.clickWebElement(this.getTheAppButtonLocator);   
    
    }

    async getPhoneNumberErrorMsgText(){
        return await this.commands.getTextFromWebElement(this.phoneNumberErrorMsgLocator);
    }
    
    async selectAgeFromChildAgeSelectorDropdown(childOrder, age){
        const childAgeSelectorLocator =  this.childAgeSelectorLocator_starts + childOrder + this.childAgeSelectorLocator_ends;

        await this.commands.selectDataInDropdown(childAgeSelectorLocator, age);
        
        
    }
    async clickTravelersDoneButton() {
        await this.commands.clickWebElement(this.travelersDoneButtonLocator);   
    
    }

    async getTextFromTravelersSelectionButton (){
        return await this.commands.getTextFromWebElement(this.travelersSelectionButtonLocator);
    }
    async clickSignInButton() {
        await this.commands.clickWebElement(this.signInButtonLocator);   
    
    }

    async clickFeedbackLink(){
        await this.commands.clickWebElement(this.feedbackLinkLocator);
    }

    async clickEnglishDefaultLanguage (){
        await this.commands.clickWebElement(this.englishDefaultLanguageLocator);
    }

    async clickSpanishLanguage (){
        await this.commands.clickWebElement(this.spanishLanguageLocator);
    }

    async selectLanguageFromLanguageSelectorDropdown(languageToSelect){
        

        await this.commands.selectDataInDropdown(this.languageSelectorDropdownLocator, languageToSelect);
        
        
    }

    async clickLanguageSelectorSaveBtn(){
        await this.commands.clickWebElement(this.languageSelectorSaveBtnLocator);
    }

    async isLanguageDisplayed(language){

        let elementIsDisplayed = false; 

        switch(language){
            case 'Español':
                elementIsDisplayed = await this.commands.isWebElementDisplayed(this.spanishLanguageLocator);
                break;
            case 'English':
                elementIsDisplayed = await this.commands.isWebElementDisplayed(this.englishDefaultLanguageLocator);
                break;
            default:
                elementIsDisplayed = false;
                break;        
    
        }

        return elementIsDisplayed;
    }

    async clickLanguageSelectorGuardarBtn(){
        await this.commands.clickWebElement(this.languageSelectorGuardarBtnLocator);
    }

    


    





}
module.exports = HomePage;