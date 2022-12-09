import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./redux-test-helper";
import MonthWrapper from "../../redux/MonthWrapper";
import { DAY_BUTTON_TESTID } from "../../views/Month";

describe("redux/MonthWrapper", () => {
    test("renders days in month", () => {
        renderWithProviders(<MonthWrapper />);
        const days = screen.getAllByTestId(DAY_BUTTON_TESTID);
        expect(days.length).toBe(31);
    });

    test("clicking day updates store", () => {
        const { store } = renderWithProviders(<MonthWrapper />);
        const days = screen.getAllByTestId(DAY_BUTTON_TESTID);
        userEvent.click(days[days.length - 1]);
        const state = store.getState();
        expect(state.calendar.currentDate).toBe("2022-12-31");
    });
});
