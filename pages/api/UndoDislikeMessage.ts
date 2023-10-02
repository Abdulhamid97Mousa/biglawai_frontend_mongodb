import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { messageId } = req.body;
  if (req.method === "POST") {
    try {
      await prisma.message.update({
        where: { messageId: messageId },
        data: { disliked: false },
      });

      res.status(200).json({ message: "Dislike removed successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove dislike" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}