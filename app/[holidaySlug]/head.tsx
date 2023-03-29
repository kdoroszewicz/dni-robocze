import { getHoliday, getHolidaySlug } from "../../services/utils";

export default async function Head({ params }) {
  const holiday = await getHoliday(params);

  if (!holiday) {
    return (
      <>
        <title>Kalkulator Dni Roboczych</title>
      </>
    );
  }

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
