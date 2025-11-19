import BlogPosts from "./BlogPosts";

type BlogPostsContentProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BlogPostsContent({
  searchParams,
}: BlogPostsContentProps) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;

  return <BlogPosts page={page} />;
}
