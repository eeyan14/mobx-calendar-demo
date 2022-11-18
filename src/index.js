import React from "react";
import ReactDOM from "react-dom/client";
import { DateTime } from "luxon";

import Calendar from "./Calendar";
import CalendarStore from "./CalendarStore";
import "./index.css";

const store = new CalendarStore(
    "month",
    DateTime.now().toFormat("yyyy-LL-dd"),
    {}
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Calendar store={store} />);
