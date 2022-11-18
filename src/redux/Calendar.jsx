import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";

import MonthWrapper from "./MonthWrapper";
import DayWrapper from "./DayWrapper";
import WeekWrapper from "./WeekWrapper";
import ReduxInfo from "./ReduxInfo";

import GithubLogo from "../github_logo.png";
import "../css/Calendar.css";

const Calendar = () => {
    const dispatch = useDispatch();

    const { currentDate, view } = useSelector((state) => {
        return {
            currentDate: state.calendar.currentDate,
            view: state.calendar.view,
        };
    });

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
        dispatch({ type: "SET_VIEW", view: view });
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

                    {view === "month" && <MonthWrapper />}
                    {view === "day" && <DayWrapper />}
                    {view === "week" && <WeekWrapper />}
                </div>
            </section>

            <section className="sidebar">
                <ReduxInfo />
            </section>

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
