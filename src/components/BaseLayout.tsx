"use client";

import React from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout h-full mx-auto py-8 px-8 w-full md:max-w-screen-sm md:px-0">
      {children}
    </div>
  );
};

export default Layout;
