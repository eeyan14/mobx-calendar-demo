import React, { useContext } from "react";
import { CurrentDateContext, EventsContext } from "./CalendarContext";
import Week from "../views/Week";

const WeekWrapper = (props) => {
    const currentDate = useContext(CurrentDateContext);
    const events = useContext(EventsContext);

    return (
        <Week
            currentDate={currentDate}
            events={events}
            fetchEvents={props.fetchEvents}
        />
    );
};

export default WeekWrapper;
