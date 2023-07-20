import { Session } from "next-auth";

const deleteChat = async (session: Session | null, chatId: string) => {
  // console.log("Deleting chat with id:", chatId); // Add this line

  const res = await fetch(
    `/api/GetChatRows?userId=${session?.user?.email}&chatId=${chatId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res;
};

export default deleteChat;
