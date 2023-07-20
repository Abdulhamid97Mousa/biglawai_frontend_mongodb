// pages/api/ChatRows.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, chatId } = req.query;

  if (req.method === "GET") {
    const userChats = await prisma.chat.findMany({
      where: {
        userId: String(userId),
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(userChats);
  }

  if (req.method === "DELETE") {
    // console.log("Deleting chat with id:", chatId); // Add this line

    await prisma.chat.delete({
      where: {
        id: String(chatId),
      },
    });

    return res.status(200).end();
  }

  return res.status(405).end(); // Method Not Allowed
}
