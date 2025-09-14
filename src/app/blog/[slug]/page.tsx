import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/lib/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

export const metadata: Metadata = {
  title: "Blog KDR",
  robots: "noindex",
};

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options
  );
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1600).height(900).auto("format").url()
    : null;

  return (
    <main className="container mx-auto flex min-h-screen max-w-3xl flex-col gap-4 p-8">
      <Link href="/blog" className="hover:underline">
        ← Wróć do bloga
      </Link>

      <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        {postImageUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={postImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </div>
        )}

        <h1 className="mt-4 mb-2 text-4xl font-bold">{post.title}</h1>

        <p className="text-sm text-gray-500">
          {format(new Date(post.publishedAt), "d MMMM yyyy", { locale: pl })}
        </p>

        <div className="prose mt-4">
          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </div>
      </article>

      {Array.isArray(post.faq) ? (
        <section>
          <header>FAQ</header>
          {post.faq.map((faqEntry) => {
            return (
              <div key={faqEntry._key}>
                {faqEntry.question}: {faqEntry.answer}
              </div>
            );
          })}
        </section>
      ) : null}
    </main>
  );
}
