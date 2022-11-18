import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

import "../css/Week.css";

const Week = (props) => {
    const { currentDate, events, fetchEvents } = props;

    const [weekStart, setWeekStart] = useState(undefined); // DateTime
    const wdays = [0, 1, 2, 3, 4, 5, 6];

    useEffect(() => {
        const dateObj = DateTime.fromFormat(currentDate, "yyyy-LL-dd");
        const weekStart = dateObj.startOf("week").minus({ days: 1 });
        setWeekStart(weekStart);
        const dates = [];
        for (let i = 0; i < 7; i++) {
            dates.push(weekStart.plus({ days: i }).toFormat("yyyy-LL-dd"));
        }
        fetchEvents(dates);
    }, [currentDate, fetchEvents]);

    const renderWeekHeader = (wday) => {
        const datetime = weekStart.plus({ days: wday });
        return (
            <div className="week-header-tile">
                <p>{datetime.toFormat("ccc")}</p>
                <p>{datetime.toFormat("d")}</p>
            </div>
        );
    };

    const renderEvents = (wday) => {
        const datetime = weekStart.plus({ days: wday });
        const date = datetime.toFormat("yyyy-LL-dd");
        const eventsOnDate = events[date];
        return eventsOnDate?.map((event) => {
            const startTime = DateTime.now().set({
                hour: event.start_hour,
                minute: event.start_min,
            });
            const endTime = DateTime.now().set({
                hour: event.end_hour,
                minute: event.end_min,
            });
            return (
                <div className="week-event-tile">
                    <p>
                        <strong>{event.description}</strong>
                    </p>
                    <p className="time">
                        {startTime.toFormat("t")} — {endTime.toFormat("t")}
                    </p>
                </div>
            );
        });
    };

    return (
        <div className="week-view">
            <div className="week-header">
                {!!weekStart && wdays.map((wday) => renderWeekHeader(wday))}
            </div>

            <div className="week-events">
                {!!weekStart &&
                    wdays.map((wday) => {
                        return <div>{renderEvents(wday)}</div>;
                    })}
            </div>
        </div>
    );
};

export default Week;
