@hotels
Feature: Hotels HomePage testcases

Background:
    Given I am on hotels

@hotels-auto-suggestions
Scenario: Pick value from auto-suggestion
    When I type 'nEw' in destination
    Then I select "Manhattan" from auto-suggestions

@codeTest @codeTest-2
Scenario: Verify limit for adults count in a room
    When I select number of adults in Room 1 as 1
    Then I verify the minus button for adults is disabled
    Then I verify the plus button for adults is enabled
    When I select number of adults in Room 1 as 14
    Then I verify the plus button for adults is disabled
    #Then I verify the minus button for adults is enabled

@TC-17 @Project1
Scenario: Verify past dates and back button on current mont's calendar is disabled
    When I click on 'Dates' button
    And I go to current month if not displayed
    Then I verify past dates are disabled for the current month
    Then I verify the back button is disabled for the current month

@TC-30 @Project1
Scenario: Verify invalid phone number error
    When I scroll to 'Get the app' button  
    And I enter '0000000000' in 'Phone number'
    And I click on 'Get the app' button
    Then I verify 'Please enter a valid phone number.' error message is displayed 

@TC-18 @Project1
Scenario: Verify user can update number of guests on home HomePage
    When I click on 'Travelers' button
    And I select 'Adults' as '6'
    And I select 'Children' as '3'
    And I select 'first' child age: '4'
    And I select 'second' child age: 'Under 1'
    And I select 'third' child age: '7'
    And I click on 'Travelers Done' button
    Then I verify total number of travelers is sum of adults selected and children selected 

@TC-31 @Project1
Scenario: Verify language can be changed successfully
    When I click on 'English language' button
    And I select 'Español (Estados Unidos)' in Language dropdown
    And I click on 'language selector Save' button
    Then I verify 'Español' is displayed
    When I click on 'Español language' button
    And I select 'English (United States)' in Language dropdown
    And I click on 'language selector Guardar' button
    Then I verify 'English' is displayed
    



















