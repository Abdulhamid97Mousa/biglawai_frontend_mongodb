import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function getChatId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get the user's email from the request body
    const userEmail = req.body.userEmail;

    // Find the latest chat associated with the user's email based on creation date
    const latestChat = await prisma.chat.findFirst({
      where: {
        userId: userEmail,
      },
      orderBy: {
        createdAt: "desc", // Order by createdAt in descending order to get the latest chat
      },
    });

    if (!latestChat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    // Return the chat ID of the latest chat
    return res.status(200).json({ chatId: latestChat.id });
  } catch (error) {
    console.error("Error in getChatId:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving chat ID" });
  }
}
