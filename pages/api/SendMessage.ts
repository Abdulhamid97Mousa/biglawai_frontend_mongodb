import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { SendMessageRequestBody } from "@/typings";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // console.log(req.body, "This is the body");

      const { input, chatId, userEmail, lang }: SendMessageRequestBody = req.body;

      // Check if input is null or undefined
      if (!input) {
        res.status(400).json({ error: "The 'input' field is required" });
        return;
      }

      const messageId = uuidv4(); // Generate a unique messageId

      const user = await prisma.user.findUnique({
        where: {
          email: userEmail, // Use the email provided in the request body
        },
      });

      // If the user doesn't exist, create a new user
      if (!user) {
        // console.log("there is no user");
      }

      // Now, the user definitely exists. You can proceed with creating the message
      const message = await prisma.message.create({
        data: {
          messageId: messageId,
          content: input,
          checked: false,
          lang: lang,
          createdAt: new Date(),
          chatId: chatId,
          userEmail: userEmail,
          createdBy: userEmail,
        },
      });

      res
        .status(200)
        .json({ message: "Message sent successfully!", data: message });
    } catch (error) {
      // Type assertion here
      const err = error as any;
      res
        .status(500)
        .json({ error: `Error sending message from api: ${err.message}` });
    }
  } else {
    res.status(405).json({ error: "This route only supports POST requests" });
  }
}
