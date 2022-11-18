import React from "react";
import "../css/Calendar.css";

const Calendar = (props) => {
    const { calendarTitle, renderViews, renderSidebar, view, setView } = props;

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

                    {renderViews()}
                </div>
            </section>

            <section className="sidebar">{renderSidebar()}</section>
        </div>
    );
};

export default Calendar;
