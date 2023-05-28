import {
  getYearsRange,
  getWorkDays,
  getTotalNumberOfHolidayDays,
} from "../workDaysUtils";

describe("getHolidayDays", () => {
  it("should return number of holiday days between 2020-05-01 and 2020-05-31", () => {
    const earlierDate = new Date("2020-05-01");
    const laterDate = new Date("2020-05-31");
    const result = getTotalNumberOfHolidayDays(laterDate, earlierDate);
    expect(result).toBe(1);
  });
});

describe("getWorkDays", () => {
  it("should return 20 work days between 2020-05-01 and 2020-05-31", () => {
    const earlierDate = new Date("2020-05-01");
    const laterDate = new Date("2020-05-31");
    const result = getWorkDays(laterDate, earlierDate);
    expect(result).toBe(20);
  });

  it("should return 255 work days between 2020-01-01 and 2020-12-31", () => {
    const earlierDate = new Date("2020-01-01");
    const laterDate = new Date("2020-12-31 23:59:59");
    const result = getWorkDays(laterDate, earlierDate);
    expect(result).toBe(255);
  });

  it("should return 506 work days between 2019-01-01 and 2020-12-31", () => {
    const earlierDate = new Date("2019-01-01");
    const laterDate = new Date("2020-12-31 23:59:59");
    const result = getWorkDays(laterDate, earlierDate);
    expect(result).toBe(506);
  });

  it("should return 760 work days between 2019-01-01 and 2021-12-31", () => {
    const earlierDate = new Date("2019-01-01");
    const laterDate = new Date("2021-12-31 23:59:59");
    const result = getWorkDays(laterDate, earlierDate);
    expect(result).toBe(760);
  });

  it("should return 22 work days between 2020-12-01 and 2020-12-31", () => {
    const earlierDate = new Date("2020-12-01");
    const laterDate = new Date("2020-12-31");
    const result = getWorkDays(laterDate, earlierDate);
    expect(result).toBe(22);
  });

  it("should return 12 work days between 2020-12-15 and 2020-12-31", () => {
    const earlierDate = new Date("2020-12-15");
    const laterDate = new Date("2020-12-31");
    const result = getWorkDays(laterDate, earlierDate);
    expect(result).toBe(12);
  });

  it("should return 2 work days between 2020-12-30 and 2020-12-31", () => {
    const earlierDate = new Date("2020-12-30");
    const laterDate = new Date("2020-12-31");
    const result = getWorkDays(laterDate, earlierDate);
    expect(result).toBe(2);
  });

  it.only("should return 21 work days between 2023-05-01 and 2023-05-31", () => {
    const earlierDate = new Date("2023-05-01");
    const laterDate = new Date("2023-05-31");
    const result = getWorkDays(laterDate, earlierDate);
    expect(result).toBe(21);
  });
});

describe("getYearsRange", () => {
  it("should return array of all years between 2 dates", () => {
    const date1 = new Date("2018-01-01");
    const date2 = new Date("2021-12-31");

    const result = getYearsRange(date1, date2);
    expect(result).toEqual([2018, 2019, 2020, 2021]);
  });

  it("should return array of all years between 2 dates (reversed)", () => {
    const date1 = new Date("2018-01-01");
    const date2 = new Date("2021-12-31");

    const result = getYearsRange(date2, date1);
    expect(result).toEqual([2018, 2019, 2020, 2021]);
  });
});

describe("getTotalNumberOfHolidayDays", () => {
  it("should return 1 for date range 2020-05-01 and 2020-05-31", () => {
    const result = getTotalNumberOfHolidayDays(
      new Date("2020-05-31"),
      new Date("2020-05-01")
    );

    expect(result).toEqual(1);
  });
});
