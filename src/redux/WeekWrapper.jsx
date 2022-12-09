import React, { useCallback } from "react";
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

    const fetchEvents = useCallback(
        (events) => {
            dispatch(getEvents(events));
        },
        [dispatch]
    );

    return (
        <Week
            currentDate={currentDate}
            events={events}
            fetchEvents={fetchEvents}
        />
    );
};

export default WeekWrapper;
