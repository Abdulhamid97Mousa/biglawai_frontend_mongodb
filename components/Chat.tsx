"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { Message as MessageType } from "@/typings";
import Message from "./Message";
import getMessages from "../functions/getMessages";

type Props = {
  userEmail: string;
  chatId: string;
  currentResponse: string;
  currentQuestion: string;
};

function Chat({ userEmail, chatId, currentResponse, currentQuestion }: Props) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await getMessages(userEmail, chatId);
      setMessages(response);
    };

    fetchMessages(); // fetch messages once when the component mounts

    const intervalId = setInterval(fetchMessages, 3000); // fetch new messages every 1 seconds

    return () => {
      clearInterval(intervalId); // clean up on unmount
    };
  }, [userEmail, chatId]);

  return (
    <div className="flex-grow  overflow-x-hidden overflow-y-scroll max-h-[65vh] ">
      {messages.length === 0 && (
        <div>
          <p className="mt-10 text-center text-black text-base animate-pulse">
            Type a prompt in below to get started
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-10 text-black animate-bounce" />
        </div>
      )}

      <div className="text-left justify-evenly">
        {messages.map((message, index) => (
          <Message
            key={message.messageId}
            chatId={chatId}
            session={session}
            message={message}
          />
        ))}
      </div>
    </div>
  );
}

export default Chat;
