import { screen } from "@testing-library/react";
import { renderWithProviders } from "./redux-test-helper";
import WeekWrapper from "../../redux/WeekWrapper";
import { EVENT_WEEK_TESTID, HEADER_WEEK_TESTID } from "../../views/Week";

describe("mobx/WeekWrapper", () => {
    test("fetches and renders week events", () => {
        const { store } = renderWithProviders(<WeekWrapper />);
        const state = store.getState();
        expect(Object.keys(state.calendar.events).length).toBe(7);
        const weekEventTiles = screen.getAllByTestId(EVENT_WEEK_TESTID);
        expect(weekEventTiles.length).toBeGreaterThan(0);
    });

    test("renders week headers", () => {
        renderWithProviders(<WeekWrapper />);
        const weekHeaderTiles = screen.getAllByTestId(HEADER_WEEK_TESTID);
        expect(weekHeaderTiles.length).toBe(7);
    });
});
