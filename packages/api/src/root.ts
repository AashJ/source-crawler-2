import { chatRouter } from "./router/chat";
import { crawlerRouter } from "./router/crawler";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  crawler: crawlerRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
