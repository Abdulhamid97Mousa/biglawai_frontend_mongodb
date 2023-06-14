"use client";

import {
  DocumentData,
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { db } from "../utils/firebase";
import { Session } from "next-auth";

type Props = {
  message: DocumentData;
  chatId: string;
  session: Session | null;
};

const Message = ({ message, chatId, session }: Props) => {
  const isChatGPT = message.user.name === "ChatGPT";
  const [checked, setChecked] = React.useState(false);

  const handleChange = async () => {
    setChecked(!checked);
    //const { data: session } = useSession();
    const docRef = doc(
      db,
      "users",
      session?.user?.email!,
      "chats",
      chatId,
      "messages",
      message.messageId
    );
    // console.log(docRef.id)
    await setDoc(docRef, { checked: !checked }, { merge: true });
  };

  return (
    <div
      className={`py-3 text-black ${
        !isChatGPT &&
        "bg-[#0c2474]/25 text-left justify-stretch justify-self-auto"
      }`}
    >
      <div className="flex flex-row justify-between">
        <div className="ml-5 mt-1 mb-1 mr-3 text-left flex space-x-5 ">
          <img
            src={message.user.avatar}
            alt=""
            className="h-8 w-8 rounded-md"
          />

          {
            <div className="pt-1 text-base text-justify justify-end text-black ml-5 flex-1 flex space-x-5 ">
              {message.text}
            </div>
          }
        </div>
        {isChatGPT && (
          <input
            type="checkbox"
            className="justify-self-end mr-3 mt-3 self-start"
            checked={message.checked}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
