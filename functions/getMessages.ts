import { Firestore, collection, orderBy, query } from "firebase/firestore";
import { Session } from "next-auth";
import { useCollection } from "react-firebase-hooks/firestore";



const getMessages = (db: Firestore, session: Session|null, chatId: string)=>{
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
      return messages
}

export default getMessages
