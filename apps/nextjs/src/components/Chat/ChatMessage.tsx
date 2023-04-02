import { type FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/utils/cn";
import { Avatar, AvatarFallback, AvatarImage } from "../design-system/Avatar";

export type ChatMessageSource = {
  name: string;
  src: string;
};

export type ChatMessageProps = {
  text?: string;
  sources?: ChatMessageSource[];
  avatar?: Avatar;
  loading?: boolean;
} & VariantProps<typeof chatMessageVariants> &
  React.BaseHTMLAttributes<HTMLDivElement>;

const chatMessageVariants = cva(
  "flex rounded-md w-fit max-w-[80%] flex flex-col",
  {
    variants: {
      variant: {
        message: "bg-[#0060a4] text-slate-50",
        reply: "text-slate-900 border border-gray-300",
      },
    },
    defaultVariants: {
      variant: "message",
    },
  },
);

const chatMessageContainerVariants = cva(
  "w-100 flex items-end space-x-2 mt-4",
  {
    variants: {
      variant: {
        message: "justify-end",
        reply: "",
      },
    },
    defaultVariants: {
      variant: "message",
    },
  },
);

type Avatar = {
  src: string;
  fallback: string;
};

const ChatMessage: FC<ChatMessageProps> = ({
  variant,
  text,
  sources,
  avatar,
  loading = false,
  className,
}: ChatMessageProps) => {
  return (
    <div className={cn(chatMessageContainerVariants({ variant }))}>
      {avatar && (
        <Avatar className="h-8 w-8 text-[#0060a4]">
          <AvatarImage src={avatar.src} />
          <AvatarFallback>{avatar.fallback}</AvatarFallback>
        </Avatar>
      )}
      <div className={cn(chatMessageVariants({ variant }), className)}>
        <span className="p-2">
          {loading && "Loading..."}
          {text}
        </span>
        {sources && <ChatMessageSources sources={sources} />}
      </div>
    </div>
  );
};

type ChatMessageSourcesProps = {
  sources: ChatMessageSource[];
};

const ChatMessageSources: FC<ChatMessageSourcesProps> = ({ sources }) => {
  return (
    <div className="flex flex-col space-y-1 border-t border-gray-300 p-2">
      <span className="font-medium text-slate-600">Sources</span>
      {sources.map((source) => {
        return (
          <a
            className="flex flex-row items-center text-slate-500"
            href={source.src}
            key={source.src}
            target="_blank"
            rel="noreferrer"
          >
            <span>{source.name}</span>
          </a>
        );
      })}
    </div>
  );
};

export default ChatMessage;
