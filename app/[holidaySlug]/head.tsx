import { getHoliday, getHolidaySlug } from "../../services/utils";

export default async function Head({ params }) {
  const holiday = await getHoliday(params);
  const currentYear = new Date().getFullYear();

  if (!holiday) {
    return (
      <>
        <title>Kalkulator Dni Roboczych {currentYear}</title>
      </>
    );
  }

  return (
    <>
      <title>{`${holiday.name} — Kalkulator Dni Roboczych ${currentYear}`}</title>
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
