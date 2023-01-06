import React from "react";
import NextLink, { LinkProps } from "next/link";

const Link = ({ ...props }: LinkProps) => {
  return <NextLink {...props} />;
};

export default Link;
