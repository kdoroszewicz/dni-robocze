import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

import { client } from "@/lib/sanity/client";
import { Metadata } from "next";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const metadata: Metadata = {
  title: "Blog Kalkulator Dni Roboczych",
  description:
    "Na blogu znajdziesz praktyczne informacje dotyczące dni roboczych, planowania pracy oraz ciekawostki związane z kalendarzem. Sprawdź nasze najnowsze wpisy!",
};

const POSTS_PER_PAGE = 5;

const options = { next: { revalidate: 30 } };

export default async function IndexPage({ searchParams }: PageProps<"/blog">) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const [posts, totalCount] = await Promise.all([
    client.fetch<SanityDocument[]>(
      `*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[$start...$end]{
        _id,
        title,
        slug,
        publishedAt,
        "excerpt": array::join(string::split(pt::text(body), "")[0..199], "")
      }`,
      { start, end },
      options
    ),
    client.fetch<number>(
      `count(*[_type == "post" && defined(slug.current)])`,
      {},
      options
    ),
  ]);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
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
      <ul className="flex flex-col gap-6">
        {posts.map((post) => (
          <li
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
            key={post._id}
          >
            <Link href={`/blog/${post.slug.current}`}>
              <h2 className="mb-4 text-2xl font-bold text-[#0F365C]">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mb-2 line-clamp-2 overflow-hidden text-gray-600">
                  {post.excerpt}
                </p>
              )}
              <p className="text-sm text-gray-500">
                {format(new Date(post.publishedAt), "d MMMM yyyy", {
                  locale: pl,
                })}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {totalCount > POSTS_PER_PAGE && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent className="grid min-w-[300px] grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div className="flex justify-start">
                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious href={`/blog?page=${page - 1}`} />
                  </PaginationItem>
                )}
              </div>

              <div className="flex items-center justify-center gap-1">
                {[...Array(Math.ceil(totalCount / POSTS_PER_PAGE))].map(
                  (_, i) => {
                    const pageNumber = i + 1;
                    // Show first page, last page, and pages around current page
                    if (
                      pageNumber === 1 ||
                      pageNumber === Math.ceil(totalCount / POSTS_PER_PAGE) ||
                      (pageNumber >= page - 1 && pageNumber <= page + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href={`/blog?page=${pageNumber}`}
                            isActive={pageNumber === page}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      pageNumber === page - 2 ||
                      pageNumber === page + 2
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  }
                )}
              </div>

              <div className="flex justify-end">
                {page < Math.ceil(totalCount / POSTS_PER_PAGE) && (
                  <PaginationItem>
                    <PaginationNext href={`/blog?page=${page + 1}`} />
                  </PaginationItem>
                )}
              </div>
            </PaginationContent>
          </Pagination>
        </div>
      )}

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
