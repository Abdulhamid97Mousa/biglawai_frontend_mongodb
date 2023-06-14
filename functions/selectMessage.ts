import { doc, setDoc } from "firebase/firestore";
import { Session } from "next-auth";
import { db } from "../utils/firebase";
import { DocumentData } from "firebase-admin/firestore";



const selectMessage = async (setChecked: React.Dispatch< React.SetStateAction<boolean>>,
    checked: boolean, session: Session|null, message: DocumentData, 
    chatId: string) => {
    setChecked(!checked);
    const docRef = doc(db, "users", session?.user?.email!,"chats",
      chatId, "messages", message.messageId);
    // console.log(docRef.id)
    await setDoc(docRef, { checked: !checked }, { merge: true });
  };

export default selectMessage  