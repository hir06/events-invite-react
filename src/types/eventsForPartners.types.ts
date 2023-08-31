
export namespace eventsInvitation {

    export interface partnersList {
        partners: partner[];
    }

    export interface partner {
        "firstName": string,
        "lastName": string,
        "email": string,
        "country": string,
        "availableDates": string[]
    }

    export interface datesForCountry {
        countries: CountryResult[];
     }
    export interface CountryResult {
        "attendeeCount": number,
        "attendees": string[],
        "name": string,
        "startDate": string | null
    }
}

