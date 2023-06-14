"use client";
import { useState } from "react";
import Chat from "../../../../components/Chat";
import ChatInput from "../../../../components/ChatInput";
import Features from "../../../../components/Features";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const [currentResponse, setCurrentResponse] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [hidePii, setHidePii] = useState(true);
  const [lang, setLang] = useState("english");

  const handlePersonInfo = () => {
    setHidePii(!hidePii);
  };

  return (
    <div className="flex">
      <div className=" flex-1 bg-white ml-10  border-2  border-[#d4d4d4]  h-screen:1000 rounded-md py-10 relative">
        <div className="absolute flex flex-row top-0 right-0  mr-10 mt-3">
          <button
            type="button"
            onClick={handlePersonInfo}
            className={`p-1 mr-1 rounded-md text-white ${
              hidePii === true ? "bg-blue-700" : "bg-red-700"
            }`}
          >
            {hidePii === true ? (
              <span>Hide personal information</span>
            ) : (
              <span>Show personal information</span>
            )}
          </button>
          <Features
            placeHolder="Select Language"
            currentLang={lang}
            setLang={setLang}
          />
        </div>

        <Chat
          chatId={id}
          currentResponse={currentResponse}
          currentQuestion={currentQuestion}
        />
        <div className="flex-1 mr-5 ml-5  ">
          <ChatInput
            chatId={id}
            lang={lang}
            hidePii={hidePii}
            setResponse={setCurrentResponse}
            setCurrentQuestion={setCurrentQuestion}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
