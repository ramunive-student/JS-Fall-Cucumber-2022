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

    


}
module.exports = Dates;