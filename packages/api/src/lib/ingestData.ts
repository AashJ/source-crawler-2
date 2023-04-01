import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from "langchain/vectorstores";
import chunk from "lodash/chunk";

const PINECONE_INDEX_NAME = "source-crawler";
const PINECONE_NAMESPACE = process.env.PINECONE_NAMESPACE ?? "default";

type Metadata = {
  source: string;
  title: string;
};

export const ingestData = async (text: string, metadata: Metadata) => {
  console.log("===========INGESTING DATA==========");
  const pinecone = new PineconeClient();
  await pinecone.init({
    apiKey: "b256841a-5839-4575-ad6c-2b43e8272f39",
    environment: "us-east1-gcp",
    // environment: process.env.PINECONE_ENVIRONMENT ?? "",
  });

  try {
    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const allTexts = await textSplitter.splitText(text);

    console.log("creating vector store...");

    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(PINECONE_INDEX_NAME); //change to your own index name

    console.log(allTexts.length);

    // /* Pinecone recommends a limit of 100 vectors per upsert request to avoid errors*/
    const chunkSize = 50;
    const metadataArray = [...Array(chunkSize).keys()].map(() => metadata);

    chunk(allTexts, chunkSize).forEach((texts) => {
      void PineconeStore.fromTexts(texts, metadataArray, embeddings, {
        pineconeIndex: index,
        namespace: PINECONE_NAMESPACE,
      });
    });
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to ingest your data");
  }
  console.log("===========DONE INGESTING DATA==========");
};

export default ingestData;
