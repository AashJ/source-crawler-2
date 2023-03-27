import Crawler from "crawler";
import { z } from "zod";

import ingestData from "../lib/ingestData";
import { createTRPCRouter, publicProcedure } from "../trpc";

const c = new Crawler({
  maxConnections: 10,

  // This will be called for each crawled page
  callback: async (error, res, done) => {
    const $ = res.$;
    const text = $("body").text();
    await ingestData(text);
    done();
  },
});

export const crawlerRouter = createTRPCRouter({
  createIndexes: publicProcedure
    .input(
      z.object({
        url: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input: { url } }) => {
      console.log("==========CRAWL============");
      c.queue(url);
      console.log("==========DONE CRAWL============");
      return undefined;
    }),
});
