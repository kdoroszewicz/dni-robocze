// import { Providers } from "./providers";
import BaseLayout from "./BaseLayout";
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        {/* <Providers> */}
        <BaseLayout>{children}</BaseLayout>
        {/* </Providers> */}
      </body>
    </html>
  );
}
