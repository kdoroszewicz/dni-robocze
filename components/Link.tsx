import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

type LinkProps = NextLinkProps & ChakraLinkProps;

const Link = ({
  href,
  as,
  locale,
  passHref,
  prefetch,
  replace,
  scroll,
  shallow,
  children,
  ...chakraLinkProps
}: LinkProps) => {
  return (
    <NextLink
      href={href}
      passHref={passHref}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      as={as}
      locale={locale}
      legacyBehavior
    >
      <ChakraLink href={href} {...chakraLinkProps}>
        {children}
      </ChakraLink>
    </NextLink>
  );
};

export default Link;
