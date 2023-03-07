import React, { useContext } from "react";
import { CurrentDateContext } from "./CalendarContext";
import Month from "../views/Month";

const MonthWrapper = (props) => {
    const currentDate = useContext(CurrentDateContext);
    return (
        <Month
            currentDate={currentDate}
            setCurrentDate={props.setCurrentDate}
        />
    );
};

export default MonthWrapper;
