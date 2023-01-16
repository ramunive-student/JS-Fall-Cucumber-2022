@hotels
Feature: Hotels HomePage testcases

Background:
    Given I am on hotels

@hotels-auto-suggestions @hotels-homepage
Scenario: Pick value from auto-suggestion
    When I type 'nEw' in destination
    Then I select "Manhattan" from auto-suggestions

@codeTest @codeTest-2 @hotels-homepage
Scenario: Verify limit for adults count in a room
    When I select number of adults in Room 1 as 1
    Then I verify the minus button for adults is disabled
    Then I verify the plus button for adults is enabled
    When I select number of adults in Room 1 as 14
    Then I verify the plus button for adults is disabled
    #Then I verify the minus button for adults is enabled

@TC-17 @hotels-homepage @Project1
Scenario: Verify past dates and back button on current mont's calendar is disabled
    When I click on 'Dates' button
    And I go to current month if not displayed
    Then I verify past dates are disabled for the current month
    Then I verify the back button is disabled for the current month

@TC-30 @hotels-homepage @Project1
Scenario: Verify invalid phone number error
    When I scroll to 'Get the app' button  
    And I enter '0000000000' in 'Phone number'
    And I click on 'Get the app' button
    Then I verify 'Please enter a valid phone number.' error message is displayed 

@TC-18 @hotels-homepage @Project1
Scenario: Verify user can update number of guests on home HomePage
    When I click on 'Travelers' button
    And I select 'Adults' as '6'
    And I select 'Children' as '3'
    And I select 'first' child age: '4'
    And I select 'second' child age: 'Under 1'
    And I select 'third' child age: '7'
    And I click on 'Travelers Done' button
    Then I verify total number of travelers is sum of adults selected and children selected 

@TC-31 @hotels-homepage @Project1
Scenario: Verify language can be changed successfully
    When I click on 'English language' button
    And I select 'Español (Estados Unidos)' in Language dropdown
    And I click on 'language selector Save' button
    Then I verify 'Español' is displayed
    When I click on 'Español language' button
    And I select 'English (United States)' in Language dropdown
    And I click on 'language selector Guardar' button
    Then I verify 'English' is displayed

@TC-23 @hotels-homepage @Project1
Scenario Outline: Verify filter-by and soft-by functionality works as expected
    When I enter 'Manhattan, NY' in 'Going to'
    And I select 'Manhattan' from auto-suggestions
    And I click on 'Dates' button
    And I enter 'Check-in' date as 'February 10 2023'
    And I enter 'Check-out' date as 'February 16 2023'
    And I click on 'date selector Done' button
    And I click on 'Search' button
    And I click on '<numStars>' stars from Star rating filter
    And I select '<sortBy>' from sort-by dropdown
    Then I verify all hotels in search results are '<numStars>' star rated

    Examples:
        |numStars|sortBy|
        |5|Price|
        #|4|Price|
        #|3|Price|
        #|2|Price|
        #|1|Price|

 @TC-28 @hotels-homepage @Project1  
 Scenario Outline: Verify child age drwopdowns are same as number of children selected
    When I click on 'Travelers' button
    And I select 'Children' as '<numChildren>'
    Then I verify the number of 'Children-age dropdowns' displayed are '<numChildren>'
    And I verify 'Children plus' button is '<plusBtnStatus>' for '<numChildren>'
    And I verify 'Children minus' button is '<minusBtnStatus>' for '<numChildren>'




    Examples:
    |numChildren|plusBtnStatus|minusBtnStatus|
    |2|enabled|enabled|
    |6|disabled|enabled|
    |5|enabled|enabled|
    |0|enabled|disabled|
    





    



















