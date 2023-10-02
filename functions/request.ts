import { Dispatch, SetStateAction } from "react";
import uuid from "react-uuid";
import { Session } from "next-auth";
import toast from "react-hot-toast";

const bigLaw_req_answer = async (
  input: string,
  hidePii: boolean,
  lang: string,
  messages: string[],
  setCurrentResponse: Dispatch<SetStateAction<string>>,
  session: Session | null,
  chatId: string,
  setIsRequestActive: Dispatch<SetStateAction<boolean>>
) => {
  setIsRequestActive(true); // Set to true before sending request

  const memo = messages;
  // console.log("memory", memo);
  // console.log("current language", lang);

  const body = {
    id: uuid().toString(),
    query: input,
    ts_path: null,
    hide_pii: hidePii,
    output_language: lang,
    response: memo.toString(),
    outline: "dry_lease_of_aircraft",
    session: session,
  };

  const url = process.env.NEXT_PUBLIC_CHATINPUT!;

  const sendRequest = async () => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Response not OK");
    }

    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";
      let completeResponse = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        result += decoder.decode(value);

        if (result.endsWith("}")) {
          const responseData = JSON.parse(result.trim());
          result = "";

          // Concatenate the "response" values
          completeResponse += responseData?.response || "";
        }
      }

      const text =
        completeResponse ||
        "BigLaw-AI was unable to find an answer for that question!";
      setCurrentResponse(text);

      await fetch("/api/SaveResponse", {
        method: "POST",
        body: JSON.stringify({
          text: text,
          messageId: body.id,
          chatId: chatId,
          userEmail: session?.user?.email,
          lang: body.output_language,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        toast.error("Error:", error);
        throw new Error("Error while saving response");
      });
    }
  };

  toast.promise(
    sendRequest(),
    {
      loading: "Your message is being sent to our backend server...",
      success: "The backend server has responded to your message!",
      error: "An error occurred",
    },
    {
      success: {
        duration: 4000,
        // icon: "🔥",
      },
      error: {
        duration: 5000,
        //icon: "😥",
      },
    }
  );

  setIsRequestActive(false); // Set to false after the request is completed
};

export default bigLaw_req_answer;
