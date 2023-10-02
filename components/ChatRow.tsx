"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import getMessages from "../functions/getMessages";
import { Message as MessageType } from "@/typings";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

type Props = {
  id: string;
  userEmail: string;
  removeChat: (id: string) => Promise<void>;
  deletingChatId: string | null;
};

const ChatRow = ({ id, userEmail, removeChat, deletingChatId }: Props) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [lastMessage, setLastMessage] = useState<MessageType | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState(false);

  const navigateToChat = () => {
    router.push(`/Logged-in/chat/${id}`);
  };

  useEffect(() => {
    setActive(pathname!.includes(id));
  }, [pathname, id]);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessages(userEmail, id);
      setMessages(data);
      setLastMessage(data[data.length - 1] || null);
    };

    fetchMessages(); // fetch messages once when the component mounts

    const intervalId = setInterval(fetchMessages, 1000); // fetch new messages every 1 seconds

    return () => {
      clearInterval(intervalId); // clean up on unmount
    };
  }, [id, userEmail]);

  const handleRemove = async (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (deletingChatId !== null && deletingChatId !== id) {
      return;
    }

    await removeChat(id);
  };

  return (
    <div
      className={`flex items-center justify-between rounded-md h-[50px] px-5 py-3 text-sm space-x-2 hover:bg-[#2a2b32] cursor-pointer transition-all duration-200 ease-out text-black ${
        active ? "bg-[#343541]" : ""
      }`}
      onClick={navigateToChat}
    >
      <ChatBubbleOutlineIcon className="h-5 w-5 text-white" />
      <p className="flex-1 hidden md:inline-flex truncate text-white overflow-hidden whitespace-nowrap max-w-[170px]">
        {lastMessage?.content || "New Chat"}
      </p>
      <FaRegTrashAlt
        onClick={handleRemove}
        className={`h-4 w-4 text-white hover:text-red-700 ${
          deletingChatId !== null
            ? deletingChatId === id
              ? "text-red-700"
              : "opacity-50 cursor-not-allowed"
            : ""
        }`}
      />
    </div>
  );
};

export default ChatRow;
