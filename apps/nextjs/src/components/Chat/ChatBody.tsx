import React, { type FC } from "react";

import ChatMessage from "./ChatMessage";

export type ChatBodyProps = {};

const ChatBody: FC<ChatBodyProps> = ({}: ChatBodyProps) => {
  return (
    <div className="h-[500px] space-y-4 rounded-b-md py-2 px-4">
      <ChatMessage
        variant="reply"
        text="Hello how can I help?"
        avatar={{ fallback: "T", src: "" }}
      />
      <ChatMessage text="What is  a postgres resource?" />
      <ChatMessage
        variant="reply"
        text="A PostgreSQL resource is a connection to a PostgreSQL database that requires authentication credentials, connection details, and firewall rules to allow Retool to access the host. It allows users to interact with PostgreSQL data by reading data using SQL queries, writing data using GUI queries, and using the schema browser to search tables or columns."
        sources={[
          { src: "/docs/resources/postgres", name: "Postgres Resource" },
        ]}
        avatar={{ fallback: "T", src: "" }}
      />
    </div>
  );
};

export default ChatBody;
