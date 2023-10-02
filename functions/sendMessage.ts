import { Dispatch, FormEvent, SetStateAction } from "react";
import getMemory from "./getMemory";
import { Session } from "next-auth";
import bigLaw_req_answer from "./request";
import openAI_req_answer from "./openai";
import toast from "react-hot-toast";

const sendMessage = async (
  e: FormEvent<HTMLFormElement>,
  prompt: string,
  setPrompt: Dispatch<SetStateAction<string>>,
  setCurrentQuestion: Dispatch<SetStateAction<string>>,
  setCurrentResponse: Dispatch<SetStateAction<string>>,
  session: Session | null,
  chatId: string,
  lang: string,
  hidePii: boolean,
  userEmail: string,
  setIsRequestActive: Dispatch<SetStateAction<boolean>>,
  selectedServer: string, //this mandatory
  openAIKey?: string // this is optional
) => {
  e.preventDefault();
  if (!prompt) return;
  const input = prompt.trim();
  setCurrentQuestion(input);
  setPrompt("");
  setIsRequestActive(true);

  const message = {
    input: input,
    chatId: chatId,
    userEmail: userEmail,
    lang: lang,
  };

  try {
    const res = await fetch("/api/SendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!res.ok) {
      const errorData = await res.json();
      toast.error(
        `Error sending message from function. Response: ${JSON.stringify(
          errorData
        )}`
      );
      throw new Error(
        `Error sending message from function. Response: ${JSON.stringify(
          errorData
        )}`
      );
    }

    const resData = await res.json();

    if (resData.message === "Message sent successfully!") {
      const messages = await getMemory(chatId);

      // Depending on the selectedServer call different functions
      if (selectedServer === "bigLaw") {
        console.log(selectedServer);
        bigLaw_req_answer(
          input,
          hidePii,
          lang,
          messages,
          setCurrentResponse,
          session,
          chatId,
          setIsRequestActive
        );
      } else if (selectedServer === "openAI") {
        console.log(selectedServer, "the selected server");
        console.log(openAIKey, "the inserted key");
        openAI_req_answer(
          input,
          setCurrentResponse,
          setIsRequestActive,
          session,
          chatId,
          openAIKey
        );
      }
    }
  } catch (error) {
    toast.error(`Error sending message: ${error}`);
    console.error(error);
  }
};

export default sendMessage;
