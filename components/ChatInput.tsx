"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import DownloadButton from "./Download";
import sendMessage from "@/functions/sendMessage";
import handleFileSelect from "@/functions/handleUploadFile";
import { useEffect } from "react";

// import handleFileSelect from "../functions/handleUploadFile";

type Props = {
  userEmail: string;
  chatId: string;
  lang: string;
  hidePii: boolean;
  setCurrentResponse: Dispatch<SetStateAction<string>>;
  setCurrentQuestion: Dispatch<SetStateAction<string>>;
};

function ChatInput({
  userEmail,
  chatId,
  lang,
  hidePii,
  setCurrentResponse,
  setCurrentQuestion,
}: Props) {
  const [prompt, setPrompt] = useState("");
  const [isRequestActive, setIsRequestActive] = useState(false);
  const { data: session } = useSession();
  const [filePath, setFilePath] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`/api/GetUploadedFile?chatId=${chatId}`);

        // only proceed if the request was successful
        if (response.ok) {
          const data = await response.json();
          setFileName(data.file.filename);
        } else if (response.status === 404) {
          // File not found, handle accordingly
          // console.log(`No file found for chatId ${chatId}`);
        } else {
          // Some other status code, you might want to handle this too
          // console.error(`Unexpected status code ${response.status}`);
        }
      } catch (error) {
        // handle any other errors (e.g. network errors)
        // console.error(error);
      }
    };
    fetchFile();
  }, [chatId]);

  return (
    <>
      <div className="flex-grow bg-white text-black border-2 border-[#d4d4d4] rounded-md text-base mr-2 sm:mr-4 md:mr-6 lg:mr-8 xl:mr-10 ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10 mb-5 mt-5">
        <form
          onSubmit={(e) => {
            sendMessage(
              e,
              prompt,
              setPrompt,
              setCurrentQuestion,
              setCurrentResponse,
              session,
              chatId,
              lang,
              hidePii,
              userEmail,
              setIsRequestActive // added this
            );
          }}
          className=" p-5 space-x-5  flex"
        >
          <div className="bg-[#ecf7ff]  flex-grow rounded-md border-2 border-[#d4d4d4] ">
            <input
              className="
              disabled:cursor-not-allowed pl-2 pt-1 pb-1 w-full disabled:text-gray-300 bg-[#ecf7ff] "
              disabled={!session || isRequestActive} // add isLoading here
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
              name="chatMessage"
              placeholder=" Type your message here...."
            />
          </div>
          <button
            disabled={!prompt || !session || isRequestActive} // and here
            type="submit"
            className="bg-[#0c2474] hover:opacity-50   text-white font-bold px-4 py-2 rounded disabled:bg-[gray-300] disabled:cursor-not-allowed block"
          >
            <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
          </button>
        </form>

        <div className="flex items-center space-x-5 ml-5 mb-5">
          <button
            disabled={!session}
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-1  border-2 border-gray-300 rounded-md text-black bg-[#93c5fd] flex-row hover:bg-[#0c2474]/50"
          >
            Upload Document
          </button>
          <DownloadButton session={session} chatId={chatId} />
          {fileName && (
            <div
              className="
                p-1 
                border-2 
                border-gray-300 
                rounded-md 
                text-black 
                bg-white
                flex-row 
                hover:bg-[#0c2474]/50 
                overflow-hidden 
                overflow-ellipsis 
                whitespace-nowrap
                max-w-[30ch]"
              style={{ minWidth: "fit-content" }}
            >
              {fileName}
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={async () => {
              const file = fileInputRef.current?.files?.[0];
              if (file) {
                setFilePath(await handleFileSelect(file, session, chatId));
                setFileName(file.name);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ChatInput;
