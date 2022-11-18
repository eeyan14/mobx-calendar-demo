import React from "react";
import { observer } from "mobx-react-lite";
import Month from "../views/Month";

const MonthWrapper = observer((props) => {
    const { currentDate, setCurrentDate } = props.store;
    return <Month currentDate={currentDate} setCurrentDate={setCurrentDate} />;
});

export default MonthWrapper;
