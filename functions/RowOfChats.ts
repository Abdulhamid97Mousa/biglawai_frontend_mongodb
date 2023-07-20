import { Session } from "next-auth";

const RowOfChats = async (session: Session | null) => {
  const res = await fetch(`/api/ChatRows?userId=${session?.user?.email}`);
  const chats = await res.json();

  return chats;
};

export default RowOfChats;
