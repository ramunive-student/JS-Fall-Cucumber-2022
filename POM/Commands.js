class Commands {




    /**
     * 
        setValue
        getText
        cilck
        $
        $$
        getAttribute
        isDisplayed
        isEnabled
        isSelected
        selectByVisibleText
        selectByAttribute
        selectByIndex
    
     */
    
        /**
         * Generic function to find webElement
         * input: string(locator)
         */
        async findWebElement(locator) {
            await $(locator).waitForDisplayed({
                timeout: 60000,
                timeoutMsg: 'WebElement is not displayed'
            })
            return await $(locator);
        }
    
        /**
         * Generic function to find webElements
         * input: string(locator)
         */
        async findAllWebElement(locator) {
            await browser.waitUntil(async () => {
                const totalElements = await $$(locator);
                return totalElements.length >= 1
            }, {
                timeout: 60000,
                timeoutMsg: 'No more than one element'
            });
            return await $$(locator);
        }
    
        /**
         * Generic function to enter data in a WebElement
         * name: typeInWebElement
         * input: string(dataToEnter), string(locator)
         */
        async typeInWebElement(locator, dataToEnter) {
            /*
                1. find the webElement
                2. if found, type in it
                3. otherwise, wait for 1-second then start from step-1
    
                do above flow for 30-seconds
            */
            await $(locator).waitForEnabled({
                timeout: 30000,
                timeoutMsg: 'Element is not enabled'
            });
            await $(locator).setValue(dataToEnter);
        }
    
        /**
         * Generic function to click a WebElement
         * name: clickWebElement
         * input: string(locator)
         */
        async clickWebElement(locator) {
            /*
                1. find the webElement
                2. if found, click it
                3. otherwise, wait for 1-second then start from step-1
    
                do above flow for 30-seconds
            */
            await $(locator).waitForClickable({
                timeout: 30000,
                timeoutMsg: 'Element is not clickable'
            });
            await $(locator).click();
        }
    
        /**
         * Generic function to find if field is enabled
         * name: isWebElementEnabled
         * input: string(locator)
         */
        async isWebElementEnabled(locator) {
            /*
                1. find the webElement
                2. if found, check if element is enabled
                3. otherwise, wait for 1-second then start from step-1
    
                do above flow for 30-seconds
            */
           await $(locator).waitForDisplayed({
                timeout:120000,
                timeoutMsg: 'Element is not enabled'
            });
            return await (await $(locator)).isEnabled();
        }
    
            /**
         * Generic function to find if field is displayed
         * name: isWebElementDisplayed
         * input: string(locator)
         */
        async isWebElementDisplayed(locator) {
           await $(locator).waitForDisplayed({
                timeout:120000,
                timeoutMsg: 'Element is not displayed'
            });
            return await (await $(locator)).isDisplayed();
        }
    
        /**
         * Generic function to find if field is selected
         * name: isWebElementSelected
         * input: string(locator)
         */
        async isWebElementSelected(locator) {
           await $(locator).waitForDisplayed({
                timeout:120000,
                timeoutMsg: 'Element is not displayed'
            });
            return await $(locator).isSelected();
        }
        /**
         * Generic function to get Text of a WebElement
         * name: getTextOfWebElement
         * input: string(locator)
         */
        async getTextOfWebElement(locator) {
            /*
                1. find the webElement
                2. if found, return Text
                3. otherwise, wait for 1-second then start from step-1
    
                do above flow for 30-seconds
            */
           await $(locator).waitForDisplayed({
                timeout:120000,
                timeoutMsg: 'Element is not displayed'
            });
            return await (await $(locator)).getText();
        }
    
        async getTextFromWebElement(element) {
            /*
                2. if found, return Text
                3. otherwise, wait for 1-second then start from step-1
    
                do above flow for 30-seconds
            */
                await $(element).waitForDisplayed({
                    timeout:120000,
                    timeoutMsg: 'Element is not displayed'
                });
            return await $(element).getText();
        }
    
        /**
         * Generic function to get Attribute value of a WebElement
         * name: getAttributeWebElement
         * input: string(locator), string(attrName)
         */
        async getAttributeWebElement(locator, attrName) {
            /*
                1. find the webElement
                2. if found, return attribute value
                3. otherwise, wait for 1-second then start from step-1
    
                do above flow for 30-seconds
            */
           await $(locator).waitForExist({
                timeout:120000,
                timeoutMsg: 'Element is not exist'
            });
            return await $(locator).getAttribute(attrName);
        }
    
        /**
         * Generic function to select data in dropdown (using Visible text)
         * name: selectDataInDropdown
         * input: locatorDropdown, valueWantToSelect
         */
        async selectDataInDropdown(locator, dataToSelect) {
            await $(locator).waitForDisplayed({
                timeout:120000,
                timeoutMsg: 'Element is not displayed'
            });
            const dropdown = await $(locator);
            await dropdown.selectByVisibleText(dataToSelect);
            
        }

        /**
         * Generic function to select data in dropdown (using value)
         * name: selectDataInDropdownByValue
         * input: locatorDropdown, valueWantToSelect
         */
        async selectDataInDropdownByAttribute(locator, attribute, dataToSelect) {
            await $(locator).waitForDisplayed({
                timeout:120000,
                timeoutMsg: 'Element is not displayed'
            });
            const dropdown = await $(locator);
            await dropdown.selectByAttribute(attribute, dataToSelect);
            
        }

        
    
        /**
         * Generic function to move mouse on any web-Element
         * name: moveMouseOn
         * input: locator
         */
        async moveMouseOn(locator) {
            await $(locator).waitForExist({
                timeout:120000,
                timeoutMsg: 'Element does not exist'
            });
            await $(locator).moveTo();
        }

        /**
         * Generic function to scroll to any web-Element
         * name: scrollToWebElement
         * input: locator
         */
        async scrollToWebElement (locator) {
            await $(locator).waitForExist({
                timeout:120000,
                timeoutMsg: 'Element does not exist'
            });
            await $(locator).scrollIntoView();
        }

        
    
        /**
         * Generic function to get window handle
         * name: getHandle
         * 
         */  
        async getHandle() {
            return await browser.getWindowHandle();
        }
    
        /**
         * Generic function to get ALL window handle
         * name: getHandles
         * 
         */  
        async getHandles() {
            return await browser.getWindowHandles();
        }
    
        /**
         * Generic function to switch to a new handle
         * name: switchToWindowHandle
         * input: newHandle
         * 
         */  
        async switchToWindowHandle(newHandle) {
            return await browser.switchToWindow(newHandle);
        }
    
    
        /**
         * Generic function to select value from auto-suggestion using getText
         * name: selectFromAutoSuggestion
         * input: locator (for all suggestions), userLikeToSelect
         */
        async selectFromAutoSuggestion(locator, userLikeToSelect) {
            await browser.waitUntil(async () => {
                const totalSuggestions = await $$(locator);
                return totalSuggestions.length >= 1
            }, {
                timeout: 60000,
                timeoutMsg: 'Number of auto-suggestions are not 1 or more'
            });
    
            const allSuggestions = await $$(locator);
            for (const suggestion of allSuggestions) {
                const webText = await suggestion.getText();
                if (webText.toLowerCase().localeCompare(userLikeToSelect.toLowerCase()) === 0) {
                    await suggestion.click();
                    break;
                }
            }
        }

        /**
         * Generic function to select partial value from auto-suggestion using getText
         * name: selectPartialFromAutoSuggestion
         * input: locator (for all suggestions), userLikeToSelect
         */
        async selectPartialFromAutoSuggestion(locator, userLikeToSelect) {
            await browser.waitUntil(async () => {
                const totalSuggestions = await $$(locator);
                return totalSuggestions.length >= 1
            }, {
                timeout: 60000,
                timeoutMsg: 'Number of auto-suggestions are not 1 or more'
            });
    
            const allSuggestions = await $$(locator);
            for (const suggestion of allSuggestions) {
                const webText = await suggestion.getText();
                console.log(`webText -> ${webText}`);
                if (webText.toLowerCase().includes(userLikeToSelect.toLowerCase())) {
                    await suggestion.click();
                    break;
                }
            }
        }
    
        /**
         * Generic function to select date from calendar using getAttribute
         * name: selectDateInCalendar
         * input: locator (for all dates), dateUserLikesToSelect
         */
        async selectDateInCalendar(locator, dateUserLikesToSelect) {
            await browser.waitUntil(async () => {
                const totalDates = await $$(locator);
                return totalDates.length >= 0
            }, {
                timeout: 60000,
                timeoutMsg: 'Number of dates in calendar are not more than 1'
            });
            const allDates = await $$(locator);     // [we1, we2, we3, we4, ...]
            
            for (const dateElement of allDates) {
                const dataDayValue = await dateElement.getAttribute('data-day');
                if (dataDayValue.localeCompare(dateUserLikesToSelect) === 0) {
                    await dateElement.click();
                    break;
                }
            }
        }
    
        async waitForNewWindow(countBefore) {
            await browser.waitUntil(async () => {
                const totalHandles = (await browser.getWindowHandles()).length;
                return countBefore+1 === totalHandles;
            }, {
                timeout: 60000,
                timeoutMsg: 'Number of windows are not as expected'
            });
        }

        async getPageTitle(){
            return await browser.getTitle();
        }

        async switchBrowserWindowUsingPageTitle(expectedTitle){
            const allHandles = await browser.getWindowHandles();
        
            let expectedHandle = '';
 
            for (let handle of allHandles){
        
                await browser.switchToWindow(handle);
                await browser.maximizeWindow();
            
       
                let title = await browser.getTitle();
                if (title.localeCompare(expectedTitle) === 0 ){
                    expectedHandle = handle;
                    break;
            }

            }
    
            return expectedHandle;
        
        }

        async switchBrowserWindowUsingPartialPageTitle(expectedPartialTitle){
            const allHandles = await browser.getWindowHandles();
        
            let expectedHandle = '';
 
            for (let handle of allHandles){
        
                await browser.switchToWindow(handle);
                await browser.maximizeWindow();
            
       
                let title = await browser.getTitle();

                if (title.startsWith(expectedPartialTitle)){
                    expectedHandle = handle;
                    break;
                }
                
            }
    
            return expectedHandle;
        
        }

        async getNumberOfOpenBrowserTabs(){

            const allHandles = await browser.getWindowHandles();

            return allHandles.length;
            
        }
    
    }
    module.exports = Commands;