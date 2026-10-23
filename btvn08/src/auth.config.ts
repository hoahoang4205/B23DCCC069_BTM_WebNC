import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

export default {
  providers: [GitHub],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "user";
      }
      return token;
    },
    session({ session, token }) {
      if (!session.user) {
        return session;
      }

      if (typeof token.id !== "string") {
        throw new Error("The authenticated session is missing a user ID.");
      }
      if (token.role !== "admin" && token.role !== "user") {
        throw new Error("The authenticated session has an invalid user role.");
      }

      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
} satisfies NextAuthConfig;
