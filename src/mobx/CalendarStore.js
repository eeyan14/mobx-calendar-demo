import { makeObservable, observable, computed, action } from "mobx";
import { DateTime } from "luxon";
import { DATE_FORMAT, getEventsOnDate, formatTitle } from "../helpers";

class CalendarStore {
    view = "month";
    currentDate = DateTime.now().toFormat(DATE_FORMAT);
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
        return formatTitle(this.view, this.currentDate);
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
            const dateObj = DateTime.fromFormat(date, DATE_FORMAT);
            events[date] = getEventsOnDate(dateObj);
        });
        this.setEvents(events);
    };
}

export default CalendarStore;
