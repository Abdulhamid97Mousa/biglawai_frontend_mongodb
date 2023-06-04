import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/queryApi";
import admin from "firebase-admin";
import { adminDb } from "../../utils/firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, session, model } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "please provide a prompt" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "please provide a chat id" });
    return;
  }

  //chatgpt query
  const response = await query(prompt, chatId, model);
  const messageId = Date.now().toString();
  const message: Message = {
    text: response || "ChatGPT was unable to find an answer for that question!",
    createdAt: admin.firestore.Timestamp.now(),
    messageId: messageId,
    checked: false,
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://tools.avans.nl/tools/image/uqd6fNMrU3.jpg",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .doc(messageId)
    .set(message);

  res.status(200).json({ answer: message.text });
}
