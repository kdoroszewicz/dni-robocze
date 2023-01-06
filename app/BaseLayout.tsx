"use client";

import React from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className="layout"
      h="100vh"
      width={{ base: "100%", md: "2xl" }}
      mx="auto"
      py={6}
      px={{ base: 6, md: 0 }}
    >
      {children}
    </div>
  );
};

export default Layout;
