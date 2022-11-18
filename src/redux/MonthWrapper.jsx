import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Month from "../views/Month";

const MonthWrapper = () => {
    const dispatch = useDispatch();

    const { currentDate } = useSelector((state) => {
        return {
            currentDate: state.calendar.currentDate,
        };
    });

    const setCurrentDate = (currentDate) => {
        dispatch({ type: "SET_CURRENT_DATE", currentDate: currentDate });
    };

    return <Month currentDate={currentDate} setCurrentDate={setCurrentDate} />;
};

export default MonthWrapper;
