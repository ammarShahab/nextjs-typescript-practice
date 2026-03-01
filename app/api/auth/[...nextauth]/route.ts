import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        // name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const db = await connectDB();
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) return null;

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValidPassword) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        try {
          const db = await connectDB();
          const existingUser = await db
            .collection("users")
            .findOne({ email: user.email });

          if (!existingUser) {
            await db.collection("users").insertOne({
              name: user.name,
              email: user.email,
              image: user.image,
              role: "admin",
              created_at: new Date(),
            });
          }
        } catch (error) {
          console.error("Error Saving Google User", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "credentials") {
          token.role = user.role;
        }
        if (account?.provider === "google") {
          const db = await connectDB();
          const dbUser = await db
            .collection("users")
            .findOne({ email: user.email });
          token.role = dbUser?.role ?? "admin";

          token.role = user.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
