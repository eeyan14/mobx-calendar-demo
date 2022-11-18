import { DateTime } from "luxon";

/**
 * @param {String[]} dates array of strings in format "yyyy-LL-dd"
 *
 * @return {Object} keys = "yyyy-mm-dd", values = array of events
 *
 */
export const getEvents = (dates) => {
    const events = {};
    // We're just going to mock an API call, but theoretically you would
    // actually go fetch events from the server here
    dates.forEach((date) => {
        const dateObj = DateTime.fromFormat(date, "yyyy-LL-dd");
        events[date] = getEventsOnDate(dateObj);
    });
    return { type: "SET_EVENTS", events: events };
};

/**
 * @param {DateTime} date single DateTime object
 * @return {Array} list of events
 */
const getEventsOnDate = (date) => {
    let events = [];
    if ([1, 3].includes(date.weekday)) {
        events = [
            {
                start_hour: 8,
                start_min: 0,
                end_hour: 9,
                end_min: 0,
                description: "Lorem ipsum",
            },
            {
                start_hour: 10,
                start_min: 30,
                end_hour: 11,
                end_min: 0,
                description: "Lorem ipsum",
            },
            {
                start_hour: 14,
                start_min: 0,
                end_hour: 15,
                end_min: 0,
                description: "Lorem ipsum",
            },
        ];
    } else if ([2, 4, 5].includes(date.weekday)) {
        events = [
            {
                start_hour: 9,
                start_min: 0,
                end_hour: 9,
                end_min: 30,
                description: "Lorem ipsum",
            },
            {
                start_hour: 11,
                start_min: 30,
                end_hour: 12,
                end_min: 30,
                description: "Lorem ipsum",
            },
            {
                start_hour: 15,
                start_min: 30,
                end_hour: 16,
                end_min: 0,
                description: "Lorem ipsum",
            },
        ];
    } else {
        events = [
            {
                start_hour: 12,
                start_min: 0,
                end_hour: 12,
                end_min: 30,
                description: "Lorem ipsum",
            },
            {
                start_hour: 13,
                start_min: 0,
                end_hour: 13,
                end_min: 30,
                description: "Lorem ipsum",
            },
        ];
    }
    return events;
};
