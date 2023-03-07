import React from "react";
import { DateTime } from "luxon";

export const DATE_FORMAT = "yyyy-LL-dd";

/**
 * Returns a JSX Element that displays a short list of events.
 *
 * @param {Object} events keys in format "yyyy-mm-dd" and values as array of
 *                        fake events (actual event objects do not matter)
 * @return {JSX.Element}
 */
export const renderShortEvents = (events) => {
    const numEventKeys = Object.keys(events).length;
    if (numEventKeys === 0) {
        return <p className="code">&#123;&#125;</p>;
    }
    return (
        <div>
            <p className="code">&#123;</p>
            {Object.keys(events).map((eventKey, i) => {
                return (
                    <p className="code indent" key={eventKey}>
                        {eventKey}: [<i>{events[eventKey].length} events</i>]
                        {i < numEventKeys - 1 && ","}
                    </p>
                );
            })}
            <p className="code">&#125;</p>
        </div>
    );
};

/**
 * Returns an array of events based on the weekday of each day. Simulates a
 * server-side call, kind of.
 *
 * @param {DateTime} date single DateTime object
 * @return {Array} list of events
 */
export const getEventsOnDate = (date) => {
    let events = [];
    if ([1, 3].includes(date.weekday)) {
        events = [
            {
                start_hour: 8,
                start_min: 0,
                end_hour: 9,
                end_min: 0,
                description: "Lorem ipsum",
            },
            {
                start_hour: 10,
                start_min: 30,
                end_hour: 11,
                end_min: 0,
                description: "Lorem ipsum",
            },
            {
                start_hour: 14,
                start_min: 0,
                end_hour: 15,
                end_min: 0,
                description: "Lorem ipsum",
            },
        ];
    } else if ([2, 4, 5].includes(date.weekday)) {
        events = [
            {
                start_hour: 9,
                start_min: 0,
                end_hour: 9,
                end_min: 30,
                description: "Lorem ipsum",
            },
            {
                start_hour: 11,
                start_min: 30,
                end_hour: 12,
                end_min: 30,
                description: "Lorem ipsum",
            },
            {
                start_hour: 15,
                start_min: 30,
                end_hour: 16,
                end_min: 0,
                description: "Lorem ipsum",
            },
        ];
    } else {
        events = [
            {
                start_hour: 12,
                start_min: 0,
                end_hour: 12,
                end_min: 30,
                description: "Lorem ipsum",
            },
            {
                start_hour: 13,
                start_min: 0,
                end_hour: 13,
                end_min: 30,
                description: "Lorem ipsum",
            },
        ];
    }
    return events;
};

/**
 * Formats start and end time for a given event
 *
 * @param {Object} event object with the following properties: start_hour,
 *                       start_min, end_hour, end_min
 * @returns {Array} [startTime, endTime]
 */
export const formatEventStartEnd = (event) => {
    const startTime = DateTime.now().set({
        hour: event.start_hour,
        minute: event.start_min,
    });
    const endTime = DateTime.now().set({
        hour: event.end_hour,
        minute: event.end_min,
    });

    return [startTime, endTime];
};

/**
 * Formats calendar title
 *
 * @param {String} view "month", "day", "week"
 * @param {String} currentDate yyyy-mm-dd
 *
 * @returns {String}
 */
export const formatTitle = (view, currentDate) => {
    const dateObj = DateTime.fromFormat(currentDate, DATE_FORMAT);
    let title = dateObj.toFormat("LLLL");
    if (view === "day") {
        title = dateObj.toFormat("LLLL d");
    } else if (view === "week") {
        // startOf / endOf goes to the nearest Monday / Saturday, so subtract 1
        // to view Sunday – Saturday
        const weekStart = dateObj.startOf("week").minus({ days: 1 });
        const weekEnd = dateObj.endOf("week").minus({ days: 1 });
        if (weekStart.toFormat("LLLL") !== weekEnd.toFormat("LLLL")) {
            title = `${weekStart.toFormat("LLLL d")} – ${weekEnd.toFormat(
                "LLLL d"
            )}`;
        } else {
            title = `${weekStart.toFormat("LLLL d")} – ${weekEnd.toFormat(
                "d"
            )}`;
        }
    }
    return title.toUpperCase();
}
