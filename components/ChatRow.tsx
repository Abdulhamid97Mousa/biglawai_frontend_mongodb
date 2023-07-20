"use client";

import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import getMessages from "../functions/getMessages";
import { Message as MessageType } from "@/typings";
import React, { useEffect, useState } from "react";

type Props = {
  id: string;
  userEmail: string;
  removeChat: (id: string) => Promise<void>;
};

const ChatRow = ({ id, userEmail, removeChat }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [lastMessage, setLastMessage] = useState<MessageType | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState(false);

  const navigateToChat = () => {
    router.push(`/Tryout/chat/${id}`);
  };

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessages(userEmail, id);
      setMessages(data);
      setLastMessage(data[data.length - 1] || null);
    };

    fetchMessages(); // fetch messages once when the component mounts

    const intervalId = setInterval(fetchMessages, 3000); // fetch new messages every 1 seconds

    return () => {
      clearInterval(intervalId); // clean up on unmount
    };
  }, [id, userEmail]);

  const handleRemove = async (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation(); // stop event propagation
    event.preventDefault(); // prevent navigation

    if (isDeleting) {
      // If a delete request is already in process, ignore subsequent clicks
      return;
    }

    setIsDeleting(true);
    try {
      await removeChat(id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className=" border-[#d4d4d4] border-2 rounded-md"
      onClick={navigateToChat}
    >
      <div
        className={`px-5 py-3 rounded-md  text-sm flex space-x-2 
      hover:bg-[#0c2474]/50 cursor-pointer text-black transition-all duration-200 ease-out justify-center h-[45px] ${
        active && "bg-[#0c2474]/50  rounded-md "
      }`}
      >
        <ChatBubbleLeftIcon className="h-5 w-5 " />
        <p className="flex-1 hidden md:inline-flex truncate">
          {lastMessage?.content || "New Chat"}
        </p>
        <TrashIcon
          onClick={handleRemove}
          className={`h-5 w-5 text-gray-700 hover:text-red-700 ${
            isDeleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default ChatRow;
