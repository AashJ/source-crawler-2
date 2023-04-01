import { forwardRef, type FC } from "react";

import { cn } from "~/utils/cn";

export type ChatInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "w-full rounded-b-md border-t border-gray-300 px-4 py-2",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
ChatInput.displayName = "Input";

export default ChatInput;
