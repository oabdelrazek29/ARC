export type TutorSessionPayload = {
  explanation: string;
  example: string;
  practiceQuestion: string;
  hint: string;
  followUp: string;
};

export type TutorChatMessage = {
  id: string;
  role: "user" | "assistant";
  text?: string;
  payload?: TutorSessionPayload;
  attachments?: { name: string; type: string }[];
  demo?: boolean;
  /** Server had OPENAI_API_KEY when this reply was generated */
  configured?: boolean;
};

export type TutorAttachment = {
  id: string;
  name: string;
  type: string;
  /** Plain text for documents */
  text?: string;
  /** data:image/...;base64,... for vision */
  dataUrl?: string;
};
