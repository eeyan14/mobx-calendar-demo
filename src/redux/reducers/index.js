import { combineReducers } from "redux";
import calendarReducer from "./calendar";

/**
 * Defines a top-level reducer.
 *
 * For this particular app it's unnecessary since we only have one reducer,
 * but it is a useful example for utilizing multiple reducers.
 *
 * If you just wanted to use the single reducer, you can directly import it
 * in src/index.js, e.g.:
 *
 * import calendarReducer from "./reducers/calendarReducer";
 * const store = configureStore({ reducer: calendarReducer });
 */
const rootReducer = combineReducers({
  calendar: calendarReducer,
})

export default rootReducer;
