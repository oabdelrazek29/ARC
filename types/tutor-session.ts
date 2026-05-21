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
