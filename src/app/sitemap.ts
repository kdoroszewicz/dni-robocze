import { client } from "@/lib/sanity/client";
import { MetadataRoute } from "next";

const baseUrl = process.env.SITE_URL || "https://kalkulatordniroboczych.pl";
const holidays = [
  "nowy-rok",
  "swieto-trzech-kroli",
  "niedziela-wielkanocna",
  "drugi-dzien-wielkanocy",
  "swieto-panstwowe-swieto-pracy",
  "swieto-narodowe-trzeciego-maja",
  "zielone-swiatki",
  "dzien-bozego-ciala",
  "wniebowziecie-najswietszej-maryi-panny",
  "wszystkich-swietych",
  "narodowe-swieto-niepodleglosci",
  "pierwszy-dzien-bozego-narodzenia",
  "drugi-dzien-bozego-narodzenia",
  // Alternative URLs for some holidays
  "wnmp",
  "3maj",
  "wielkanoc",
  "swieto-niepodleglosci",
  "swieto-pracy",
  "boze-cialo",
] as const;

type Post = {
  slug: string;
  _updatedAt: string;
};

async function getAllPosts(): Promise<Post[]> {
  return await client.fetch(`*[_type == "post"] {
    "slug": slug.current,
    _updatedAt
  }`);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const postsSitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
  ];

  const blogRoutes = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...postsSitemap,
  ];

  // Add holiday routes
  const holidayRoutes = holidays.map((holiday) => ({
    url: `${baseUrl}/${holiday}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes, ...holidayRoutes];
}
