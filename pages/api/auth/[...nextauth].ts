import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Write your email here",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const { email, password } = credentials;

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          // Check if user exists and password is correct
          if (user) {
            const isPasswordMatch = await bcrypt.compare(
              password,
              user.hashedPassword
            );

            if (!isPasswordMatch) {
              return null; // Returning null if authentication fails
            }

            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
            }; // Returning user object if authentication succeeds
          } else {
            return null; // Returning null if user is not found
          }
        } catch (error) {
          console.error("Error in credentials authentication:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET!,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
