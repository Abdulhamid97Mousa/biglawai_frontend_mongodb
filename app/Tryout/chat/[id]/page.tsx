"use client";

import { useEffect, useState } from "react";
import Chat from "../../../../components/Chat";
import ChatInput from "../../../../components/ChatInput";
import Features from "../../../../components/Features";
import { useSession } from "next-auth/react";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const { data: session } = useSession();
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentResponse, setCurrentResponse] = useState("");
  const [hidePii, setHidePii] = useState(true);
  const [lang, setLang] = useState("english");
  const [userEmail, setUserEmail] = useState("");

  const handlePersonInfo = () => {
    setHidePii(!hidePii);
  };

  useEffect(() => {
    if (session) {
      setUserEmail(session.user?.email ?? "");
    }
  }, [session]);

  return (
    <>
      <div className="flex mt-10">
        <div className="flex flex-col flex-1 bg-white ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10 border-2 border-[#d4d4d4] h-screen:1000 rounded-md py-10 relative">
          <div className="absolute flex flex-row top-0 right-0 mr-10 mt-3">
            <button
              type="button"
              onClick={handlePersonInfo}
              className={`p-1 mr-5 rounded-md border-[#d4d4d4] border-2 text-black hover:bg-[#0c2474]/50 ${
                hidePii === true ? "bg-blue-300" : "bg-red-700"
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
            userEmail={userEmail} // Updated
            chatId={id}
            currentResponse={currentResponse}
            currentQuestion={currentQuestion}
          />

          <ChatInput
            userEmail={userEmail} // Updated
            chatId={id}
            lang={lang}
            hidePii={hidePii}
            setCurrentResponse={setCurrentResponse}
            setCurrentQuestion={setCurrentQuestion}
          />
        </div>
      </div>
    </>
  );
}

export default ChatPage;
