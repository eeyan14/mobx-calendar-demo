import React, { useState } from "react";
import { DateTime } from "luxon";
import {
    ViewContext,
    CurrentDateContext,
    EventsContext,
} from "./CalendarContext";
import Calendar from "../views/Calendar";
import MonthWrapper from "./MonthWrapper";
import DayWrapper from "./DayWrapper";
import WeekWrapper from "./WeekWrapper";
import { DATE_FORMAT, formatTitle, getEventsOnDate } from "../helpers";

const CalendarWrapper = () => {
    const [view, setView] = useState("month");
    const [currentDate, setCurrentDate] = useState(
        DateTime.now().toFormat(DATE_FORMAT)
    );
    const [events, setEvents] = useState({});
    const calendarTitle = formatTitle(view, currentDate);

    const fetchEventsFromServer = (dates) => {
        const events = {};
        // We're just going to mock an API call, but theoretically you would
        // actually go fetch events from the server here
        dates.forEach((date) => {
            const dateObj = DateTime.fromFormat(date, DATE_FORMAT);
            events[date] = getEventsOnDate(dateObj);
        });
        setEvents(events);
    };

    const renderViews = () => {
        return (
            <>
                {view === "month" && (
                    <MonthWrapper setCurrentDate={setCurrentDate} />
                )}
                {view === "day" && (
                    <DayWrapper fetchEvents={fetchEventsFromServer} />
                )}
                {view === "week" && (
                    <WeekWrapper fetchEvents={fetchEventsFromServer} />
                )}
            </>
        );
    };

    const renderSidebar = () => {
        // TODO
    };

    return (
        <ViewContext.Provider value={view}>
            <CurrentDateContext.Provider value={currentDate}>
                <EventsContext.Provider value={events}>
                    <Calendar
                        calendarTitle={calendarTitle}
                        currentDate={currentDate}
                        view={view}
                        renderViews={renderViews}
                        renderSidebar={renderSidebar}
                        setCurrentDate={setCurrentDate}
                        setView={setView}
                    />
                    ;
                </EventsContext.Provider>
            </CurrentDateContext.Provider>
        </ViewContext.Provider>
    );
};

export default CalendarWrapper;
