import {
  DocumentData,
  QuerySnapshot,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import uuid from "react-uuid";
import { db } from "../utils/firebase";
import { Session } from "next-auth";
import getMemo from "./getMemory";

const bigLaw_req_answer = async (
  input: string,
  hidePii: boolean,
  lang: string,
  messages: QuerySnapshot<DocumentData> | undefined,
  setResponse: Dispatch<SetStateAction<string>>,
  session: Session | null,
  chatId: string
) => {
  let memo = getMemo(messages);
  const body = {
    id: uuid().toString(),
    query: input,
    ts_path: null,
    hide_pii: hidePii,
    output_language: lang,
    response: memo.toString(),
    outline: "dry_lease_of_aircraft",
  };
  var text: string = "";
  const url = `${process.env.NEXT_PUBLIC_CHATINPUT}`;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response?.body?.getReader();
    })
    .then((reader) => {
      function readStream() {
        reader?.read().then(async ({ done, value }) => {
          if (done) {
            await setDoc(
              doc(
                db,
                `users/${session?.user?.email!}/chats/${chatId}/messages`,
                body.id
              ),
              {
                text:
                  text ||
                  "BigLaw-AI was unable to find an answer for that question!",
                createdAt: serverTimestamp(),
                messageId: body.id,
                checked: false,
                user: {
                  _id: "ChatGPT",
                  name: "ChatGPT",
                  avatar:
                    "https://user-uploads-thumbs.shutterstock.com/aws-cloudfront-user-asset-uploads-prod-us-east-1/uploads/09a8e748-3309-412a-91d0-96787a52622a/p/b5d5bdfb5a22f98ecb3dceafc3c25ff1f0d41201/1681627208118/Picture1/png/1681627211/1500x1500/fit/0e5e82f5a287f328b5c6fcb18ca9d9e2b7986a21/Picture1.jpg",
                },
              }
            );
            return;
          }
          const decoder = new TextDecoder("utf-8");
          const decodedString = decoder.decode(value);
          try {
            const res = JSON.parse(decodedString);
            text = text + res["response"];
            setResponse(text);
          } catch (error) {
          } finally {
            text = text;
            setResponse(text);
          }
          readStream();
        });
      }
      readStream();
    });
};

export default bigLaw_req_answer;
