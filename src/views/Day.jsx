import React, { useEffect } from "react";
import { DateTime } from "luxon";
import "../css/Day.css";

const Day = (props) => {
    const { currentDate, events, fetchEvents } = props;

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
        fetchEvents([currentDate]);
    }, [currentDate, fetchEvents]);

    const eventsOnCurrentDate = events[currentDate];

    return (
        <div className="day-view">
            {eventsOnCurrentDate?.map((event) => renderEvent(event))}
        </div>
    );
};

export default Day;
