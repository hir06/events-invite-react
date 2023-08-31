import { eventsInvitation } from "../types/eventsForPartners.types";

// Function to group partners by country and sort their available dates
function groupPartnersByCountry(partners: eventsInvitation.partner[]): { [key: string]: eventsInvitation.partner[] } {
    const countries: { [key: string]: eventsInvitation.partner[] } = {};
    partners.forEach(partner => {
        if (!countries[partner.country]) {
            countries[partner.country] = [];
        }
        partner.availableDates.sort();
        countries[partner.country].push(partner);
    });
    return countries;
}

// Function to find the best date for each country
function findBestDateForCountry(partners: eventsInvitation.partner[]): eventsInvitation.CountryResult {
    const dates: { [key: string]: string[] } = {};
    let bestDate: string | null = null;
    let maxCount = 0;

    partners.forEach(partner => {
        for (let i = 0; i < partner.availableDates.length - 1; i++) {
            const date1 = partner.availableDates[i];
            const date2 = partner.availableDates[i + 1];

            // Check if the dates are consecutive
            if (new Date(date2).getTime() - new Date(date1).getTime() === 24 * 60 * 60 * 1000) {
                if (!dates[date1]) {
                    dates[date1] = [];
                }
                dates[date1].push(partner.email);

                if (dates[date1].length > maxCount) {
                    maxCount = dates[date1].length;
                    bestDate = date1;
                }
            }
        }
    });

    return {
        attendeeCount: maxCount,
        attendees: bestDate ? dates[bestDate] : [],
        name: partners[0].country,
        startDate: bestDate
    };
}

export function findBestDatesForEvents(partners: eventsInvitation.partner[]): { countries: eventsInvitation.CountryResult[] } {
    const countries = groupPartnersByCountry(partners);
    const results: eventsInvitation.CountryResult[] = [];

    for (let country in countries) {
        const countryResult = findBestDateForCountry(countries[country]);
        results.push(countryResult);
    }

    return { countries: results };
}
