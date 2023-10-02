import { prisma } from "@/lib/prisma";

export type Chat = {
  id: string;
  userEmail: string | null | undefined;
  messages: Message[];
  files: File[];
  createdAt: Date;
};

export type Message = {
  id: string;
  messageId: string;
  content: string;
  checked: boolean;
  createdAt: Date;
  chatId: string;
  userEmail: string;
  createdBy: string | null;
  lang: string | null;
  streamed: boolean; // add this line
  liked: boolean;
  disliked: boolean;
};
export interface SendMessageRequestBody {
  input: string;
  chatId: string;
  userEmail: string;
  lang: string;
}

export type User = {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  createdAt: Date;
  emailVerified?: Date | null;
};

export type File = {
  id: string;
  createdAt: Date;
  fileData: Buffer;
  filename: String;
  mimetype: String;
  chatId: String;
};

export type NewChat = {
  id: string;
  createdAt: Date;
  userEmail: string | null | undefined;
};
