import BlogPost from "./BlogPost";

type BlogPostContentProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostContent({
  params,
}: BlogPostContentProps) {
  const { slug } = await params;

  return <BlogPost slug={slug} />;
}
