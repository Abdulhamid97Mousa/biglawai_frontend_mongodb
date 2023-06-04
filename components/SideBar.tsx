"use client";

import NewChat from "./NewChat";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../utils/firebase";
import ChatRow from "./ChatRow";

const SideBar = () => {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="p-6  border-2 border-[#d4d4d4] bg-white rounded-md ">
      <div className="border-[#d4d4d4] border-2 rounded-md">
        {session && (
          <div className="cursor-pointer hover:opacity-50">
            <span>
              <img
                src={session.user?.image!}
                alt="Profile Picture"
                className="ml-4 h-12 w-12 rounded-md cursor-pointer space-y-4 mt-4 mb-6 hover:opacity-50 inline-block"
              />
            </span>
            <span className="ml-3 text-lg text-black text-center justify-center inline-block">
              {session.user?.name!}
            </span>
          </div>
        )}
      </div>
      <div className="hidden sm:inline ">{/*  <ModelSelection  /> */}</div>
      <div className="mt-4 mb-2   overflow-y-auto h-[320px]">
        <div className="border-2 border-[#d4d4d4] rounded-lg bg-[#0c2474]">
          <NewChat />
        </div>

        <div>
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
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
  );
};

export default SideBar;
