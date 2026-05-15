import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Phone OTP",
      credentials: {
        phone: { label: "Phone Number", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.otp) return null;

        // MOCK OTP VERIFICATION: In production, verify with Twilio/Firebase
        if (credentials.otp === "123456") {
          // Dev bypass: try DB, fall back to mock user if DB not available
          try {
            let user = await prisma.user.findUnique({
              where: { phone: credentials.phone as string },
            });

            if (!user) {
              user = await prisma.user.create({
                data: {
                  phone: credentials.phone as string,
                  verificationStatus: "PENDING",
                },
              });
            }

            return {
              id: user.id,
              name: user.name ?? "Pahadi User",
              email: user.phone,
            };
          } catch (_dbError) {
            // Dev mode: DB unavailable — return mock session
            console.warn("[auth] DB unreachable, using dev mock user");
            return {
              id: `dev-${credentials.phone}`,
              name: "Dev User",
              email: credentials.phone as string,
            };
          }
        }

        return null;
      },
    }),
  ],
});
