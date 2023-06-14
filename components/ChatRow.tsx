import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";
import getMessages from "../functions/getMessages";

type Props = {
  id: string;
};

const ChatRow = ({ id }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  var messages = getMessages(db, session, id);

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("Tryout/");
  };

  return (
    <div className=" border-[#d4d4d4] border-2 rounded-md">
      <Link
        href={`Tryout/chat/${id}`}
        className={`px-5 py-3 rounded-md  text-sm flex space-x-2 
      hover:bg-[#0c2474]/50 cursor-pointer text-black transition-all duration-200 ease-out justify-center h-[45px] ${
        active && "bg-[#0c2474]/50  rounded-md "
      }`}
      >
        <ChatBubbleLeftIcon className="h-5 w-5 " />
        <p className="flex-1 hidden md:inline-flex truncate">
          {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
        </p>
        <TrashIcon
          onClick={removeChat}
          className="h-5 w-5 text-gray-700 hover:text-red-700"
        />
      </Link>
    </div>
  );
};

export default ChatRow;
