import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type RequestBody = {
  checked: boolean;
  userId: string;
  messageId: string;
  chatId: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // Extract data from the request body
    const { checked, userId, messageId, chatId }: RequestBody = req.body;

    // Perform your Prisma operations here:
    await prisma.message.update({
      where: {
        messageId: messageId,
      },
      data: {
        checked: checked,
      },
    });

    res.status(200).json({ message: "Message updated successfully." });
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
};
