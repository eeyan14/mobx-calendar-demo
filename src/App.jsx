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

import "./css/App.css";

const App = () => {
    const [storeType, setStoreType] = useState("mobx"); // "redux", "mobx"

    const handleSelectStoreType = (e) => {
        setStoreType(e.target.value);
    };

    const renderStoreOptions = () => {
        return ["Redux", "MobX"].map((option) => {
            const optionLowercase = option.toLowerCase();
            return (
                <label key={option}>
                    <input
                        type="radio"
                        name={optionLowercase}
                        value={optionLowercase}
                        checked={storeType === optionLowercase}
                        onChange={handleSelectStoreType}
                    />
                    {option}
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
