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
      const whitelist = ["https://technically.substack.com/p/"];
      const seen = new Set();
      // const c = new Crawler({
      //   maxConnections: 10,

      //   // This will be called for each crawled page
      //   callback: (error, res, done) => {
      //     const $ = res.$;
      //     const thisLink = sanitizeUrl(res.request.uri.href);
      //     console.log("crawling: ", thisLink);
      //     if (seen.has(thisLink)) {
      //       done();
      //     }
      //     seen.add(thisLink);
      //     console.log(seen);
      //     console.log(seen.size);
      //     debugger;
      //     const text = $("body").text();
      //     // console.log("got text", text);

      //     if (thisLink.includes(url)) {
      //       const links = $("a");
      //       $(links).each(function (i, link) {
      //         const href = $(link).attr("href");
      //         if (href) {
      //           if (
      //             whitelist.some((whitelistedLink) =>
      //               href.includes(whitelistedLink),
      //             )
      //           ) {
      //             if (!seen.has(href)) {
      //               console.log("queueing: ", href);
      //               c.queue(sanitizeUrl(href));
      //             }
      //           }
      //           if (href.startsWith("/")) {
      //             if (!seen.has(href)) {
      //               console.log("queueing: ", url + href);
      //               c.queue(sanitizeUrl(url + href));
      //             }
      //           }
      //         }
      //       });
      //     }
      //     // await ingestData(text);
      //     done();
      //   },
      // });

      const crawler = new PlaywrightCrawler({
        // Use the requestHandler to process each of the crawled pages.
        async requestHandler({ request, page, enqueueLinks, log }) {
          // const text = $("body").text();
          console.log("procesing: ", request.url);
          const text = await page.textContent("body");
          log.info(`Processing ${request.url}...`);
          console.log(text);
          if (text) {
            await ingestData(text, { source: request.url });
          }

          // Extract links from the current page
          // and add them to the crawling queue.
          await enqueueLinks({
            globs: [`${url}/*`],
          });
        },
        headless: false,
      });

      console.log("==========CRAWL============");
      await crawler.run([url]);
      console.log("==========DONE CRAWL============");
      return undefined;
    }),
});
