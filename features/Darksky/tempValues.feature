@darksky
Feature: Temperature Values

@darksky-1
Scenario: Verify feelsLikeTempValue is in between lowTempValue and highTempValue
    Given I am on darksky
    When I enter '85288' in the search box
    And I click on the search button
    Then I verify the feelsLikeTempValue is in between the lowTempValue and the highTempValue


@darksky-2
Scenario: Verify there are 12 data points with 2 hours gap on timeline
    Given I am on darksky
    Then I verify there are 12 data points with 2 hours gap on timeline
