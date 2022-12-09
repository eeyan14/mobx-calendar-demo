import React, { useEffect, useState } from "react";
import { renderShortEvents } from "../helpers";
import "../css/StoreInfo.css";

export const CURRENT_STORE_TESTID = "current-store";
export const HISTORY_LIST_TESTID = "history-list";

const StoreInfo = (props) => {
    const { view, currentDate, events, history, renderHistory } = props;
    const [historyHeight, setHistoryHeight] = useState("50vh");

    useEffect(() => {
        /**
         * calculate height of current-store div to determine height of
         * history (for scrolling)
         */
        const storeHeight =
            document.getElementById("current-store").clientHeight;
        setHistoryHeight(`calc(100vh - ${storeHeight}px - 10rem)`);
    }, [history]);

    return (
        <div className="reducer-view">
            <p>
                <strong>Store</strong>
            </p>
            <div
                id={CURRENT_STORE_TESTID}
                className="grid"
                data-testid={CURRENT_STORE_TESTID}
            >
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
                    {renderShortEvents(events)}
                </div>
            </div>

            <p>
                <strong>History</strong>
            </p>
            <div
                className="scroll"
                style={{ height: historyHeight }}
                data-testid={HISTORY_LIST_TESTID}
            >
                {renderHistory()}
            </div>
        </div>
    );
};

export default StoreInfo;
