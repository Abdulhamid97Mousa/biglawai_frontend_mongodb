import type { Message } from "@/typings";

interface DownloadRequestBody {
  userEmail: string;
  chatId: string;
}

export const sendDownload = async (userEmail: string, chatId: string): Promise<Message[]> => {
  const requestBody: DownloadRequestBody = {
    userEmail,
    chatId,
  };

  const response = await fetch("/api/SendDownload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const data: Message[] = await response.json();
  return data;
};