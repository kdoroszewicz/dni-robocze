import { cacheLife, cacheTag } from "next/cache";
import { type SanityDocument } from "next-sanity";
import { client } from "@/lib/sanity/client";

const BLOG_POSTS_TAG = "blog-posts";

export async function getBlogPosts(
  start: number,
  end: number
): Promise<SanityDocument[]> {
  "use cache";
  // Cache for 1 week as safety net, but can be invalidated immediately via revalidateTag("blog-posts")
  // When a new post is published, call revalidateTag("blog-posts") to update immediately
  cacheLife("weeks");
  cacheTag(BLOG_POSTS_TAG);
  return await client.fetch<SanityDocument[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [${start}...${end}]{
      _id,
      title,
      slug,
      publishedAt,
      "excerpt": array::join(string::split(pt::text(body), "")[0..199], "")
    }`
  );
}

export async function getBlogPostsCount(): Promise<number> {
  "use cache";
  // Cache for 1 week as safety net, but can be invalidated immediately via revalidateTag("blog-posts")
  cacheLife("weeks");
  cacheTag(BLOG_POSTS_TAG);
  return await client.fetch<number>(
    `count(*[_type == "post" && defined(slug.current)])`
  );
}

