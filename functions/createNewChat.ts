import { NewChat } from "@/typings";
import { Session } from "next-auth";

const createNewChat = async (session: Session | null): Promise<NewChat> => {
  const res = await fetch("/api/CreateNewChat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: session?.user?.email }),
  });

  const data = await res.json();

  return {
    id: data.id,
    userEmail: session?.user?.email,
    createdAt: data.id.createdAt,
  };
};

export default createNewChat;
