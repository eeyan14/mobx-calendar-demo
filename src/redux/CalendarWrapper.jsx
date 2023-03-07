import React from "react";
import { useDispatch, useSelector } from "react-redux";

import MonthWrapper from "./MonthWrapper";
import DayWrapper from "./DayWrapper";
import WeekWrapper from "./WeekWrapper";
import ReduxInfo from "./ReduxInfo";
import Calendar from "../views/Calendar";
import { formatTitle } from "../helpers";

const CalendarWrapper = () => {
    const dispatch = useDispatch();

    const { currentDate, view } = useSelector((state) => {
        return {
            currentDate: state.calendar.currentDate,
            view: state.calendar.view,
        };
    });

    const setCurrentDate = (currentDate) => {
        dispatch({ type: "SET_CURRENT_DATE", currentDate });
    };

    const setView = (view) => {
        dispatch({ type: "SET_VIEW", view: view });
    };

    const renderViews = () => {
        return (
            <>
                {view === "month" && <MonthWrapper />}
                {view === "day" && <DayWrapper />}
                {view === "week" && <WeekWrapper />}
            </>
        );
    };

    const renderSidebar = () => {
        return <ReduxInfo />;
    };

    const calendarTitle = formatTitle(view, currentDate);

    return (
        <Calendar
            calendarTitle={calendarTitle}
            currentDate={currentDate}
            renderViews={renderViews}
            renderSidebar={renderSidebar}
            view={view}
            setCurrentDate={setCurrentDate}
            setView={setView}
        />
    );
};

export default CalendarWrapper;
