import { createContext } from "react";
import { DateTime } from "luxon";
import { DATE_FORMAT } from "../helpers";

export const ViewContext = createContext("month");
export const CurrentDateContext = createContext(
    DateTime.now().toFormat(DATE_FORMAT)
);
export const EventsContext = createContext({});
