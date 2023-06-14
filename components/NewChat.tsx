"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
///////////////////////////  fix this to navigation not next/router
import createNewChat from "../functions/createNewChat";

const NewChat = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div
      className="border-3 border-gray-700/70  rounded-md h-[50px]  px-5 py-3 text-sm flex space-x-2
      hover:bg-blue-700/70 cursor-pointer text-white transition-all duration-200 ease-out"
      onClick={() => createNewChat(session, router)}
    >
      <PlusIcon className="h-4 w-4 mt-[3px]" />
      <p className="mt-[2px]">New Chat</p>
    </div>
  );
};

export default NewChat;
