import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

export default defineCloudflareConfig({
  // R2 incremental cache for ISR data
  incrementalCache: r2IncrementalCache,
  // Durable Object–backed queue for time-based revalidation
  // Matches the "small site using revalidation" setup in the docs:
  // https://opennext.js.org/cloudflare/caching#small-site-using-revalidation
  queue: doQueue,
});
