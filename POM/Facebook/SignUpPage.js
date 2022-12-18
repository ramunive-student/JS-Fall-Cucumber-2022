const Commands = require('../Commands');

class SignUpPage {

    commands = new Commands();

    // Locators for web-Elements on the Sign-up page
    dayDropdownLocator = '#day';
    monthDropdownLocator = '#month';
    yearDropdownLocator = '#year';

    defaultSelectedInDateLocator = '//select[@id="day"]//option[@selected="1"]';
    defaultSelectedInMonthLocator = '//select[@id="month"]//option[@selected="1"]';
    defaultSelectedInYearLocator = '//select[@id="year"]//option[@selected="1"]';

    // signup form
    firstNameLocator = 'input[name=firstname]';
    lastNameLocator = 'input[name=lastname]';
    mobileEmailLocator = 'input[name=reg_email__]';
    newPasswordLocator = '#password_step_input';
    monthLocator = '#month';
    dayLocator = '#day';
    yearLocator = '#year';
    femaleLocator = '//label[text()="Female"]/following-sibling::*';
    maleLocator = '//label[text()="Male"]/following-sibling::*';
    customLocator = '//label[text()="Custom"]/following-sibling::*';
    signUpButtonLocator = 'button[name=websubmit]';

    // functions to interact with web-Elements on sign-up page
    async getDefaultSelectedDate() {
        return await this.commands.getTextOfWebElement(this.defaultSelectedInDateLocator);
    }

    async getDefaultSelectedMonth() {
        return await this.commands.getTextOfWebElement(this.defaultSelectedInMonthLocator);
    }

    async getDefaultSelectedYear() {
        return await this.commands.getTextOfWebElement(this.defaultSelectedInYearLocator);
    }

    async  selectBirthDate(date) {
        await this.commands.selectDataInDropdown(this.dayDropdownLocator, date);
    }

    async selectBirthMonth(month) {
        await this.commands.selectDataInDropdown(this.monthDropdownLocator, month);
    }

    async selectBirthYear(year) {
        await this.commands.selectDataInDropdown(this.yearDropdownLocator, year);
    }

    async selectBirthData(birthDate) {
       const birthDateArray = birthDate.split(' ');
       await this.commands.selectDataInDropdown(this.dayDropdownLocator, birthDateArray[0]);
       await this.commands.selectDataInDropdown(this.monthDropdownLocator, birthDateArray[1]);
       await this.commands.selectDataInDropdown(this.yearDropdownLocator, birthDateArray[2]);
    }

    // example to use moveMouseOn in POM-functions
    async moveMouseOnBirthDate() {
        await this.commands.moveMouseOn(this.dayDropdownLocator);
    }

    async isGenderSelected(gender) {
        let isGenderSelected = true;
        switch (gender) {
            case 'female':
                isGenderSelected = await this.commands.isGenderSelected(this.femaleLocator);
                break;
            case 'male':
                isGenderSelected = await this.commands.isGenderSelected(this.maleLocator);
                break;
            case 'custom':
                isGenderSelected = await this.commands.isGenderSelected(this.customLocator);
                break;        
            default:
                break;
        }
        return isGenderSelected;
    }

    async selectGender(gender) {
        switch (gender.toLowerCase()) {
            case 'female':
                await this.commands.clickWebElement(this.femaleLocator);
                break;
            case 'male':
                await this.commands.clickWebElement(this.maleLocator);
                break;
            case 'custom':
                await this.commands.clickWebElement(this.customLocator);
                break;        
            default:
                break;
        }
    }

    async enterSignUpDataInField(data, fieldName) {
        switch (fieldName.toLowerCase()) {
            case 'firstname':
                await this.commands.typeInWebElement(this.firstNameLocator, data);
                break;
            case 'lastname':
                await this.commands.typeInWebElement(this.lastNameLocator, data);
                break;
            case 'mobile number or email':
                await this.commands.typeInWebElement(this.mobileEmailLocator, data);
                break;
            case 'new password':
                await this.commands.typeInWebElement(this.newPasswordLocator, data);
                break;
            case 'confirm new password':
                await this.commands.typeInWebElement(this.newPasswordLocator, data);
                break;
            case 'date of birth':
                await this.selectBirthData(data);
                break;
            case 'gender':
                await this.selectGender(data);
                break;        
            default:
                break;
        }
    }

    async clickSubmitButton() {
        await this.commands.clickWebElement(this.signUpButtonLocator);
    }
}
module.exports = SignUpPage;