"use client";

import { useEffect, useState } from "react";
import Chat from "../../../../components/Chat";
import ChatInput from "../../../../components/ChatInput";

import { useSession } from "next-auth/react";
import SideBar from "@/components/SideBar";

import NavFeatures from "@/components/NavFeatures";

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
  const [selectedServer, setSelectedServer] = useState("bigLaw");
  const [openAIKey, setOpenAIKey] = useState("");

  const handlePersonInfo = () => {
    setHidePii(!hidePii);
  };

  useEffect(() => {
    if (session) {
      setUserEmail(session.user?.email ?? "");
    }
  }, [session]);

  const [showSidebar, setShowSidebar] = useState(true); // state to manage sidebar visibility

  return (
    <>
      <div className="flex h-screen">
        {showSidebar && (
          <div className="flex flex-col h-full w-76  bg-[#202123]">
            <SideBar setShowSidebar={setShowSidebar} />
          </div>
        )}
        <div className="flex flex-col flex-auto bg-white relative">
          <NavFeatures
            hidePii={hidePii}
            handlePersonInfo={handlePersonInfo}
            lang={lang}
            setLang={setLang}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            selectedServer={selectedServer}
            setSelectedServer={setSelectedServer}
            openAIKey={openAIKey}
            setOpenAIKey={setOpenAIKey}
          />
          <div className="overflow-y-auto flex-grow">
            <Chat
              userEmail={userEmail}
              chatId={id}
              currentResponse={currentResponse}
              currentQuestion={currentQuestion}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <ChatInput
              userEmail={userEmail}
              chatId={id}
              lang={lang}
              hidePii={hidePii}
              setCurrentResponse={setCurrentResponse}
              setCurrentQuestion={setCurrentQuestion}
              selectedServer={selectedServer}
              openAIKey={openAIKey}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
