import { makeObservable, observable, computed, action } from "mobx";
import { DateTime } from "luxon";

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

class CalendarStore {
    view = "month";
    currentDate = DateTime.now().toFormat("yyyy-LL-dd");
    events = {};

    constructor(view, currentDate, events) {
        makeObservable(this, {
            view: observable,
            currentDate: observable,
            events: observable,
            calendarTitle: computed,
            setView: action,
            setCurrentDate: action,
            setEvents: action,
            fetchEventsFromServer: action,
        });

        this.view = view;
        this.currentDate = currentDate;
        this.events = events;
    }

    get calendarTitle() {
        const dateObj = DateTime.fromFormat(this.currentDate, "yyyy-LL-dd");
        let title = dateObj.toFormat("LLLL");
        if (this.view === "day") {
            title = dateObj.toFormat("LLLL d");
        } else if (this.view === "week") {
            // startOf / endOf goes to the nearest Monday / Saturday, so subtract 1
            // to view Sunday – Saturday
            const weekStart = dateObj.startOf("week").minus({ days: 1 });
            const weekEnd = dateObj.endOf("week").minus({ days: 1 });
            if (weekStart.toFormat("LLLL") !== weekEnd.toFormat("LLLL")) {
                title = `${weekStart.toFormat("LLLL d")} – ${weekEnd.toFormat(
                    "LLLL d"
                )}`;
            } else {
                title = `${weekStart.toFormat("LLLL d")} – ${weekEnd.toFormat(
                    "d"
                )}`;
            }
        }
        return title;
    }

    // use arrow functions for setter functions to access `this`
    setView = (view) => {
        this.view = view;
    };

    setCurrentDate = (currentDate) => {
        console.log("erm", currentDate, this);
        this.currentDate = currentDate;
    };

    setEvents = (events) => {
        this.events = {
            ...this.events,
            ...events,
        };
    };

    fetchEventsFromServer = (dates) => {
        const events = {};
        // We're just going to mock an API call, but theoretically you would
        // actually go fetch events from the server here
        dates.forEach((date) => {
            const dateObj = DateTime.fromFormat(date, "yyyy-LL-dd");
            events[date] = getEventsOnDate(dateObj);
        });
        this.setEvents(events);
    };
}

export default CalendarStore;
