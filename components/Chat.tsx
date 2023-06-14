"use client";
import { useSession } from "next-auth/react";
import { db } from "../utils/firebase";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import getMessages from "../functions/getMessages";

type Props = {
  chatId: string;
  currentResponse: string;
  currentQuestion: string;
};

function Chat({ chatId, currentResponse, currentQuestion }: Props) {
  const { data: session } = useSession();
  const [streamResponse, setStreamResponse] = useState("");
  var messages = getMessages(db, session, chatId);
  var iter = 0;
  useEffect(() => {
    // var [messages]:any = getMessages(db, session, chatId)
    if (
      messages?.docs[messages?.docs.length - 1]?.data().text === streamResponse
    ) {
      setStreamResponse("");
    } else if (
      messages?.docs[messages?.docs.length - 1]?.data().text === currentQuestion
    ) {
      if (iter >= 2) {
        setStreamResponse("");
      } else {
        setStreamResponse(currentResponse);
      }
    } else {
      setStreamResponse("");
    }
    iter = iter + 1;
  }, [currentResponse, currentQuestion]);

  return (
    <div className="flex-1   h-[500px]  border-[#d4d4d4] rounded-md border-2  mr-10 ml-10 mt-5 overflow-x-hidden">
      {messages?.empty && (
        <div>
          <p className="mt-10 text-center text-black text-base animate-pulse">
            Type a prompt in below to get started
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-10 text-black animate-bounce" />
        </div>
      )}

      <div className="text-left justify-evenly">
        {messages?.docs.map((message: any, index: number) => (
          <Message
            key={message.id}
            chatId={chatId}
            session={session}
            message={message.data()}
          />
        ))}
        {messages?.docs[messages?.docs.length - 1]?.data().text ===
        streamResponse ? (
          <></>
        ) : (
          <div className="flex ml-5 mr-10 mt-1 mb-1 py-3 flex-row justify-between ">
            <div className="text-left flex space-x-5 ">
              {streamResponse !== "" ? (
                <div className="text-left flex flex-row ">
                  <img
                    src="https://user-uploads-thumbs.shutterstock.com/aws-cloudfront-user-asset-uploads-prod-us-east-1/uploads/09a8e748-3309-412a-91d0-96787a52622a/p/b5d5bdfb5a22f98ecb3dceafc3c25ff1f0d41201/1681627208118/Picture1/png/1681627211/1500x1500/fit/0e5e82f5a287f328b5c6fcb18ca9d9e2b7986a21/Picture1.jpg"
                    alt=""
                    className="h-8 w-8 rounded-md"
                  />
                </div>
              ) : (
                ""
              )}
              <div className="pt-1 text-base text-black text-justify  flex-1 flex space-x-5  justify-end">
                {streamResponse}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
