import { Skeleton } from "./ui/skeleton";

export const BlogPostLoading = () => {
  return (
    <>
      <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <Skeleton className="mb-4 aspect-video w-full rounded-xl" />
        <Skeleton className="mb-2 h-10 w-3/4" />
        <Skeleton className="mb-4 h-4 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </article>
      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <Skeleton className="mb-4 h-8 w-24" />
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </section>
      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <Skeleton className="mb-4 h-8 w-48" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </section>
    </>
  );
};
