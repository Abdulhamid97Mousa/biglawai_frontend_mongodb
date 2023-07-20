import { Message as MessageType } from "@/typings";

const getMessages = async (
  userEmail: string,
  chatId: string
): Promise<MessageType[]> => {
  const res = await fetch(
    `/api/GetMessages?userEmail=${userEmail}&chatId=${chatId}`
  );

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new TypeError("Expected array but received:" + typeof data);
  }

  return data;
};

export default getMessages;
