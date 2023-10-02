import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "User not found, please sign up first" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const chat = await prisma.chat.create({
      data: {
        userId: user.email,
        createdByWho: user.name,
      },
    });

    return res
      .status(200)
      .json({ message: "User successfully logged in", chat });
  } catch (error) {
    console.error("Error in signin:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while logging in" });
  }
}
