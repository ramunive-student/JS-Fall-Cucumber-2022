#@signUp @regression
#Feature: Sign Up

#    Background:
#        Given I am on facebook
#        When I click on Create New Account

#    @imp @signUp-1
#    Scenario: Verify current date is displayed on Sign-Up form
#        Then I verify current date is displayed in birthdate dropdown

#    @signup-2 @gender @sanity @smoke
#    Scenario: Verify no gender button is selected
#        Then I verify female radio button is not selected
#        And I verify male radio button is not selected
#        And I verify custom radio button is not selected

#    @signup-3 @sanity @smoke
#    Scenario: Verify user gets error if already registered
#        And I enter "John" in firstname
#        And I enter "Doe" in laststname
#        And I enter "9879879870" in mobile number or email
#        And I enter "abcd@1234" in new password
#        And I enter "abcd@1234" in confirm new password
#        And I enter "12 Dec 1990" in date of birth
#        And I enter "female" in gender
#        And I click submit button