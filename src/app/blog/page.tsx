import { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import BlogPostsList from "@/components/BlogPostsList";
import BlogPostsLoading from "@/components/BlogPostsLoading";

export const metadata: Metadata = {
  title: "Blog Kalkulator Dni Roboczych",
  description:
    "Na blogu znajdziesz praktyczne informacje dotyczące dni roboczych, planowania pracy oraz ciekawostki związane z kalendarzem. Sprawdź nasze najnowsze wpisy!",
};

const POSTS_PER_PAGE = 5;

type BlogPostsWrapperProps = {
  searchParamsPromise: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

function BlogPostsWrapper({ searchParamsPromise }: BlogPostsWrapperProps) {
  return (
    <Suspense fallback={<BlogPostsLoading />}>
      <BlogPostsList
        searchParamsPromise={searchParamsPromise}
        postsPerPage={POSTS_PER_PAGE}
      />
    </Suspense>
  );
}

export default async function IndexPage({ searchParams }: PageProps<"/blog">) {
  return (
    <main className="flex min-h-screen flex-col pt-8 pb-20">
      <Link
        href="/"
        className="mb-4 inline-block text-sm text-gray-600 hover:underline"
      >
        ← Powrót do strony głównej
      </Link>
      <h1 className="mb-8 text-center text-4xl leading-[60px] font-extrabold text-[#0F365C] md:text-[60px]">
        <span className="block text-4xl leading-8 -tracking-[1%] md:text-[32px]">
          Blog
        </span>
        Kalkulator Dni Roboczych
      </h1>
      <BlogPostsWrapper searchParamsPromise={searchParams} />

      <div className="mt-8 mb-[200px] rounded-2xl bg-white p-4 text-base leading-[25.6px] font-normal text-[#0F365C] shadow-[20px_19px_50px_0px_#0057BC26]">
        <h2 className="mb-2 text-2xl leading-[29.05px] font-bold text-[#0F365C]">
          O blogu
        </h2>
        <p>
          Na blogu znajdziesz praktyczne informacje dotyczące dni roboczych,
          planowania pracy oraz ciekawostki związane z kalendarzem. Sprawdź
          nasze najnowsze wpisy!
        </p>
      </div>
    </main>
  );
}
