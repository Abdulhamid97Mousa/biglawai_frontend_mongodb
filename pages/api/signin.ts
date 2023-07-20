import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    // Check if user exists and password is correct
    if (user) {
      // Here you can handle authentication with NextAuth if you want

      // Create a new chat in your MongoDB database linked to this user
      const chat = await prisma.chat.create({
        data: {
          userId: user.email,
          // other fields if necessary...
        },
      });

      res.status(200).json({ message: "User successfully logged in", chat });
    } else {
      res.status(401).json({ error: "User not found, please sign up first" }); // Updated error message here
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in" });
  }
}
