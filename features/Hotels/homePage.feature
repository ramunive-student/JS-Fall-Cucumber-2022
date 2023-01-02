@hotels
Feature: Hotels HomePage testcases

@hotels-auto-suggestions
Scenario: Pick value from auto-suggestion
    Given I am on hotels
    When I type 'nEw' in destination
    Then I select "Manhattan" from auto-suggestions

@codeTest @codeTest-2
Scenario: Verify limit for adults count in a room
    Given I am on hotels
    When I select number of adults in Room 1 as 1
    Then I verify the minus button for adults is disabled
    Then I verify the plus button for adults is enabled
    When I select number of adults in Room 1 as 14
    Then I verify the plus button for adults is disabled
    #Then I verify the minus button for adults is enabled





