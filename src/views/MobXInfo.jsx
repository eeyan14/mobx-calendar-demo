import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import "./MobXInfo.css";

const MobXInfo = observer((props) => {
    const { view, currentDate, events } = props.store;
    const [actionHistory, setActionHistory] = useState([]);
    const [historyHeight, setHistoryHeight] = useState("50vh");

    useEffect(() => {
        setActionHistory((actionHistory) => [
            { function: "setView()", view: view },
            ...actionHistory,
        ]);
    }, [view]);

    useEffect(() => {
        setActionHistory((actionHistory) => [
            { function: "setCurrentDate()", currentDate: currentDate },
            ...actionHistory,
        ]);
    }, [currentDate]);

    useEffect(() => {
        setActionHistory((actionHistory) => [
            { function: "setEvents()", events: events },
            ...actionHistory,
        ]);
    }, [events]);

    useEffect(() => {
        /**
         * calculate height of current-store div to determine height of
         * action-history (for scrolling)
         */
        const storeHeight =
            document.getElementById("current-store").clientHeight;
        setHistoryHeight(`calc(100vh - ${storeHeight}px - 10rem)`);
    }, [actionHistory]);

    const renderShortEvents = (events) => {
        const numEventKeys = Object.keys(events).length;
        if (numEventKeys === 0) {
            return <p className="code">&#123;&#125;</p>;
        }
        return (
            <div>
                <p className="code">&#123;</p>
                {Object.keys(events).map((eventKey, i) => {
                    return (
                        <p className="code indent">
                            {eventKey}: [<i>{events[eventKey].length} events</i>
                            ]{i < numEventKeys - 1 && ","}
                        </p>
                    );
                })}
                <p className="code">&#125;</p>
            </div>
        );
    };

    const renderActionHistoryItem = (item) => {
        // `type` should be the first item, then other keys
        return (
            <div className="history-values indent">
                <div className="flex-row">
                    <p>action:</p>
                    <p className="code">{item.function}</p>
                </div>

                {Object.keys(item).map((itemKey) => {
                    if (itemKey === "function") {
                        return <></>;
                    }

                    return (
                        <div className="flex-row">
                            <p>{itemKey}:</p>
                            {itemKey === "events" ? (
                                renderShortEvents(events)
                            ) : (
                                <p className="code">{item[itemKey]}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderActionHistory = () => {
        return actionHistory.map((item, i) => {
            return (
                <div className="history-item" key={i}>
                    {renderActionHistoryItem(item)}
                </div>
            );
        });
    };

    return (
        <div className="reducer-view">
            <p>
                <strong>MobX State</strong>
            </p>
            <div id="current-store" className="grid">
                <div className="grid-row">
                    <p className="code">view</p>
                    <p>"{view}"</p>
                </div>

                <div className="grid-row">
                    <p className="code">currentDate</p>
                    <p>"{currentDate}"</p>
                </div>

                <div className="grid-row">
                    <p className="code">events</p>
                    <p>{renderShortEvents(events)}</p>
                </div>
            </div>

            <p>
                <strong>Action History</strong>
            </p>
            <div
                id="action-history"
                className="scroll"
                style={{ height: historyHeight }}
            >
                {renderActionHistory()}
            </div>
        </div>
    );
});

export default MobXInfo;
