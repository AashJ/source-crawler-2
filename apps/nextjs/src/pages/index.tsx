import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";
import ChatBox from "~/components/Chat/ChatBox";
import { Button } from "~/components/design-system/Button";
import { Input } from "~/components/design-system/Input";

const Home: NextPage = () => {
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const crawlMutation = api.crawler.createIndexes.useMutation();
  const [response, setResponse] = useState("");
  const [sourceDocument, setSourceDocument] = useState(undefined);

  const handleSendMessage = async () => {
    setResponse("");
    console.log(message);
    const response = await fetch("/api/chat", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ question: message, history: [] }),
    });

    const data = response.body;
    if (!data) return;

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      let isSourceDocs = false;
      try {
        // there's probably a much better way to do this
        const sourceDocuments = JSON.parse(chunkValue);
        isSourceDocs = true;
        setSourceDocument(sourceDocuments);
      } catch (e) {}
      if (!isSourceDocs) {
        setResponse((prev) => prev + chunkValue);
      }
    }
  };

  return (
    <>
      <Head>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
          <Input
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            value={url}
          />
          <Button
            onClick={() => {
              void crawlMutation.mutate({ url });
            }}
          >
            Crawl
          </Button>
          <Input value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button onClick={handleSendMessage}>message</Button>
          <p>{response}</p>
          <p>
            {sourceDocument?.sourceDocs.map((document) => (
              <span>{document.pageContent}</span>
            ))}
          </p>
        </div>
        <ChatBox />
      </main>
    </>
  );
};

export default Home;
