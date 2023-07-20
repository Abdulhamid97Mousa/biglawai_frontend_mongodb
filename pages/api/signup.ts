import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
      },
    });

    res.status(200).json({ user });
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
}
