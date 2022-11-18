import React from "react";
import { DateTime } from "luxon";

// import Month from "./views/Month";
// import Day from "./views/Day";
// import Week from "./views/Week";
// import ReduxInfo from "./views/ReduxInfo";

import GithubLogo from "./github_logo.png";
import "./Calendar.css";

const Calendar = () => {
    const view = "month";
    const currentDate = DateTime.now().toFormat("yyyy-LL-dd");

    const getTitle = () => {
        const dateObj = DateTime.fromFormat(currentDate, "yyyy-LL-dd");
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
        return title;
    };

    const setView = (view) => {
        // TODO
    };

    const renderViewOptions = () => {
        return (
            <div id="calendar-view-options">
                <label htmlFor="view-options">View:</label>
                <div role="listbox" id="view-options">
                    {["Month", "Day", "Week"].map((option) => {
                        const optionLower = option.toLowerCase();
                        return (
                            <button
                                className={
                                    optionLower === view ? "selected" : ""
                                }
                                key={optionLower}
                                onClick={() => setView(optionLower)}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="Calendar">
            <section className="main">
                {renderViewOptions()}

                <div id="calendar-container">
                    <div className="calendar-header">
                        <h1>{getTitle()}</h1>
                    </div>

                    {/*view === "month" && <Month />}
                    {view === "day" && <Day />}
                    {view === "week" && <Week />*/}
                </div>
            </section>

            <section className="sidebar">{/*<ReduxInfo />*/}</section>

            <a
                href="https://github.com/eeyan14/redux-calendar-demo"
                target="_blank"
                className="github"
                rel="noreferrer"
            >
                <img src={GithubLogo} alt="link to Github repository" />
            </a>
        </div>
    );
};

export default Calendar;
