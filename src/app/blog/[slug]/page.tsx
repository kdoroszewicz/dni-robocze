import { Suspense } from "react";
import BlogPostContent from "@/components/BlogPostContent";
import BlogPostLoading from "@/components/BlogPostLoading";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

function BlogPostWrapper({ paramsPromise }: { paramsPromise: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<BlogPostLoading />}>
      <BlogPostContent paramsPromise={paramsPromise} />
    </Suspense>
  );
}

export default async function PostPage({ params }: PostPageProps) {
  return (
    <main className="flex min-h-screen flex-col gap-4 pt-8 pb-20">
      <BlogPostWrapper paramsPromise={params} />
    </main>
  );
}
