import NextLink, { LinkProps } from "next/link";
import { HTMLAttributes } from "react";

const Link = ({ ...props }: HTMLAttributes<HTMLAnchorElement> & LinkProps) => {
  return <NextLink {...props} />;
};

export default Link;
