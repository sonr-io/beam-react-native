import { getFormattedDay } from "./getFormattedDay";

describe("getFormattedDay", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("20 Aug 2020 12:12:00 GMT").getTime());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("returns 'Today' if the date is today", () => {
    expect(
      getFormattedDay(new Date("20 Aug 2020 09:00:00 GMT").getTime())
    ).toBe("Today");
  });

  it("returns 'Yesterday' if the date is yesterday", () => {
    expect(
      getFormattedDay(new Date("19 Aug 2020 23:59:00 GMT").getTime())
    ).toBe("Yesterday");
  });

  it("returns the formatted day if it is neither today or yesterday", () => {
    expect(
      getFormattedDay(new Date("17 Aug 2020 12:50:00 GMT").getTime())
    ).toBe("2020 Aug 17");
  });
});
