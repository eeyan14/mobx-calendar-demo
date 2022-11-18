import { DateTime } from "luxon";

const initialState = {
    /**
     * `view` (string): "month", "day", "week"
     */
    view: "month",

    /**
     * `currentDate` (string): "yyyy-mm-dd"
     */
    currentDate: DateTime.now().toFormat("yyyy-LL-dd"),

    /**
     * `events` (object): keys are strings in format "yyyy-mm-dd"
     * and values are arrays of Events
     */
    events: {},
};

export default function calendarReducer(state = initialState, action) {
    switch (action.type) {
        /**
         * expects `action` to include:
         * - view: string
         */
        case "SET_VIEW":
            return {
                ...state,
                view: action.view,
            };

        /**
         * expects `action` to include:
         * - currentDate: string
         */
        case "SET_CURRENT_DATE":
            return {
                ...state,
                currentDate: action.currentDate,
            };

        /**
         * expects `action` to include:
         * - events: { "date1": [Events], "date2": [Events], ... },
         *   where keys are in format "yyyy-mm-dd"
         */
        case "SET_EVENTS":
            return {
                ...state,
                events: {
                    ...state.events,
                    ...action.events,
                },
            };

        default:
            return state;
    }
}
