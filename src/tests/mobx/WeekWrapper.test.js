import { render, screen } from "@testing-library/react";
import WeekWrapper from "../../mobx/WeekWrapper";
import CalendarStore from "../../mobx/CalendarStore";
import { EVENT_WEEK_TESTID, HEADER_WEEK_TESTID } from "../../views/Week";

describe("mobx/WeekWrapper", () => {
    let store;
    beforeEach(() => {
        store = new CalendarStore("month", "2022-12-01", {});
    });

    test("fetches and renders week events", () => {
        render(<WeekWrapper store={store} />);
        expect(Object.keys(store.events).length).toBe(7);
        const weekEventTiles = screen.getAllByTestId(EVENT_WEEK_TESTID);
        expect(weekEventTiles.length).toBeGreaterThan(0);
    });

    test("renders week headers", () => {
        render(<WeekWrapper store={store} />);
        const weekHeaderTiles = screen.getAllByTestId(HEADER_WEEK_TESTID);
        expect(weekHeaderTiles.length).toBe(7);
    });
});
