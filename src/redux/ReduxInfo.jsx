import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StoreInfo, { HISTORY_EVENT_TESTID } from "../views/StoreInfo";
import { renderShortEvents } from "../helpers";

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

    const renderHistoryItem = (item) => {
        // `type` should be the first item, then other keys
        return (
            <div className="history-values indent">
                <div className="flex-row">
                    <p className="code">type:</p>
                    <p>"{item.type}",</p>
                </div>

                {Object.keys(item).map((itemKey) => {
                    if (itemKey === "type") {
                        return <div key={itemKey} />;
                    }

                    return (
                        <div className="flex-row" key={itemKey}>
                            <p className="code">{itemKey}:</p>
                            {itemKey === "events" ? (
                                renderShortEvents(events)
                            ) : (
                                <p>{item[itemKey]}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderHistory = () => {
        return dispatchHistory.map((item, i) => {
            return (
                <div
                    className={HISTORY_EVENT_TESTID}
                    key={i}
                    data-testid={HISTORY_EVENT_TESTID}
                >
                    <p className="code">&#123;</p>
                    {renderHistoryItem(item)}
                    <p className="code">&#125;</p>
                </div>
            );
        });
    };

    return (
        <StoreInfo
            view={view}
            currentDate={currentDate}
            events={events}
            history={dispatchHistory}
            renderHistory={renderHistory}
        />
    );
};

export default ReduxInfo;
