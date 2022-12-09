import { render, screen } from "@testing-library/react";
import DayWrapper from "../../mobx/DayWrapper";
import CalendarStore from "../../mobx/CalendarStore";
import { EVENT_DAY_TESTID } from "../../views/Day";

describe("mobx/DayWrapper", () => {
    let store;
    beforeEach(() => {
        store = new CalendarStore("month", "2022-12-01", {});
    });

    test("fetches and renders day events", () => {
        render(<DayWrapper store={store} />);
        expect(Object.keys(store.events).length).toBe(1);
        const dayEventTiles = screen.getAllByTestId(EVENT_DAY_TESTID);
        expect(dayEventTiles.length).toBeGreaterThan(0);
    });
});
