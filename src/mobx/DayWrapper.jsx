import React from "react";
import { observer } from "mobx-react-lite";
import Day from "../views/Day";

const DayWrapper = observer((props) => {
    const { currentDate, events, fetchEventsFromServer } = props.store;
    return (
        <Day
            currentDate={currentDate}
            events={events}
            fetchEvents={fetchEventsFromServer}
        />
    );
});

export default DayWrapper;
