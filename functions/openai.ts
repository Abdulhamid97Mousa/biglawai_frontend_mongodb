import { Dispatch, SetStateAction } from "react";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import uuid from "react-uuid";

const openAI_req_answer = async (
  input: string,
  setCurrentResponse: Dispatch<SetStateAction<string>>,
  setIsRequestActive: Dispatch<SetStateAction<boolean>>,
  session: Session | null,
  chatId: string,
  openAIKey?: string //optional
) => {
  setIsRequestActive(true); // Set to true before sending request

  // Check if openAIKey is provided. If not, notify the user and terminate the function early.
  if (!openAIKey) {
    toast.error(
      "OpenAI key not provided. If you want to use gpt-3.5-turbo, please insert a key."
    );
    setIsRequestActive(false); // Set to false as the request won't be made
    return;
  }

  const sendRequest = async () => {
    try {
      const response = await fetch("/api/sendToOpenai", {
        method: "POST",
        body: JSON.stringify({ input, openAIKey }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("An error occurred while making a request to OpenAI");
      }

      const data = await response.json();
      let text =
        data.text || "OpenAI was unable to find an answer for that question!";
      setCurrentResponse(text);

      await fetch("/api/SaveResponse", {
        method: "POST",
        body: JSON.stringify({
          text: text,
          messageId: uuid().toString(),
          chatId: chatId,
          userEmail: session?.user?.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        toast.error("Error:", error);
        throw new Error("Error while saving response");
      });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while making a request to OpenAI");
    } finally {
      setIsRequestActive(false); // Set to false after the request is completed
    }
  };

  toast.promise(
    sendRequest(),
    {
      loading: "Your message is being sent to OpenAI...",
      success: "OpenAI has responded to your message!",
      error: "An error occurred",
    },
    {
      success: {
        duration: 4000,
      },
      error: {
        duration: 5000,
      },
    }
  );
};

export default openAI_req_answer;
