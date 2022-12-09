import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import StoreInfo, { HISTORY_EVENT_TESTID } from "../views/StoreInfo";
import { renderShortEvents } from "../helpers";

const MobXInfo = observer((props) => {
    const { view, currentDate, events } = props.store;
    const [actionHistory, setActionHistory] = useState([]);

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

    const renderHistoryItem = (item) => {
        // `action` should be the first item, then other keys
        return (
            <div
                className="history-values indent"
                data-testid={HISTORY_EVENT_TESTID}
            >
                <div className="flex-row">
                    <p>action:</p>
                    <p className="code">{item.function}</p>
                </div>

                {Object.keys(item).map((itemKey) => {
                    if (itemKey === "function") {
                        return <div key={itemKey} />;
                    }

                    return (
                        <div className="flex-row" key={itemKey}>
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

    const renderHistory = () => {
        return actionHistory.map((item, i) => {
            return (
                <div className="history-item" key={i}>
                    {renderHistoryItem(item)}
                </div>
            );
        });
    };

    return (
        <StoreInfo
            view={view}
            currentDate={currentDate}
            events={events}
            history={actionHistory}
            renderHistory={renderHistory}
        />
    );
});

export default MobXInfo;
