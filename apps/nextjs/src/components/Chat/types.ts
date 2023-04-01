export type Message = {
  type: "message" | "reply";
  message: string;
  isStreaming?: boolean;
  sourceDocs?: Document[];
};
