import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { chatId } = req.query;

  try {
    const messages = await prisma.message.findMany({
      where: {
        chatId: Array.isArray(chatId) ? chatId[0] : chatId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch messages" });
  }
}
