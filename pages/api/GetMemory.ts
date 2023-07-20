import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed. Use GET." });
  }

  const { chatId } = req.query;

  if (!chatId) {
    return res.status(400).json({ error: "Missing chatId in the request" });
  }

  const messages = await prisma.message.findMany({
    where: {
      chatId: chatId as string,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const memory = messages
    .filter((message) => message.userEmail !== "ChatGPT")
    .map((message) => message.content);

  //console.log(memory, "the memory part");
  return res.status(200).json(memory);
};
