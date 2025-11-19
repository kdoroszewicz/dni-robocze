import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/lib/sanity/client";
import Link from "next/link";
import {
  BlockQuote,
  H1,
  H2,
  H3,
  H4,
  P,
  List,
  InlineCode,
} from "@/components/ui/typography";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata } from "next";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { JsonLd } from "@/components/JsonLd";
import type { BlogPosting, FAQPage, Question, WithContext } from "schema-dts";
import {
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/siteMetadata";

const options = { next: { revalidate: 30 } };
const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const buildPostImageUrl = (image: SanityImageSource | undefined) =>
  image ? urlFor(image)?.width(1600).height(900).auto("format").url() ?? null : null;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    resolvedParams,
    options
  );

  const canonicalPath = post?.slug?.current
    ? `/blog/${post.slug.current}`
    : "/blog";
  const generatedImageUrl = buildPostImageUrl(post?.image);
  const postImageUrl = generatedImageUrl ?? DEFAULT_OG_IMAGE;
  const pageTitle = post?.title ? String(post.title) : SITE_NAME;
  const description =
    post?.excerpt || "Przeczytaj artykuł na blogu Kalkulatora Dni Roboczych";
  const keywords = post?.title
    ? [...DEFAULT_KEYWORDS, String(post.title)]
    : DEFAULT_KEYWORDS;

  const openGraphImages = generatedImageUrl
    ? [
        {
          url: generatedImageUrl,
          width: 1600,
          height: 900,
          alt: pageTitle,
        },
      ]
    : [
        {
          url: DEFAULT_OG_IMAGE,
          width: 512,
          height: 512,
          alt: SITE_NAME,
        },
      ];

  return {
    title: pageTitle,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
    },
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    openGraph: {
      type: "article",
      url: canonicalPath,
      title: pageTitle,
      description,
      siteName: SITE_NAME,
      locale: "pl_PL",
      publishedTime: post?.publishedAt,
      modifiedTime: post?._updatedAt ?? post?.publishedAt,
      images: openGraphImages,
      authors: [SITE_NAME],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [postImageUrl],
    },
  };
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  ...,
  "excerpt": array::join(string::split(pt::text(body), ". ")[0..0], ". "),
  "latestPosts": *[_type == "post" && publishedAt < now() && slug.current != $slug] | order(publishedAt desc)[0...3]{
    title,
    slug
  }
}`;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    resolvedParams,
    options
  );
  const postImageUrl = buildPostImageUrl(post.image);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt ?? post.publishedAt,
    image: postImageUrl ? [postImageUrl] : [],
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  } satisfies WithContext<BlogPosting>;

  const faqSchema =
    post.faq && post.faq.length > 0
      ? ({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map(
            (faqEntry: { _key: string; question: string; answer: string }) =>
              ({
                "@type": "Question",
                name: faqEntry.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faqEntry.answer,
                },
              }) satisfies Question
          ),
        } satisfies WithContext<FAQPage>)
      : null;

  return (
    <main className="flex min-h-screen flex-col gap-4 pt-8 pb-20">
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Link
        href="/blog"
        className="mb-4 inline-block text-sm text-gray-600 hover:underline"
      >
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

        <div className="mt-4">
          {Array.isArray(post.body) && (
            <PortableText
              value={post.body}
              components={{
                block: {
                  h1: ({ children }) => <H1>{children}</H1>,
                  h2: ({ children }) => <H2>{children}</H2>,
                  h3: ({ children }) => <H3>{children}</H3>,
                  h4: ({ children }) => <H4>{children}</H4>,
                  normal: ({ children }) => <P>{children}</P>,
                  blockquote: ({ children }) => (
                    <BlockQuote>{children}</BlockQuote>
                  ),
                },
                list: {
                  bullet: ({ children }) => <List>{children}</List>,
                },
                marks: {
                  code: ({ children }) => <InlineCode>{children}</InlineCode>,
                },
              }}
            />
          )}
        </div>
      </article>

      {Array.isArray(post.faq) && post.faq.length > 0 ? (
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">FAQ</h2>
          <Accordion type="single" collapsible className="w-full">
            {post.faq.map(
              (faqEntry: {
                _key: string;
                question: string;
                answer: string;
              }) => (
                <AccordionItem key={faqEntry._key} value={faqEntry._key}>
                  <AccordionTrigger>{faqEntry.question}</AccordionTrigger>
                  <AccordionContent>{faqEntry.answer}</AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        </section>
      ) : null}

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Najnowsze artykuły</h2>
        {post.latestPosts && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {post.latestPosts.map(
              (latestPost: { title: string; slug: { current: string } }) => (
                <Link
                  key={latestPost.slug.current}
                  href={`/blog/${latestPost.slug.current}`}
                  className="rounded-lg border border-gray-100 p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold">{latestPost.title}</h3>
                </Link>
              )
            )}
          </div>
        )}
      </section>
    </main>
  );
}
