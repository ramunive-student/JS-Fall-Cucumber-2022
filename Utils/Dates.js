const moment = require("moment/moment");

class Dates {

    static getCurrentDate() {
        const now = moment();
        return now.format('D');
    }

    static getCurrentMonthNameInShort() {
        const now = moment();
        return now.format('MMM');
    }

    static getCurrentMonthNameInFull(){
        const now = moment();
        return  now.format('MMMM');
    }

    static getCurrentYearInYYYY() {
        const now = moment();
        return now.format('YYYY');
    }

    static getCurrentHour(){
        const now = moment();
        return now.format('h');
    }

    static isDateValid(dateToCheck, format){

        let validDate = false;
    

        let expectedDate = moment(dateToCheck);
        const isValid = expectedDate.isValid();
        expectedDate = expectedDate.format('MM/DD/YY');
        let isEqual = dateToCheck.localeCompare(expectedDate) === 0;

        if (isValid && isEqual){
            validDate = true;
        }
        
        return validDate;

    }

    static isDateValid2(dateToCheck, format){

        let validDate = false;
    

        let expectedDate = moment(dateToCheck);
        const isValid = expectedDate.isValid();
        expectedDate = expectedDate.format('DD MMMM, YYYY');
        let isEqual = dateToCheck.localeCompare(expectedDate) === 0;

        if (isValid && isEqual){
            validDate = true;
        }
        
        return validDate;

    }



}
module.exports = Dates;