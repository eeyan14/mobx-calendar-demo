import { screen } from "@testing-library/react";
import { renderWithProviders } from "./redux-test-helper";
import CalendarWrapper from "../../redux/CalendarWrapper";

describe("redux/CalendarWrapper", () => {
    test("renders calendar", () => {
        renderWithProviders(<CalendarWrapper />);
        expect(screen.getByText("December")).toBeVisible();
    });
});
