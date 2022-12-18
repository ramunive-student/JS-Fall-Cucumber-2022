@hotels
Feature: Test calendar features of hotels.com

@hotels-select-date-from-calendar
Scenario: Select dates from any calendar
    Given I am on hotels
    Then I select "May 25 2023" as Check-in
    And I select "June 5 2023" as Check-out
    And I click Done button 

@hotels-past-dates
Scenario: Verify the past dates are disabled in calendar
    Given I am on hotels
    Then I verify that past dates are disabled in calendar
