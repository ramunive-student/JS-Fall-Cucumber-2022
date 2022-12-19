@hotels
Feature: Hotels HomePage testcases

@hotels-auto-suggestions
Scenario: Pick value from auto-suggestion
    Given I am on hotels
    When I type 'nEw' in destination
    Then I select "Manhattan" from auto-suggestions


