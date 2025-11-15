export default function BlogPostsLoading() {
  return (
    <ul className="flex flex-col gap-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <li
          key={i}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-md"
        >
          <div className="mb-4 h-8 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="mb-2 h-4 w-5/6 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        </li>
      ))}
    </ul>
  );
}

