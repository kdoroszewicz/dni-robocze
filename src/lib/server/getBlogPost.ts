import { cacheLife, cacheTag } from "next/cache";
import { type SanityDocument } from "next-sanity";
import { client } from "@/lib/sanity/client";

const BLOG_POSTS_TAG = "blog-posts";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  ...,
  "excerpt": array::join(string::split(pt::text(body), ". ")[0..0], ". "),
  "latestPosts": *[_type == "post" && publishedAt < now() && slug.current != $slug] | order(publishedAt desc)[0...3]{
    title,
    slug
  }
}`;

export async function getBlogPost(slug: string): Promise<SanityDocument> {
  "use cache";
  // Cache for 1 week as safety net, but can be invalidated immediately via revalidateTag("blog-posts")
  // When a new post is published, call revalidateTag("blog-posts") to update immediately
  cacheLife("weeks");
  cacheTag(BLOG_POSTS_TAG);
  return await client.fetch<SanityDocument>(POST_QUERY, { slug });
}
