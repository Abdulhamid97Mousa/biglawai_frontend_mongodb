import NextAuth, { NextAuthOptions, RequestInternal } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { adminDb } from "../../../utils/firebaseAdmin";
("../../../utils/firebaseAdmin");
import { auth, db, APPLICATION, refStorage } from "../../../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

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
          label: "email",
          type: "email",
          placeholder: "somebody@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const data = await signInWithEmailAndPassword(
          auth,
          credentials?.email || "",
          credentials?.password || ""
        );
        if (credentials?.email !== data.user.email) {
          return null;
        }
        return {
          id: data.user.email,
          name: data.user.email,
          email: data.user.email,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET!,
};

export default NextAuth(authOptions);
