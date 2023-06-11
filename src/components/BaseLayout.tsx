"use client";

import React from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout-wrapper relative flex justify-center overflow-hidden">
      <div className="layout relative mt-[44px] h-full w-full max-w-[782px] px-4 md:mx-0 md:mt-16">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
