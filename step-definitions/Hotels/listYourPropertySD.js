const { When, Given } = require('@wdio/cucumber-framework');
const HomePage = require('../../POM/Hotels/HomePage');
const ListYourPropertyPage = require('../../POM/Hotels/ListYourPropertyPage');

const homePage = new HomePage();
const listYourPropertyPage = new ListYourPropertyPage();


//Given (/^I am on facebook$/, async function (){
//    await browser.url('/');
// });


When (/^I click on List Your Property link$/, async function () {

    await homePage.clickListYourPropertyLink();

});

When (/^I click on "(Lodging|Private residence)" button$/, async function (field){



        const allHandles = await browser.getWindowHandles();

        for(const handle of allHandles){
            await browser.switchToWindow(handle);
            const title = await browser.getTitle();
            if (title.startsWith('Property Info')){
                break;
            }
        }    

 
    switch(field.toLowerCase()){

        case 'lodging':
           listYourPropertyPage.clickLodgingButton();
            break;
        case 'private residence':
            break;
        default:
            break;    

    }



});

When (/^I enter "(.*)" in the text box$/, async function (address){
    listYourPropertyPage.typeInPropertyLocationInputBox(address);
    await browser.pause(5000);
    
    
});

When (/^I select "(.+)" from the auto-suggestions$/, async function (location){
    listYourPropertyPage.selectFromSuggestedLocations(location);
    await browser.pause(5000);
    

});

