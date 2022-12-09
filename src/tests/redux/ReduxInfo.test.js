import { screen, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { renderWithProviders } from "./redux-test-helper";
import ReduxInfo from "../../redux/ReduxInfo";
import {
    CURRENT_STORE_TESTID,
    HISTORY_EVENT_TESTID,
} from "../../views/StoreInfo";

describe("redux/ReduxInfo", () => {
    const INITIAL_EVENTS_COUNT = 3;

    test("renders initial state", () => {
        renderWithProviders(<ReduxInfo />);
        const storeSection = screen.getByTestId(CURRENT_STORE_TESTID);
        expect(screen.getByText("Store")).toBeVisible();
        expect(within(storeSection).getByText("view")).toBeVisible();
        expect(within(storeSection).getByText("currentDate")).toBeVisible();
        expect(within(storeSection).getByText("events")).toBeVisible();
    });

    test("displayed state is updated", () => {
        const { store } = renderWithProviders(<ReduxInfo />);
        const storeSection = screen.getByTestId(CURRENT_STORE_TESTID);
        act(() => store.dispatch({ type: "SET_VIEW", view: "day" }));
        expect(within(storeSection).getByText('"day"')).toBeVisible();
    });

    test("renders initial events", () => {
        renderWithProviders(<ReduxInfo />);
        const historyEvents = screen.getAllByTestId(HISTORY_EVENT_TESTID);
        expect(historyEvents.length).toBe(INITIAL_EVENTS_COUNT);
    });

    test("renders new event when view changes", async () => {
        const { store } = renderWithProviders(<ReduxInfo />);
        act(() => store.dispatch({ type: "SET_VIEW", view: "day" }));
        const historyEvents = screen.getAllByTestId(HISTORY_EVENT_TESTID);
        expect(historyEvents.length).toBe(INITIAL_EVENTS_COUNT + 1);
    });

    test("renders new event when currentDate changes", async () => {
        const { store } = renderWithProviders(<ReduxInfo />);
        act(() =>
            store.dispatch({
                type: "SET_CURRENT_DATE",
                currentDate: "2022-12-02",
            })
        );
        const historyEvents = screen.getAllByTestId(HISTORY_EVENT_TESTID);
        expect(historyEvents.length).toBe(INITIAL_EVENTS_COUNT + 1);
    });

    test("renders new event when events changes", async () => {
        const { store } = renderWithProviders(<ReduxInfo />);
        act(() =>
            store.dispatch({ type: "SET_EVENTS", events: { "2022-12-02": [] } })
        );
        const historyEvents = screen.getAllByTestId(HISTORY_EVENT_TESTID);
        expect(historyEvents.length).toBe(INITIAL_EVENTS_COUNT + 1);
    });
});
