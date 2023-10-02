import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { messageId } = req.body;

    if (!messageId) {
      return res.status(400).json({ error: "Message ID is required." });
    }

    try {
      const message = await prisma.message.findUnique({
        where: {
          messageId: messageId,
        },
      });

      if (!message) {
        return res.status(404).json({ error: "Message not found." });
      }

      await prisma.message.delete({
        where: {
          messageId: messageId,
        },
      });

      return res.status(200).json({ message: "Message deleted successfully." });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the message." });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
