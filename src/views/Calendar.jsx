import React from "react";
import { DateTime } from "luxon";
import { DATE_FORMAT } from "../helpers";
import "../css/Calendar.css";

const Calendar = (props) => {
    const {
        calendarTitle,
        currentDate,
        renderViews,
        renderSidebar,
        view,
        setCurrentDate,
        setView,
    } = props;

    const handleNavigatePrevious = () => {
        let dateObj = DateTime.fromFormat(currentDate, DATE_FORMAT);
        switch (view) {
            case "month":
                dateObj = dateObj.minus({ months: 1 }).startOf("month");
                break;
            case "week":
                dateObj = dateObj.minus({ weeks: 1 }).startOf("week");
                break;
            case "day":
                dateObj = dateObj.minus({ days: 1 });
                break;
            default:
                break;
        }
        setCurrentDate(dateObj.toFormat(DATE_FORMAT));
    };

    const handleNavigateNext = () => {
        let dateObj = DateTime.fromFormat(currentDate, DATE_FORMAT);
        switch (view) {
            case "month":
                dateObj = dateObj.plus({ months: 1 }).startOf("month");
                break;
            case "week":
                dateObj = dateObj.plus({ weeks: 1 }).startOf("week");
                break;
            case "day":
                dateObj = dateObj.plus({ days: 1 });
                break;
            default:
                break;
        }
        setCurrentDate(dateObj.toFormat(DATE_FORMAT));
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
                        <button
                            className="navigate previous"
                            onClick={handleNavigatePrevious}
                        >
                            <span
                                className="material-symbols-outlined"
                                aria-label="Previous"
                            >
                                arrow_back_ios
                            </span>
                        </button>
                        <h1>{calendarTitle}</h1>
                        <button
                            className="navigate next"
                            onClick={handleNavigateNext}
                        >
                            <span
                                className="material-symbols-outlined"
                                aria-label="Next"
                            >
                                arrow_forward_ios
                            </span>
                        </button>
                    </div>

                    {renderViews()}
                </div>
            </section>

            <section className="sidebar">{renderSidebar()}</section>
        </div>
    );
};

export default Calendar;
