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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options
  );

  return {
    title: `${post.title} - Kalkulator Dni Roboczych`,
    description:
      post.excerpt || "Przeczytaj artykuł na blogu Kalkulatora Dni Roboczych",
  };
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  ...,
  "excerpt": array::join(string::split(pt::text(body), ". ")[0..0], ". ")
}`;

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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    image: postImageUrl ? [postImageUrl] : [],
    author: {
      "@type": "Organization",
      name: "Kalkulator Dni Roboczych",
      url: "https://kalkulatordniroboczych.pl",
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
    <main className="container mx-auto flex min-h-screen max-w-3xl flex-col gap-4 p-8">
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
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
    </main>
  );
}
