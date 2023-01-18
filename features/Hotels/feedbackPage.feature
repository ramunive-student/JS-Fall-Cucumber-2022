@hotels
Feature: Hotels feedback page testcases

Background:
    Given I am on hotels

@TC-25 @hotels-feedback-page @Project1
Scenario: Verify user can submit feedback after completing the feedback form
    When I click on 'Sign in' link
    And I click on 'Feedback' link
    And I select a '5' star rating
    And I enter 'Good Job!' in the Page Comments
    And I select 'Somewhat likely' from 'How likely are you to return' dropdown
    And I select 'No' for 'Prior to this visit, have you ever booked on Hotels.com'
    And I select 'Yes' for 'Did you accomplish what you wanted to do on this page'
    And I click on 'Feedback Submit' button
    Then I verify 'THANK YOU FOR YOUR FEEDBACK.' is displayed for 'feedback header'

@TC-24 @hotels-feedback-page @Project1
Scenario: Verify error is displayed when user submits the empty feedback from
    When I click on 'Sign in' link
    And I click on 'Feedback' link
    And I click on 'Feedback Submit' button
    Then I verify 'Please fill in the required information highlighted below.' is displayed for 'feedback submission error message'
    Then I verify star boxes section is in a red dotted box
    



    


