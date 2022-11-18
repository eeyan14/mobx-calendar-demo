import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "../css/StoreInfo.css";

/**
 * This is the JSX view for the reducer, not the actual redux reducer,
 * which is located in src/reducers
 */
const ReduxInfo = () => {
    const { view, currentDate, events } = useSelector((state) => {
        return {
            view: state.calendar.view,
            currentDate: state.calendar.currentDate,
            events: state.calendar.events,
        };
    });

    const [dispatchHistory, setDispatchHistory] = useState([]);
    const [historyHeight, setHistoryHeight] = useState("50vh");

    useEffect(() => {
        setDispatchHistory((dispatchHistory) => [
            { type: "SET_VIEW", view: view },
            ...dispatchHistory,
        ]);
    }, [view]);

    useEffect(() => {
        setDispatchHistory((dispatchHistory) => [
            { type: "SET_CURRENT_DATE", currentDate: currentDate },
            ...dispatchHistory,
        ]);
    }, [currentDate]);

    useEffect(() => {
        setDispatchHistory((dispatchHistory) => [
            { type: "SET_EVENTS", events: events },
            ...dispatchHistory,
        ]);
    }, [events]);

    useEffect(() => {
        /**
         * calculate height of current-store div to determine height of
         * dispatch-history (for scrolling)
         */
        const storeHeight =
            document.getElementById("current-store").clientHeight;
        setHistoryHeight(`calc(100vh - ${storeHeight}px - 10rem)`);
    }, [dispatchHistory]);

    const renderShortEvents = (events) => {
        return (
            <div>
                <p>&#123;</p>
                {Object.keys(events).map((eventKey) => {
                    return (
                        <p className="indent">
                            {eventKey}: [<i>{events[eventKey].length} events</i>
                            ]
                        </p>
                    );
                })}
                <p>&#125;</p>
            </div>
        );
    };

    const renderDispatchHistoryItem = (item) => {
        // `type` should be the first item, then other keys
        return (
            <div className="history-values indent">
                <div className="flex-row">
                    <p className="code">type:</p>
                    <p>"{item.type}",</p>
                </div>

                {Object.keys(item).map((itemKey) => {
                    if (itemKey === "type") {
                        return <></>;
                    }

                    return (
                        <div className="flex-row">
                            <p className="code">{itemKey}:</p>
                            <p>
                                {itemKey === "events"
                                    ? renderShortEvents(events)
                                    : item[itemKey]}
                            </p>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderDispatchHistory = () => {
        return dispatchHistory.map((item, i) => {
            return (
                <div className="history-item" key={i}>
                    <p className="code">&#123;</p>
                    {renderDispatchHistoryItem(item)}
                    <p className="code">&#125;</p>
                </div>
            );
        });
    };

    return (
        <div className="reducer-view">
            <p>
                <strong>Redux State</strong>
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
                <strong>Dispatch History</strong>
            </p>
            <div
                id="dispatch-history"
                className="scroll"
                style={{ height: historyHeight }}
            >
                {renderDispatchHistory()}
            </div>
        </div>
    );
};

export default ReduxInfo;
