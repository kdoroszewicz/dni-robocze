import IndexPage from "./IndexPage";

/**
 * Forces correct timezone during build od Vercel, without it ClosesHoliday
 * component can be off by 1 day when rendering on the server vs on the client
 */
process.env.TZ = "Europe/Warsaw";

const currentYear = new Date().getFullYear();

export const metadata = {
  title: `Kalkulator Dni Roboczych ${currentYear}`,
  description:
    "Dzięki kalkulatorowi dowiesz się ile jest dni roboczych pomiędzy dwoma podanymi datami lub kiedy wypada data końcowa od określonej liczby dni roboczych. Policz dni robocze!",
  robots: "index, follow",
};

export const dynamic = "force-dynamic";

const Page = () => {
  return <IndexPage />;
};

export default Page;
