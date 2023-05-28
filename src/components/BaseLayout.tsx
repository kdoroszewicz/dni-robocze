import React from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout-wrapper relative">
      <div className="layout relative mx-auto h-full w-full max-w-[782px] px-8 py-8 md:px-0">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
