import { Dispatch, FormEvent, SetStateAction } from "react";
import getMemo from "./getMemory";
import { DocumentData, QuerySnapshot, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Session } from "next-auth";
import bigLaw_req_answer from "./request";



const sendMessage = async (e: FormEvent<HTMLFormElement>, 
    messages: QuerySnapshot<DocumentData> | undefined, 
    prompt: string, 
    setPrompt: Dispatch< SetStateAction<string>>,
    setCurrentQuestion: Dispatch< SetStateAction<string>>,
    setResponse: Dispatch< SetStateAction<string>>,
    session: Session | null,
    chatId: string, lang: string, hidePii:boolean) => {
    
    e.preventDefault();
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
    bigLaw_req_answer(input, hidePii, lang, messages, setResponse, session, chatId)
  };
  

export default sendMessage