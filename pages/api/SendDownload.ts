import type { NextApiRequest, NextApiResponse } from "next";
import type { Message as MessageType } from "@/typings";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userEmail, chatId } = req.body;

    try {
      // console.log(
      //  `Running query with userEmail=${userEmail} and chatId=${chatId}`
      // );

      const messages: MessageType[] = await prisma.message.findMany({
        where: {
          chatId: chatId,
          userEmail: userEmail,
          checked: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      // console.log(`Retrieved ${messages.length} messages`);

      res.status(200).json(messages);
    } catch (error) {
      console.error(`Error when running query: `, error);
      res.status(500).json({
        error: `Unable to retrieve messages: ${JSON.stringify(error)}`,
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
