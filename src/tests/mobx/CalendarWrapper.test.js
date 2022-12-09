import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CalendarWrapper from "../../mobx/CalendarWrapper";
import CalendarStore from "../../mobx/CalendarStore";

describe("mobx/CalendarWrapper", () => {
    let store;
    beforeEach(() => {
        store = new CalendarStore("month", "2022-12-01", {});
    });

    test("renders calendar", () => {
        render(<CalendarWrapper store={store} />);
        expect(screen.getByText("DECEMBER")).toBeVisible();
    });

    test("clicking 'month' option changes to month view", () => {
        render(<CalendarWrapper store={store} />);
        const button = screen.getByRole("button", { name: "Month" });
        userEvent.click(button);
        expect(screen.getByText("DECEMBER")).toBeVisible();
    });

    test("clicking 'day' option changes to day view", () => {
        render(<CalendarWrapper store={store} />);
        const button = screen.getByRole("button", { name: "Day" });
        userEvent.click(button);
        expect(screen.getByText("DECEMBER 1")).toBeVisible();
    });

    test("clicking 'week' option changes to week view", () => {
        render(<CalendarWrapper store={store} />);
        const button = screen.getByRole("button", { name: "Week" });
        userEvent.click(button);
        expect(screen.getByText("NOVEMBER 27 – DECEMBER 3")).toBeVisible();
    });
});
