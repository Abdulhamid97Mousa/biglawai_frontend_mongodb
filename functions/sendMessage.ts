import { Dispatch, FormEvent, SetStateAction } from "react";
import getMemory from "./getMemory";
import { Session } from "next-auth";
import bigLaw_req_answer from "./request";

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
  userEmail: string, // Changed to also accept undefined
  setIsRequestActive: Dispatch<SetStateAction<boolean>>
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
    userEmail: userEmail, // added by me
    lang: lang,
  };

  try {
    // Make a fetch request to the /api/SendMessage endpoint
    const res = await fetch("/api/SendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    // Check if the request was successful

    if (!res.ok) {
      const errorData = await res.json(); // Add this line
      throw new Error(
        `Error sending message from function. Response: ${JSON.stringify(
          errorData
        )}`
      );
    }

    const resData = await res.json(); 

    // console.log(resData.data.content);

    // If the message was sent successfully, start the next phase of your logic
    if (resData.message === "Message sent successfully!") {
      // Retrieve messages from the database
      const messages = await getMemory(chatId);
      // console.log(messages, "the function getMemory is working properly");

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
    }
  } catch (error) {
    console.error(error);
  } finally {
  }
};

export default sendMessage;
