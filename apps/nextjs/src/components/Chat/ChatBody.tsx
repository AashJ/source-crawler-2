import React, { type FC } from "react";
import uniqBy from "lodash/uniqBy";

import ChatMessage, { type ChatMessageSource } from "./ChatMessage";
import { type Message } from "./types";

export type ChatBodyProps = {
  messages: Message[];
  pendingReply?: string;
};

const ChatBody: FC<ChatBodyProps> = ({
  messages,
  pendingReply,
}: ChatBodyProps) => {
  return (
    <div className="h-[500px] space-y-4 overflow-y-scroll rounded-b-md py-2 px-4">
      {messages.map((message) => {
        const thisMessageSources: ChatMessageSource[] = uniqBy(
          message.sourceDocs?.map((source) => {
            const sourceWithMetadata = source as any;
            return {
              name: sourceWithMetadata.metadata.title,
              src: sourceWithMetadata.metadata.source,
            } as ChatMessageSource;
          }),
          (data) => {
            console.log(data);
            return data?.name;
          },
        ).filter((data) => data !== undefined);
        return (
          <ChatMessage
            variant={message.type}
            text={message.message}
            avatar={
              message.type === "reply" ? { fallback: "T", src: "" } : undefined
            }
            sources={thisMessageSources.length ? thisMessageSources : undefined}
          />
        );
      })}
      {pendingReply && (
        <ChatMessage
          variant={"reply"}
          text={pendingReply}
          avatar={{ fallback: "T", src: "" }}
        />
      )}
    </div>
  );
};

export default ChatBody;
