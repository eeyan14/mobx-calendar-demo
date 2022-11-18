import React from "react";
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

    const fetchEvents = (events) => {
        dispatch(getEvents(events));
    };

    return (
        <Day
            currentDate={currentDate}
            events={events}
            fetchEvents={fetchEvents}
        />
    );
};

export default DayWrapper;
