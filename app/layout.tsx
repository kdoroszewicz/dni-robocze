// import { Providers } from "./providers";
import BaseLayout from "../components/BaseLayout";
import "../styles/global.css";
import GoogleAnalytics from "./GoogleAnalytics";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <GoogleAnalytics GA_TRACKING_ID={process.env.GA_TRACKING_ID} />
      <body className="bg-gray-50">
        {/* <Providers> */}
        <BaseLayout>{children}</BaseLayout>
        {/* </Providers> */}
      </body>
    </html>
  );
}
