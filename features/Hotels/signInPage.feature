@hotels
Feature: Hotels SignIn Page testcases

Background:
    Given I am on hotels

@TC-21 @hotels-signInPage @Project1
Scenario: Verify Verification message for invalid sign in credentials
    When I click on 'Sign in' link
    And I click on 'account Sign in' button
    And I enter 'abc@yahoo.com' in Sign in form 'email address' field
    And I enter 'abc123' in Sign in form 'password' field
    And I click on 'Sign in form Sign in' button
    Then I verify 'Email and password don't match. Please try again.' error message is displayed
    


    



