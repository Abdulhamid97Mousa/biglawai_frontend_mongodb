import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { messageId, newContent } = req.body;

  try {
    const updatedMessage = await prisma.message.update({
      where: {
        messageId: messageId,
      },
      data: {
        content: newContent,
      },
    });

    return res.status(200).json(updatedMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update message" });
  }
}
