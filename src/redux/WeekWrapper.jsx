import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "./api/calendarActions";
import Week from "../views/Week";

const WeekWrapper = () => {
    const dispatch = useDispatch();
    const { currentDate, events } = useSelector((state) => {
        return {
            currentDate: state.calendar.currentDate,
            events: state.calendar.events,
        };
    });

    const fetchEvents = (events) => {
        dispatch(getEvents(events));
    };

    return (
        <Week
            currentDate={currentDate}
            events={events}
            fetchEvents={fetchEvents}
        />
    );
};

export default WeekWrapper;
