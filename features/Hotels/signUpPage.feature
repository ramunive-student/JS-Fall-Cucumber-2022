@hotels
Feature: Hotels SignUp Page testcases

Background:
    Given I am on hotels
    When I click on 'Sign in' link
    And I click on 'Sign up' link

@TC-20 @hotels-signUpPage @Project1
Scenario: Verify TermsAndConditions link and PrivacyStatements link open correct page on new tab
    
    And I click on 'Terms and Conditions' link
    Then I verify 'Terms and Conditions' page opens in new tab
    Then I verify 'Last revised' date format is MM/DD/YY
    When I click on 'Privacy Statement' link
    Then I verify 'Privacy Statement' page opens in new tab
    Then I verify 'Last Updated' date format is DD MMMM, YYYY 

@TC-22 @hotels-signUpPage @Project1  
Scenario: Verify error message for invalid data in SignUp format
    
    And I enter invalid email address with at least @ symbol - enter w!@###
    Then I verify 'Enter a valid email.' error message is displayed
    When I enter invalid (cannot contain special characters) 'first name' - enter !@
    Then I verify 'First name cannot contain special characters' error message is displayed
    When I enter invalid (cannot contain special characters) 'last name' - enter %^&
    Then I verify 'Last name cannot contain special characters' error message is displayed
    When I enter 'abc123' in Sign up form 'password' field
    Then I verify 'Keep me signed in' checkbox is displayed
    And I verify 'Keep me signed in' checkbox is enabled
    And I verify 'Continue' button is displayed
    And I verify 'Continue' button is enabled
    
 @TC-32 @hotels-signUpPage @Project1
 Scenario Outline: Verify password strength bar and messages
    
    And I enter 'user@test.com' in 'Signup email address'
    And I enter 'fUser' in 'First name'
    And I enter 'lUser' in 'Last name'
    And I enter '<password>' in 'Signup Password'
    Then I verify Password strength bar is <strengthBar> filled and Password strength message is <strengthMsg>

    Examples:
    |password|strengthBar|strengthMsg|
    |abcd|not|Weak|
    |abcd@123|half|Weak|
    |abcd@12324|almost|Strong|
    |abcd@12@pl@2|completely|Very Strong|

@TC-33 @hotels-signUpPage @Project1
Scenario Outline: Verify weak password messages
    
    And I enter 'user@test.com' in 'Signup email address'
    And I enter 'fUser' in 'First name'
    And I enter 'lUser' in 'Last name'
    And I enter '<password>' in 'Signup Password'
    Then I verify '<msg1>' weak password message is displayed
    And I verify '<msg2>' weak password message is displayed

    Examples:
    |password|msg1|msg2|
    |abcd|Includes 8-64 characters|Combines letters and numbers|
    |abcd@123|Add more words that are less common.|Avoid common character sequences.|


    









    
