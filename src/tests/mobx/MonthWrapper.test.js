import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MonthWrapper from "../../mobx/MonthWrapper";
import CalendarStore from "../../mobx/CalendarStore";
import { DAY_BUTTON_TESTID } from "../../views/Month";

describe("mobx/MonthWrapper", () => {
    let store;
    beforeEach(() => {
        store = new CalendarStore("month", "2022-12-01", {});
    });

    test("renders days in month", () => {
        render(<MonthWrapper store={store} />);
        const days = screen.getAllByTestId(DAY_BUTTON_TESTID);
        expect(days.length).toBe(31);
    });

    test("clicking day updates store", () => {
        render(<MonthWrapper store={store} />);
        const days = screen.getAllByTestId(DAY_BUTTON_TESTID);
        userEvent.click(days[days.length - 1]);
        expect(store.currentDate).toBe("2022-12-31");
    });
});
