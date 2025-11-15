import { cacheLife } from "next/cache";

export async function getCurrentYear(): Promise<number> {
  "use cache";
  // Cache for 1 day since year changes once per year
  cacheLife("days");
  return new Date().getFullYear();
}

