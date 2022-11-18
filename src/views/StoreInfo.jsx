import React, { useEffect, useState } from "react";
import { renderShortEvents } from "../helpers";
import "../css/StoreInfo.css";

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
                    {renderShortEvents(events)}
                </div>
            </div>

            <p>
                <strong>History</strong>
            </p>
            <div className="scroll" style={{ height: historyHeight }}>
                {renderHistory()}
            </div>
        </div>
    );
};

export default StoreInfo;
