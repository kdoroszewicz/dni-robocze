import { type SanityDocument } from "next-sanity";
import { client } from "@/lib/sanity/client";
import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";
import BlogPostContent from "@/components/BlogPostContent";
import { BlogPostLoading } from "@/components/BlogPostLoading";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  ...,
  "excerpt": array::join(string::split(pt::text(body), ". ")[0..0], ". ")
}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, {
    next: { revalidate: 30 },
  });

  return {
    title: `${post.title} - Kalkulator Dni Roboczych`,
    description:
      post.excerpt || "Przeczytaj artykuł na blogu Kalkulatora Dni Roboczych",
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="flex min-h-screen flex-col gap-4 pt-8 pb-20">
      <Link
        href="/blog"
        className="mb-4 inline-block text-sm text-gray-600 hover:underline"
      >
        ← Wróć do bloga
      </Link>
      <Suspense fallback={<BlogPostLoading />}>
        <BlogPostContent params={params} />
      </Suspense>
    </main>
  );
}
