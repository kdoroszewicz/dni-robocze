import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      className="layout"
      h="100vh"
      width={{ base: "100%", md: "2xl" }}
      mx="auto"
      py={6}
      px={{ base: 6, md: 0 }}
    >
      {children}
    </Box>
  );
};

export default Layout;
