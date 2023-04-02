import type { FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import Header from "./Header";
import { type Message } from "./types";

export type Inputs = {
  message: string;
};

export type ChatBoxProps = {
  onSubmit?: (data: Inputs) => void;
  messages: {
    messages: Message[];
    pending?: string;
    history: [string, string][];
    pendingSourceDocs?: Document[];
  };
  loading?: boolean;
};

const ChatBox: FC<ChatBoxProps> = ({
  onSubmit,
  messages,
  loading = false,
}: ChatBoxProps) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const _onSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmit?.(data);
    reset();
  };

  return (
    <div className="w-96 rounded-md border border-gray-300 text-sm shadow-md">
      <Header />
      <ChatBody
        messages={messages.messages}
        pendingReply={messages.pending}
        loading={loading}
      />
      <form onSubmit={handleSubmit(_onSubmit)}>
        <ChatInput placeholder="Type a reply..." {...register("message")} />
      </form>
    </div>
  );
};

export default ChatBox;
