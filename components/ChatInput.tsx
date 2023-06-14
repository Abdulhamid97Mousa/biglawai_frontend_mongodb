"use client";

import {
  uploadBytesResumable,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";

import { useSession } from "next-auth/react";
import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { APPLICATION, db, refStorage } from "../utils/firebase";
import DownloadButton from "./Download";
import { v4 as uuid } from "uuid";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
  chatId: string;
  lang: string;
  hidePii: boolean;
  setResponse: Dispatch<SetStateAction<string>>;
  setCurrentQuestion: Dispatch<SetStateAction<string>>;
};

function ChatInput({
  chatId,
  lang,
  hidePii,
  setResponse,
  setCurrentQuestion,
}: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const [filePath, setFilePath] = useState("");
  const [res, setRes] = useState("");
  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );
  const getMemo = (messages: QuerySnapshot<DocumentData> | undefined) => {
    var memory = [];

    var i = messages?.docs.length;
    if (typeof i !== "undefined") {
      for (let k = 0; k < i; k++) {
        var doc = messages!.docs[k];
        if (doc.data().user.name === "ChatGPT") {
          memory.push(doc.data().text);
        }
      }
    }
    return memory;
  };

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let memo = getMemo(messages);
    console.log(memo);
    if (!prompt) return;
    const input = prompt.trim();
    setCurrentQuestion(input);
    setPrompt("");

    const messageId = Date.now().toString();
    const message: Message = {
      text: input,
      messageId: messageId,
      checked: false,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await setDoc(
      doc(
        db,
        `users/${session?.user?.email!}/chats/${chatId}/messages`,
        messageId
      ),
      message
    );

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
    const url = `${process.env.CHATINPUT}`;
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
              console.log("Stream complete");
              return;
            }
            const decoder = new TextDecoder("utf-8");
            const decodedString = decoder.decode(value);
            try {
              const res = JSON.parse(decodedString);
              text = text + res["response"];
              setResponse(text);
              setRes(text);
            } catch (error) {
              console.log(error);
            } finally {
              text = text;
              setResponse(text);
              setRes(text);
            }

            // console.log('Received chunk of data:',res['response']);
            readStream();
          });
        }
        readStream();
      });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileSelect = async () => {
    if (fileInputRef.current) {
      const file = fileInputRef.current.files?.[0];
      if (file) {
        const path = `users/${session?.user?.email!}/chats/${chatId}`;
        const storage = getStorage(
          APPLICATION,
          "gs://chatgpt-messenger-20187.appspot.com/"
        );
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setFilePath(downloadURL);
              console.log("File available at", downloadURL);
            });
          }
        );
      }
    }
  };

  return (
    <>
      <div className=" bg-white text-black border-2 border-[#d4d4d4] rounded-md  text-base mr-5 ml-5 mb-5 mt-5">
        <form onSubmit={sendMessage} className=" p-5 space-x-5  flex">
          {/*<input
            type="file"
            disabled={!session}
            ref={fileInputRef}
            onChange={handleFileSelect}
            
            className="p-1 mb-2 rounded-md text-white bg-blue-700/100"
  />*/}

          <div className="bg-[#ecf7ff]  flex-grow rounded-md border-2 border-[#d4d4d4] ">
            <input
              className="
               disabled:cursor-not-allowed pl-2 w-full disabled:text-gray-300 bg-[#ecf7ff] "
              disabled={!session}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
              placeholder=" Type your message here...."
            />
          </div>
          <button
            disabled={!prompt || !session}
            type="submit"
            className="bg-[#0c2474] hover:opacity-50   text-white font-bold px-4 py-2 rounded disabled:bg-[gray-300] disabled:cursor-not-allowed block"
          >
            <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
          </button>
        </form>
        <button
          disabled={!session}
          type="button"
          onClick={handleFileSelect}
          className="p-1  ml-5 rounded-md text-white bg-blue-700/100 flex-row "
        >
          Upload Document
        </button>
        <DownloadButton session={session} chatId={chatId} />
        <div>{/* <ModelSelection /> */}</div>
      </div>
    </>
  );
}

export default ChatInput;
