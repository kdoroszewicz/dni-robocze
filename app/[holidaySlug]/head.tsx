import { getHolidaySlug } from "../../services/utils";
import { getHoliday } from "./page";

export default async function Head({ params }) {
  const holiday = await getHoliday(params);

  return (
    <>
      <title>{`${holiday.name} — Kalkulator Dni Roboczych`}</title>
      <link
        rel="canonical"
        href={`https://kalkulatordniroboczych.pl/${getHolidaySlug(
          holiday.name
        )}`}
      />
      <meta
        name="description"
        content={`${holiday.name} — Kiedy wypada święto? Czy jest wolne od pracy?`}
      />
    </>
  );
}
