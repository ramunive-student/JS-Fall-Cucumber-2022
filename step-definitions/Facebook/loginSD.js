//Glue Code

const { SUPPORTED_BROWSER_RUNNER_PRESETS } = require("@wdio/cli/build/constants");
const { Given } = require("@wdio/cucumber-framework");

/**
 * Glue code is a regular expression which helps to map Scenario-steps
 */
Given(/^I am on facebook$/, async function () {
    await browser.url('/');
    await browser.pause(5000);
});