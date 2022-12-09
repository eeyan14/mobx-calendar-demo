import { screen } from "@testing-library/react";
import { renderWithProviders } from "./redux-test-helper";
import DayWrapper from "../../redux/DayWrapper";
import { EVENT_DAY_TESTID } from "../../views/Day";

describe("redux/DayWrapper", () => {
    test("renders day events", () => {
        const { store } = renderWithProviders(<DayWrapper />);
        const state = store.getState();
        expect(Object.keys(state.calendar.events).length).toBe(1);
        const dayEventTiles = screen.getAllByTestId(EVENT_DAY_TESTID);
        expect(dayEventTiles.length).toBeGreaterThan(0);
    });
});
