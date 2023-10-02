"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { BoxComponent } from "@/components/BoxComponent";
import { Session } from "inspector";

type Props = {
  params: {
    id: string;
  };
};

function Dashboard({ params: { id } }: Props) {
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const router = useRouter();

  const navigateToChat = async () => {
    try {
      if (!session) {
        throw new Error("User session not found");
      }

      const response = await fetch("/api/getChatId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: session!.user?.email }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chat ID");
      }

      const data = await response.json();

      if (data.chatId) {
        router.push(`/Logged-in/chat/${data.chatId}`);
      } else {
        // Handle the case where chatId is not available
      }
    } catch (error) {
      console.error("Error fetching chat ID:", error);
      // Handle the error as needed
    }
  };

  // const navigateToFullAgreement = () => {
  //   router.push(`/Logged-in/FullAgreementCrafting/${id}`);
  // };

  // const navigateToSearchThroughLawSuits = () => {
  //  router.push(`/Logged-in/navigateToSearchThroughLawSuits/${id}`);
  // };

  return (
    <div className="flex  h-full ">
      <div className="bg-[#202123] w-[250px] p-5 flex flex-col justify-between h-full">
        <div className="flex-grow max-h-[76vh] overflow-y-auto bg-[#202123] text-white">
          <div className="bg-[#202123] rounded-md  border-white/40 border-2">
            {session && (
              <div className="cursor-pointer hover:opacity-50 flex items-center">
                <img
                  src={
                    session.user?.image ||
                    `https://ui-avatars.com/api/?name=${session.user?.name}`
                  }
                  alt="Profile Picture"
                  className="ml-4 h-8 w-8 rounded-md cursor-pointer space-y-2 mt-4 mb-6 hover:opacity-50"
                />
                <div className=" mr-3 flex-1 flex flex-col justify-center w-full">
                  <span className="text-sm text-white overflow-wrap break-all text-center justify-center">
                    {session.user?.name}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div
            className={` mt-5 flex items-center justify-between rounded-md h-[50px] px-5 py-3 text-sm space-x-2 hover:bg-[#2a2b32] cursor-pointer transition-all duration-200 ease-out border-white/40 border-2
            ${active ? "bg-[#343541]" : ""}`}
            onClick={navigateToChat}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-robot"
              viewBox="0 0 16 16"
            >
              <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z" />
              <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z" />
            </svg>
            Chat with BIGLAW-AI
          </div>

          <div
            className={` mt-5 flex items-center justify-between rounded-md h-[50px] px-5 py-3 text-sm space-x-2 hover:bg-[#2a2b32] cursor-pointer transition-all duration-200 ease-out border-white/40 border-2
          ${active ? "bg-[#343541]" : ""}`}
            onClick={navigateToChat}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-square "
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            Draft full agreements
          </div>

          <div
            className={` mt-5 flex items-center justify-between rounded-md h-[50px] px-5 py-3 text-sm space-x-2 hover:bg-[#2a2b32] cursor-pointer transition-all duration-200 ease-out border-white/40 border-2
          ${active ? "bg-[#343541]" : ""}`}
            onClick={navigateToChat}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            Biglaw-ai search tool
          </div>

          <div
            className={` mt-5 flex items-center justify-between rounded-md h-[50px] px-5 py-3 text-sm space-x-2 hover:bg-[#2a2b32] cursor-pointer transition-all duration-200 ease-out border-white/40 border-2
          ${active ? "bg-[#343541]" : ""}`}
            onClick={() => signOut()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
              />
              <path
                fill-rule="evenodd"
                d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
              />
            </svg>
            Bye Bye BIGLAW-AI
          </div>
        </div>
      </div>

      <div className="flex flex-1 text-black mt-4 mb-6 mr-5 ml-5">
        <BoxComponent
          caption="Chat with BIGLAW-AI"
          description="Start a conversation with our AI chatbot."
          functionality="your AI-powered chatbot. By clicking on this box, users can initiate a chat session with the chatbot. It offers a convenient and interactive way for users to seek information, assistance, or answers to legal questions from your AI chatbot. Whether it's legal advice, guidance, or general inquiries, users can begin their conversations right from this box. The chatbot can provide prompt and helpful responses to user queries."
          onClick={navigateToChat}
        />
        <BoxComponent
          caption="Draft full agreements"
          description="Create legal agreements with our drafting tool."
          functionality="By clicking on this box, users can navigate to a dedicated page or interface where they can create comprehensive legal agreements. Whether it's contracts, agreements, or other legal documents, users have the capability to generate and customize these documents with ease. The tool likely offers templates, customization options, and guidance to help users draft legally sound and tailored agreements, making it a valuable resource for legal professionals and individuals alike."
          onClick={navigateToChat}
        />
        <BoxComponent
          caption="Biglaw-ai search tool"
          description="Search through legal documents and lawsuits."
          functionality="By clicking on this box grants users access to a robust search engine designed to explore a vast repository of legal documents, cases, and lawsuits. Users can input keywords, phrases, or queries to search for relevant legal information and documents. The tool may offer advanced search filters, document previews, and other features to streamline the research process. Legal professionals and researchers can utilize this tool to efficiently gather insights and access valuable legal resources."
          onClick={navigateToChat}
        />
      </div>
    </div>
  );
}

export default Dashboard;
