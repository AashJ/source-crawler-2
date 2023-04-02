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
    <div className="flex h-[500px] flex-col-reverse overflow-y-scroll rounded-b-md py-2 px-4">
      {pendingReply && (
        <ChatMessage
          variant={"reply"}
          text={pendingReply}
          avatar={{ fallback: "T", src: "" }}
        />
      )}
      {[...messages].reverse().map((message) => {
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
    </div>
  );
};

export default ChatBody;
