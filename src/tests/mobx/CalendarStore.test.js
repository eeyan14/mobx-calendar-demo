import CalendarStore from "../../mobx/CalendarStore";

describe("mobx/CalendarStore", () => {
    let store;
    beforeEach(() => {
        store = new CalendarStore("month", "2022-12-01", {});
    });

    test("get initial values", () => {
        expect(store.view).toBe("month");
        expect(store.currentDate).toBe("2022-12-01");
        expect(store.events).toStrictEqual({});
    });

    test("setView", () => {
        store.setView("day");
        expect(store.view).toBe("day");
    });

    test("setCurrentDate", () => {
        store.setView("2022-12-02");
        expect(store.view).toBe("2022-12-02");
    });

    test("setEvents", () => {
        store.setEvents({ "2022-12-01": [] });
        expect(store.events).toStrictEqual({ "2022-12-01": [] });
    });

    test("fetchEventsFromserver", () => {
        store.fetchEventsFromServer(["2022-12-01"]);
        expect(Object.keys(store.events)).toStrictEqual(["2022-12-01"]);
    });
});
