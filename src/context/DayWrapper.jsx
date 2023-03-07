import React, { useContext } from "react";
import { CurrentDateContext, EventsContext } from "./CalendarContext";
import Day from "../views/Day";

const DayWrapper = (props) => {
    const currentDate = useContext(CurrentDateContext);
    const events = useContext(EventsContext);

    return (
        <Day
            currentDate={currentDate}
            events={events}
            fetchEvents={props.fetchEvents}
        />
    );
};

export default DayWrapper;
