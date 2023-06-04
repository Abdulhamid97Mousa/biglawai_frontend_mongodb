"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
///////////////////////////  fix this to navigation not next/router
import { db } from "../utils/firebase";

const NewChat = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );
    router.push(`Tryout/chat/${doc.id}`);
  };
  return (
    <div
      className="border-3 border-gray-700/70  rounded-md h-[50px]  px-5 py-3 text-sm flex space-x-2
      hover:bg-blue-700/70 cursor-pointer text-white transition-all duration-200 ease-out"
      onClick={createNewChat}
    >
      <PlusIcon className="h-4 w-4 mt-[3px]" />
      <p className="mt-[2px]">New Chat</p>
    </div>
  );
};

export default NewChat;
