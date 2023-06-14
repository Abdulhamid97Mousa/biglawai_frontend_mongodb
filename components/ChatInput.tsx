"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useState } from "react";

import { useSession } from "next-auth/react";
import { db } from "../utils/firebase";
import DownloadButton from "./Download";
import getMessages from "../functions/getMessages";
import handleFileSelect from "../functions/handleUploadFile";
import sendMessage from "../functions/sendMessage";

type Props = {
  chatId: string;
  lang: string;
  hidePii: boolean;
  setResponse: Dispatch<SetStateAction<string>>;
  setCurrentQuestion: Dispatch<SetStateAction<string>>;
};

function ChatInput({
  chatId,
  lang,
  hidePii,
  setResponse,
  setCurrentQuestion,
}: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const [filePath, setFilePath] = useState("");
  const messages = getMessages(db, session, chatId);

  return (
    <>
      <div className=" bg-white text-black border-2 border-[#d4d4d4] rounded-md  text-base mr-5 ml-5 mb-5 mt-5">
        <form
          onSubmit={(e) =>
            sendMessage(
              e,
              messages,
              prompt,
              setPrompt,
              setCurrentQuestion,
              setResponse,
              session,
              chatId,
              lang,
              hidePii
            )
          }
          className=" p-5 space-x-5  flex"
        >
          <div className="bg-[#ecf7ff]  flex-grow rounded-md border-2 border-[#d4d4d4] ">
            <input
              className="
               disabled:cursor-not-allowed pl-2 w-full disabled:text-gray-300 bg-[#ecf7ff] "
              disabled={!session}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
              placeholder=" Type your message here...."
            />
          </div>
          <button
            disabled={!prompt || !session}
            type="submit"
            className="bg-[#0c2474] hover:opacity-50   text-white font-bold px-4 py-2 rounded disabled:bg-[gray-300] disabled:cursor-not-allowed block"
          >
            <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
          </button>
        </form>
        <button
          disabled={!session}
          type="button"
          onClick={async () =>
            setFilePath(await handleFileSelect(session, chatId))
          }
          className="p-1  ml-5 rounded-md text-white bg-blue-700/100 flex-row "
        >
          Upload Document
        </button>
        <DownloadButton session={session} chatId={chatId} />
        <div>{/* <ModelSelection /> */}</div>
      </div>
    </>
  );
}

export default ChatInput;
