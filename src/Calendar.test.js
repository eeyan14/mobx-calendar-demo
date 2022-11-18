import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders calendar", () => {
    render(<App />);
    const element = screen.getById("calendar-container");
    expect(element).toBeInTheDocument();
});

test("renders calendar view options", () => {
    render(<App />);
    const element = screen.getById("calendar-view-options");
    expect(element).toBeInTheDocument();
});
