import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import multer from "multer";
import { ObjectId } from "bson";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
});

export const config = {
  api: {
    bodyParser: false, // Disabling Next.js's body parser to let multer parse the request body
  },
};

interface NextApiRequestWithFile extends NextApiRequest {
  file?: Express.Multer.File;
}

export default async (req: NextApiRequestWithFile, res: NextApiResponse) => {
  if (req.method === "POST") {
    const multerAny: any = multer();

    await new Promise((resolve, reject) =>
      multerAny.single("file")(req, res, (err: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(undefined);
      })
    );

    const fileId = new ObjectId().toHexString();
    const file = req.file;
    const chatId = req.body.chatId;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (file.size > 10 * 1024 * 1024) {
      return res
        .status(400)
        .json({ error: "File size is too large. Maximum is 10MB." });
    }

    // Check if a file already exists for the chatId
    const existingFile = await prisma.file.findFirst({
      where: {
        chatId: chatId,
      },
    });

    // If a file exists, delete it
    if (existingFile) {
      await prisma.file.deleteMany({
        where: {
          chatId: chatId,
        },
      });
    }

    const savedFile = await prisma.file.create({
      data: {
        id: fileId,
        fileData: Buffer.from(file.buffer),
        filename: file.originalname,
        mimetype: file.mimetype,
        chatId: chatId,
      },
    });

    res.status(200).json({ file: savedFile });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
