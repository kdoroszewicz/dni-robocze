import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";

const theme = {
  styles: {
    global: {
      "html, body": {
        backgroundColor: "gray.50",
      },
    },
  },
};

const extededTheme = extendTheme(theme);

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={extededTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default App;
