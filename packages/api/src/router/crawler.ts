import { PlaywrightCrawler } from "crawlee";
import Crawler from "crawler";
import { z } from "zod";

import ingestData from "../lib/ingestData";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const crawlerRouter = createTRPCRouter({
  createIndexes: publicProcedure
    .input(
      z.object({
        url: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input: { url } }) => {
      const crawler = new PlaywrightCrawler({
        // Use the requestHandler to process each of the crawled pages.
        async requestHandler({ request, page, enqueueLinks, log }) {
          // const text = $("body").text();
          console.log("procesing: ", request.url);
          const text = await page.textContent("body");
          const title = await page.title();
          log.info(`Processing ${request.url}...`);
          if (text) {
            await ingestData(text, { source: request.url, title });
          }

          // Extract links from the current page
          // and add them to the crawling queue.
          await enqueueLinks({
            globs: [`${url}/*`, "https://technically.substack.com/p/*"],
          });
        },
      });

      console.log("==========CRAWL============");
      await crawler.run([url]);
      console.log("==========DONE CRAWL============");
      return undefined;
    }),
});
