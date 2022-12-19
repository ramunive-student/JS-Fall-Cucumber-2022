@hotels
Feature: List Your Property

@hotels-ListProperty-Lodging
Scenario: Verify user is able to list their property - Lodging
    Given I am on hotels
    When I click on List Your Property link
    And I click on "Lodging" button
    And I enter "1 City Hall Place" in the text box
    And I select "Pueblo" from the auto-suggestions 
    






    # Do 2 testcases - 1 for loging and 1 for private residence

@hotels-ListProperty-PrivateResidence
Scenario: Verify user is able to list their property - Private residence


