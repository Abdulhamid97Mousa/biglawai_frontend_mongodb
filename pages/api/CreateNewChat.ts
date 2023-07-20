import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId } = req.body;

    const newChat = await prisma.chat.create({
      data: {
        userId: userId,
      },
    });
    // Include userEmail in the response
    return res.status(200).json({ ...newChat, userEmail: userId });
  }

  return res.status(405).end(); // Method Not Allowed
}
