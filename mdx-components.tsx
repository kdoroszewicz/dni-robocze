import type { MDXComponents } from "mdx/types";

const Heading1 = ({ children }) => {
  return <h1 className="mb-4 text-4xl font-semibold">{children}</h1>;
};

const Heading2 = ({ children }) => {
  return <h2 className="mb-4 text-2xl font-semibold">{children}</h2>;
};

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: Heading1,
    h2: Heading2,
    ...components,
  };
}
