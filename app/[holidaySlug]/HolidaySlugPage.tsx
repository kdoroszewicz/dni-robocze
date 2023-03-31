"use client";

import { format } from "date-fns";
import BackArrow from "../../components/BackArrow";
import Link from "../../components/Link";
import { getHolidaySlug } from "../../services/utils";
import { polishHolidays } from "../../src/workDaysUtils";
const holidays = polishHolidays.getHolidays();

const HolidayPage = ({ children, holiday }) => {
  return (
    <>
      <Link href="/">
        <BackArrow />{" "}
        <span className="ml-2">wróć do Kalkulatora Dni Roboczych</span>
      </Link>
      <div className="mt-10 space-y-2 text-xl">
        {children ? (
          children
        ) : (
          <h1 className="mb-2 text-4xl font-semibold">{holiday.name}</h1>
        )}
        <p>
          Kiedy jest <strong>{holiday.name}</strong>?{" "}
          {`Święto wypada ${format(new Date(holiday.date), "dd.MM.yyyy")}`}.
        </p>
        <p>
          Święto jest <strong>wolne od pracy</strong>.
        </p>
      </div>
      <div className="mt-8">
        <p className="mb-2 text-gray-600">Zobacz inne święta:</p>
        <ul>
          {holidays
            .filter((h) => h.name !== holiday.name)
            .map((h) => (
              <li className="holiday-list-item" key={h.name}>
                <Link
                  className="mb-2 block w-full rounded border border-gray-300 bg-gray-100 p-2 text-blue-500 hover:no-underline"
                  href={`/${getHolidaySlug(h.name)}`}
                >
                  {h.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default HolidayPage;
