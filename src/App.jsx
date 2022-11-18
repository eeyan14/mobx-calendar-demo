import React, { useState } from "react";
import { DateTime } from "luxon";

import GithubLogo from "./github_logo.png";

// redux imports
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import { default as CalendarRedux } from "./redux/CalendarWrapper";

// mobx imports
import { default as CalendarMobX } from "./mobx/CalendarWrapper";
import CalendarStore from "./mobx/CalendarStore";

const App = () => {
    const [storeType] = useState("mobx"); // "redux", "mobx"

    const renderCalendar = () => {
        if (storeType === "redux") {
            const store = configureStore({ reducer: rootReducer });
            return (
                <Provider store={store}>
                    <CalendarRedux />
                </Provider>
            );
        } else if (storeType === "mobx") {
            const store = new CalendarStore(
                "month",
                DateTime.now().toFormat("yyyy-LL-dd"),
                {}
            );
            return <CalendarMobX store={store} />;
        }
    };

    return (
        <div className="Calendar">
            {renderCalendar()}

            <a
                href="https://github.com/eeyan14/react-stores-demo"
                target="_blank"
                className="github"
                rel="noreferrer"
            >
                <img src={GithubLogo} alt="link to Github repository" />
            </a>
        </div>
    );
};

export default App;
