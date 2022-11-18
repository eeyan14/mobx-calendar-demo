import React, { useState } from "react";
import { DateTime } from "luxon";

// redux imports
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import { default as CalendarRedux } from "./redux/Calendar";

// mobx imports
import { default as CalendarMobX } from "./mobx/Calendar";
import CalendarStore from "./mobx/CalendarStore";

const App = () => {
    const [storeType] = useState("mobx"); // "redux", "mobx"

    if (storeType === "redux") {
        const store = configureStore({ reducer: rootReducer });
        return (
            <Provider store={store}>
                <CalendarRedux />
            </Provider>
        );
    }

    if (storeType === "mobx") {
        const store = new CalendarStore(
            "month",
            DateTime.now().toFormat("yyyy-LL-dd"),
            {}
        );
        return <CalendarMobX store={store} />;
    }
};

export default App;
