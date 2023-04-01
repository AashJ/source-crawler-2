import type { FC } from "react";

import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import Header from "./Header";

export type ChatBoxProps = {};

const ChatBox: FC<ChatBoxProps> = ({}: ChatBoxProps) => {
  return (
    <div className="w-96 rounded-md border border-gray-300 text-sm shadow-md">
      <Header />
      <ChatBody />
      <form
        onSubmit={(e) => {
          console.log("send message");
          e.preventDefault();
        }}
      >
        <ChatInput placeholder="Type a reply..." />
      </form>
    </div>
  );
};

export default ChatBox;
