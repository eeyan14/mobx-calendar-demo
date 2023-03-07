import React, { useState } from "react";
import { DateTime } from "luxon";

import GithubLogo from "./github_logo.png";
import { DATE_FORMAT } from "./helpers";

// redux imports
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import { default as CalendarRedux } from "./redux/CalendarWrapper";

// mobx imports
import { default as CalendarMobX } from "./mobx/CalendarWrapper";
import CalendarStore from "./mobx/CalendarStore";

// context imports
import { default as CalendarContext } from "./context/CalendarWrapper"

import "./css/App.css";

const App = () => {
    const storeOptions = {
        redux: "Redux",
        mobx: "MobX",
        context: "Context",
    };
    const [storeType, setStoreType] = useState("context");

    const handleSelectStoreType = (e) => {
        setStoreType(e.target.value);
    };

    const renderStoreOptions = () => {
        return Object.keys(storeOptions).map((optionKey) => {
            return (
                <label key={optionKey}>
                    <input
                        type="radio"
                        name={storeOptions[optionKey]}
                        value={optionKey}
                        checked={storeType === optionKey}
                        onChange={handleSelectStoreType}
                    />
                    {storeOptions[optionKey]}
                </label>
            );
        });
    };

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
                DateTime.now().toFormat(DATE_FORMAT),
                {}
            );
            return <CalendarMobX store={store} />;
        } else if (storeType === "context") {
            return (
                <CalendarContext />
            );
        }
    };

    return (
        <div className="Calendar">
            {renderCalendar()}

            <div className="store-type">{renderStoreOptions()}</div>

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
