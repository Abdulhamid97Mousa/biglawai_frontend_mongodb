import React, { useEffect, useState } from "react";
import { Session } from "next-auth";
import selectMessage from "../functions/selectMessage";
import { Message as MessageType } from "@/typings"; // your Message type

type Props = {
  message: MessageType;
  chatId: string;
  session: Session | null;
};

const Message = ({ message, chatId, session }: Props) => {
  const isCreatedByUser = message.createdBy !== "ChatGPT";
  const isCreatedByChatGPT = message.createdBy === "ChatGPT";
  const [checked, setChecked] = useState(message.checked);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [messageWords, setMessageWords] = useState<string[]>([]);
  const [streamed, setStreamed] = useState(message.streamed);

  const streamSpeed = 50; // speed of the stream in milliseconds, adjust as needed

  useEffect(() => {
    if (isCreatedByChatGPT) {
      if (streamed) {
        setDisplayedMessage(message.content);
      } else {
        setMessageWords(message.content.split(" "));
      }
    }
  }, [message.content, isCreatedByChatGPT, streamed]);

  useEffect(() => {
    if (messageWords.length > 0 && displayedMessage !== message.content) {
      const intervalId = setInterval(async () => {
        const newDisplayedMessage = displayedMessage + " " + messageWords[0];
        setDisplayedMessage(newDisplayedMessage);
        setMessageWords((prevWords) => prevWords.slice(1));

        if (messageWords.length === 1) {
          try {
            const response = await fetch("/api/GetStreamed", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ messageId: message.messageId }),
            });

            if (!response.ok) {
              throw new Error("Response was not ok");
            }

            setStreamed(true);
          } catch (error) {
            console.error(error);
          }
        }
      }, streamSpeed);

      return () => clearInterval(intervalId);
    }
  }, [
    messageWords,
    streamSpeed,
    displayedMessage,
    message.content,
    message.messageId,
  ]);

  const avatarImageSrc = isCreatedByChatGPT
    ? "https://user-uploads-thumbs.shutterstock.com/aws-cloudfront-user-asset-uploads-prod-us-east-1/uploads/09a8e748-3309-412a-91d0-96787a52622a/p/b5d5bdfb5a22f98ecb3dceafc3c25ff1f0d41201/1681627208118/Picture1/png/1681627211/1500x1500/fit/0e5e82f5a287f328b5c6fcb18ca9d9e2b7986a21/Picture1.jpg"
    : session?.user?.image ||
      `https://ui-avatars.com/api/?name=${session?.user?.name}`;

  return (
    <div
      className={`py-3 text-black ${
        isCreatedByUser &&
        "bg-[#0c2474]/25 text-left justify-stretch justify-self-auto"
      }`}
    >
      <div className="flex flex-row justify-between">
        <div className="ml-5 mt-1 mb-1 mr-3 text-left flex space-x-5 ">
          <img
            src={avatarImageSrc}
            alt="User Avatar"
            className="h-8 w-8 rounded-md"
          />

          {
            <div className="pt-1 text-base text-justify justify-end text-black ml-5 flex-1 flex space-x-5 ">
              {isCreatedByChatGPT ? displayedMessage : message.content}
            </div>
          }
        </div>
        {isCreatedByChatGPT && (
          <input
            type="checkbox"
            className="justify-self-end mr-3 mt-3 self-start"
            checked={checked}
            onChange={() =>
              selectMessage(setChecked, checked, session, message, chatId)
            }
          />
        )}
      </div>
    </div>
  );
};

export default Message;
