Feature: Booking tickets
    Scenario: Booking one ticket
        Given user is on the booking page
        When user chooses a ticket
        Then the booking button for single ticket should be enabled

    Scenario: Booking a few tickets
        Given user is on the booking page
        When user chooses a few tickets
        Then the booking button should be enabled


    Scenario: Try to booking booked ticket
        Given user is on the booking page
        When user chooses a booked ticket
        Then the booking button should be disabled