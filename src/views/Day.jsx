import React, { useEffect } from "react";
import { formatEventStartEnd } from "../helpers";
import "../css/Day.css";

const Day = (props) => {
    const { currentDate, events, fetchEvents } = props;

    const renderEvent = (event) => {
        const [startTime, endTime] = formatEventStartEnd(event);
        const key = `${event.start_hour}-${event.start_min}-${event.end_hour}-${event.end_min}`;
        return (
            <div className="day-event-tile" key={key}>
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
