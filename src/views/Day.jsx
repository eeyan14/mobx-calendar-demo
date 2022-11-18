import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { DateTime } from "luxon";
import "./Day.css";

const Day = observer((props) => {
    const { currentDate, events, fetchEventsFromServer } = props.store;

    const renderEvent = (event) => {
        const startTime = DateTime.now().set({
            hour: event.start_hour,
            minute: event.start_min,
        });
        const endTime = DateTime.now().set({
            hour: event.end_hour,
            minute: event.end_min,
        });
        return (
            <div className="day-event-tile">
                <p>
                    <strong>{event.description}</strong>
                </p>
                <p>
                    {startTime.toFormat("t")} — {endTime.toFormat("t")}
                </p>
            </div>
        );
    };

    useEffect(() => {
        fetchEventsFromServer([currentDate]);
    }, [currentDate, fetchEventsFromServer]);

    const eventsOnCurrentDate = events[currentDate];

    return (
        <div className="day-view">
            {eventsOnCurrentDate?.map((event) => renderEvent(event))}
        </div>
    );
});

export default Day;
