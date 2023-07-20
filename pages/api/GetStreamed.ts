import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const { messageId } = req.body;

    if (!messageId) {
      return res.status(400).json({ message: "Message ID is required." });
    }

    try {
      await prisma.message.update({
        where: { messageId: messageId },
        data: { streamed: true },
      });
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
};

export default handler;