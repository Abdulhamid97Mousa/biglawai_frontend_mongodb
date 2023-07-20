import { Dispatch, SetStateAction } from "react";
import uuid from "react-uuid";
import { Session } from "next-auth";

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

  // console.log(body.output_language);

  const url = process.env.NEXT_PUBLIC_CHATINPUT!;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

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
        console.error("Error:", error);
        throw new Error("Error while saving response");
      });
    }
  } catch (error) {
    console.error("Error in fetch:", error);
  } finally {
    setIsRequestActive(false); // Set to false after the request is completed
  }
};

export default bigLaw_req_answer;
