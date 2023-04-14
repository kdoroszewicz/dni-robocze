import IndexPage from "./IndexPage";
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
