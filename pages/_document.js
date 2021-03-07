import Document, { Html, Head, Main, NextScript } from "next/document";

const GA_TRACKING_ID = "G-1J9SF3P3BK";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            async
            defer
            data-domain="kalkulatordniroboczych.pl"
            src="https://stats.kalkulatordniroboczych.pl/js/index.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
