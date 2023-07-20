import { PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import createNewChat from "../functions/createNewChat";
import { NewChat } from "@/typings";

type NewChatProps = {
  onNewChat: (newChat: NewChat) => void;
};

const NewChat = ({ onNewChat }: NewChatProps) => {
  const { data: session } = useSession();

  const handleNewChat = async () => {
    const newChat = await createNewChat(session);
    if (!newChat.userEmail) {
      // Handle this error appropriately
      console.error("User email is not defined!");
    } else {
      onNewChat(newChat);
    }
  };

  return (
    <div
      className="border-3 border-gray-700/70 rounded-md h-[50px] px-5 py-3 text-sm flex space-x-2 hover:bg-blue-700/70 cursor-pointer text-white transition-all duration-200 ease-out"
      onClick={handleNewChat}
    >
      <PlusIcon className="h-4 w-4 mt-[3px]" />
      <p className="mt-[2px]">New Chat</p>
    </div>
  );
};

export default NewChat;
