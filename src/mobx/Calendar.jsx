import React from "react";
import { observer } from "mobx-react-lite";

import MonthWrapper from "./MonthWrapper";
// import DayWrapper from "./DayWrapper";
// import Week from "./views/Week";
// import MobXInfo from "./views/MobXInfo";

import GithubLogo from "../github_logo.png";
import "../css/Calendar.css";

const Calendar = observer((props) => {
    const { view, calendarTitle, setView } = props.store;

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
                        <h1>{calendarTitle}</h1>
                    </div>

                    {view === "month" && <MonthWrapper store={props.store} />}
                    {/*view === "day" && <DayWrapper store={props.store} />}
                    {view === "week" && <Week store={props.store} />*/}
                </div>
            </section>

            <section className="sidebar">
                {/*<MobXInfo store={props.store} />*/}
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
});

export default Calendar;
