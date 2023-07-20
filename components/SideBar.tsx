"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import NewChat from "../components/NewChat";
import ChatRow from "./ChatRow";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import deleteChat from "../functions/deleteChat";
import { useRouter } from "next/navigation";

type Chat = {
  id: string;
  // include other properties of the chat object here as needed
};

const SideBar = () => {
  const { data: session } = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      fetch(`/api/GetChatRows?userId=${session.user?.email}`)
        .then((response) => response.json())
        .then((data) => setChats(data));
    }
  }, [session]);

  const handleNewChat = (newChat: Chat) => {
    setChats((prevChats) => [...prevChats, newChat]);
  };

  const removeChat = useCallback(
    async (id: string) => {
      // Find the index of the current chat in the array
      const currentChatIndex = chats.findIndex((chat) => chat.id === id);

      // Delete the chat
      await deleteChat(session, id);

      // Filter out the deleted chat from state
      const updatedChats = chats.filter((chat) => chat.id !== id);
      setChats(updatedChats);

      // If there's no more chats left, navigate to /Tryout
      if (updatedChats.length === 0) {
        router.push("/Tryout");
      } else {
        let nextChatId;
        // If there is a chat before the current one, navigate to it
        if (currentChatIndex > 0) {
          nextChatId = updatedChats[currentChatIndex - 1].id;
        }
        // Otherwise, navigate to the chat after the current one
        else {
          nextChatId = updatedChats[currentChatIndex]?.id;
        }
        if (nextChatId) {
          router.push(`/Tryout/chat/${nextChatId}`);
        }
      }
    },
    [chats, session, router]
  ); // Add dependencies for useCallback

  return (
    <>
      <div className="p-6  border-2 border-[#d4d4d4] bg-white rounded-md mt-10 flex-col">
        <div className="border-[#d4d4d4] border-2 rounded-md">
          {session && (
            <div className="cursor-pointer hover:opacity-50 flex items-center">
              <img
                src={
                  session.user?.image ||
                  `https://ui-avatars.com/api/?name=${session.user?.name}`
                }
                alt="Profile Picture"
                className="ml-4 h-12 w-12 rounded-md cursor-pointer space-y-4 mt-4 mb-6 hover:opacity-50"
              />
              <div className="ml-3 mr-3 flex-1">
                <span className="text-sm text-black overflow-wrap break-all">
                  {session.user?.email}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 mb-2   overflow-y-auto h-[300px]">
          <div className="border-2 border-[#d4d4d4] rounded-lg bg-[#0c2474]">
            <NewChat onNewChat={handleNewChat} />
          </div>
          <div>
            {chats.map((chat) => (
              <ChatRow
                key={chat.id}
                id={chat.id}
                removeChat={removeChat}
                userEmail={session?.user?.email || ""}
              />
            ))}
          </div>
        </div>

        <div className="mt-[20px] flex overflow-x-auto rounded-lg border-2 border-[#d4d4d4] text-left text-black   ">
          <ul className="flex-1">
            <li
              className="flex-1 overflow-x-auto text-left text-black  px-5 py-3 text-sm  space-x-2
            hover:bg-[#0c2474]/50 cursor-pointer  transition-all duration-200 ease-out"
            >
              Dark mode
            </li>
            <li
              className="flex-1 overflow-x-auto text-left text-black  px-5 py-3 text-sm  space-x-2
            hover:bg-[#0c2474]/50 cursor-pointer  transition-all duration-200 ease-out"
            >
              Updata & FAQ
            </li>
            <li
              className="flex-1 overflow-x-auto text-left text-black  px-5 py-3 text-sm  space-x-2
      hover:bg-[#0c2474]/50 cursor-pointer  transition-all duration-200 ease-out"
            >
              Contact Us
            </li>
            {session && (
              <li
                typeof="onSubmit"
                onClick={() => signOut()}
                className="flex overflow-x-auto text-left text-black  px-5 py-3 text-sm  space-x-2 hover:bg-red-300/50 cursor-pointer  transition-all duration-200 ease-out"
              >
                Logout
                <ArrowRightOnRectangleIcon className="ml-2 h-4 w-4 mt-1  flex right" />
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
