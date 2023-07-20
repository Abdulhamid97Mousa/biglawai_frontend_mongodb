import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

const saveResponse = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { text, messageId, chatId, userEmail, lang } = req.body; // use userEmail instead of session

  const createdBy = "ChatGPT";

  try {
    await prisma.message.create({
      data: {
        content: text,
        createdAt: new Date(),
        checked: false,
        messageId: messageId,
        lang: lang,
        chat: {
          connect: {
            id: chatId,
          },
        },
        user: {
          connect: {
            email: userEmail,
          },
        },
        createdBy: createdBy, // set createdBy field
      },
    });

    res.status(200).json({ message: "Response saved successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while saving the message.",
    });
  }
};

export default saveResponse;
