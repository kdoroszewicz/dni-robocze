export default function BlogPostLoading() {
  return (
    <>
      <div className="mb-4 h-5 w-32 animate-pulse rounded bg-gray-200" />
      <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <div className="relative aspect-video w-full animate-pulse overflow-hidden rounded-xl bg-gray-200" />
        <div className="mt-4 h-10 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-5 w-32 animate-pulse rounded bg-gray-200" />
        <div className="mt-4 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
        </div>
      </article>
    </>
  );
}

