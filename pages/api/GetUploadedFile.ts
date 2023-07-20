 import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { chatId } = req.query;

    const file = await prisma.file.findFirst({
      where: {
        chatId: chatId as string,
      },
    });

    if (!file) {
      // return res.status(404).json({ error: "No file found for this chatId" });
    }

    res.status(200).json({ file });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
