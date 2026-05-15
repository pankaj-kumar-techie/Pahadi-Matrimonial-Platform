import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    Credentials({
      name: "Phone OTP",
      credentials: {
        phone: { label: "Phone Number", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        // This will be overridden in auth.ts
        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // BYPASS LOGIN FOR TESTING
      if (process.env.NODE_ENV === "development") return true;

      const isLoggedIn = !!auth?.user;
      const isAuthPage = nextUrl.pathname.startsWith("/login");
      const isPublicPage = nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/api/auth");

      if (isAuthPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      if (!isLoggedIn && !isPublicPage) {
        return false; // Redirect to login
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
