import { PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import createNewChat from "../functions/createNewChat";
import { NewChat } from "@/typings";
import { useRouter } from "next/navigation";

type NewChatProps = {
  onNewChat: (newChat: NewChat) => void;
};

const NewChat = ({ onNewChat }: NewChatProps) => {
  const { data: session } = useSession();

  const router = useRouter();

  const handleNewChat = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    const newChat = await createNewChat(session);
    if (!newChat.userEmail) {
      // Handle this error appropriately
      console.error("User email is not defined!");
    } else {
      onNewChat(newChat);
      // router.push(`/Logged-in/chat/${newChat.id}`); // Use the router to navigate to the new chat page
    }
  };

  return (
    <div
      className="flex p-3 items-center gap-3 transition-colors duration-200 text-white cursor-pointer text-sm rounded-md border border-white/20 hover:bg-gray-500/10 h-11 flex-shrink-0 flex-grow"
      onClick={handleNewChat}
    >
      <PlusIcon className="h-4 w-4 mt-[3px]" />
      <p className="mt-[2px]">New Chat</p>
    </div>
  );
};

export default NewChat;
