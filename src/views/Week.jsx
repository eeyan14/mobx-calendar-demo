import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { formatEventStartEnd } from "../helpers";

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
            <div className="week-header-tile" key={wday}>
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
            const [startTime, endTime] = formatEventStartEnd(event);
            const key = `${event.start_hour}-${event.start_min}-${event.end_hour}-${event.end_min}`;
            return (
                <div className="week-event-tile" key={key}>
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
                        return <div key={wday}>{renderEvents(wday)}</div>;
                    })}
            </div>
        </div>
    );
};

export default Week;
