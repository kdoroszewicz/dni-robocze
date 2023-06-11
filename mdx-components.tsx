import type { MDXComponents } from "mdx/types";

const Heading1 = ({ children }: any) => {
  return <h1 className="mb-4 text-4xl font-semibold">{children}</h1>;
};

const Heading2 = ({ children }: any) => {
  return <h2 className="mb-2 mt-8 text-2xl font-bold">{children}</h2>;
};

const P = ({ children }: any) => {
  return <p className="text-base font-normal leading-[25.6px]">{children}</p>;
};

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: Heading1,
    h2: Heading2,
    p: P,
    ...components,
  };
}
