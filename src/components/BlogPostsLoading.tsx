import { Skeleton } from "./ui/skeleton";

export const BlogPostsLoading = () => {
  return (
    <>
      <ul className="flex flex-col gap-6">
        {[...Array(5)].map((_, i) => (
          <li
            key={i}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-md"
          >
            <Skeleton className="mb-4 h-8 w-3/4" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-5/6" />
            <Skeleton className="h-4 w-32" />
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Skeleton className="h-10 w-full max-w-[300px] mx-auto" />
      </div>
    </>
  );
};

