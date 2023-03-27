import { PineconeClient } from "@pinecone-database/pinecone";
import { type Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { PineconeStore } from "langchain/vectorstores";
import { z } from "zod";

import makeQAChain from "../lib/chains/QAChain";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const chatRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ ctx, input: { message } }) => {
      console.log("==============SENDING MESSAGE=============");
      const pinecone = new PineconeClient();
      await pinecone.init({
        apiKey: process.env.PINECONE_API_KEY ?? "",
        environment: process.env.PINECONE_ENVIRONMENT ?? "",
      });

      const sanitizedQuestion = message.trim().replaceAll("\n", " ");

      const index = pinecone.Index("source-crawler");

      const vectorStore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings(),
        { pineconeIndex: index, namespace: "test" },
      );

      const qaChain = makeQAChain(vectorStore);

      console.log("made qa chain");

      //Ask a question
      const response = await qaChain.call({
        question: sanitizedQuestion,
        chat_history: [],
      });

      console.log(response);

      return {
        text: String(response.text),
        documents: response.sourceDocuments as Document[],
      };
    }),
});
