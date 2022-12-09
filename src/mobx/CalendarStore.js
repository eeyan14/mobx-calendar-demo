import { makeObservable, observable, computed, action } from "mobx";
import { DateTime } from "luxon";
import { getEventsOnDate } from "../helpers";

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
