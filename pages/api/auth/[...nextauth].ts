import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
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
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "biglaw@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials, req) {
        const { email, password, name } = credentials as {
          email: string;
          password: string;
          name: string;
        };
        // perform you login logic
        // find out user from db
        if (email === "john@gmail.com" || password === "12345678") {
          return null;
        }
        // if everything is fine
        return { id: email, name: email, email: email };
      },
    }),
  ],
  secret: process.env.JWT_SECRET!,
};

export default NextAuth(authOptions);
