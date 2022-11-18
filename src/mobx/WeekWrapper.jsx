import React from "react";
import { observer } from "mobx-react-lite";
import Week from "../views/Week";

const WeekWrapper = observer((props) => {
    const { currentDate, events, fetchEventsFromServer } = props.store;
    return (
        <Week
            currentDate={currentDate}
            events={events}
            fetchEvents={fetchEventsFromServer}
        />
    );
});

export default WeekWrapper;
