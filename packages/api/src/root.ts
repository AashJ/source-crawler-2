import { authRouter } from "./router/auth";
import { chatRouter } from "./router/chat";
import { crawlerRouter } from "./router/crawler";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  crawler: crawlerRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
