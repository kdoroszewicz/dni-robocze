import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

import { client } from "@/lib/sanity/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog KDR",
  robots: "noindex",
};

const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  "excerpt": array::join(string::split(pt::text(body), "")[0..199], "")
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
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
