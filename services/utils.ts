import slugify from "slugify";

export const getHolidaySlug = (holidayName: string) =>
  slugify(holidayName, { lower: true });
