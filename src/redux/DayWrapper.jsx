import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "./api/calendarActions";
import Day from "../views/Day";

const DayWrapper = () => {
    const dispatch = useDispatch();
    const { currentDate, events } = useSelector((state) => {
        return {
            currentDate: state.calendar.currentDate,
            events: state.calendar.events,
        };
    });

    // function needs to be memoized so that it doesn't re-create itself
    // on every re-render
    const fetchEvents = useCallback(
        (events) => {
            dispatch(getEvents(events));
        },
        [dispatch]
    );

    return (
        <Day
            currentDate={currentDate}
            events={events}
            fetchEvents={fetchEvents}
        />
    );
};

export default DayWrapper;
