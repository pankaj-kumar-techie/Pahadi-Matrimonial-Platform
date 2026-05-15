import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Pahadi — Himachali Matrimonial Network",
  description: "Himachal's most trusted matrimonial network. Connect with verified families across 12 districts. Simple, secure, and rooted in Pahadi values.",
  keywords: ["Himachal Pradesh matrimonial", "Pahadi shaadi", "Himachali matrimony", "HP marriage", "Kangra matrimonial", "Shimla matrimonial"],
  manifest: "/manifest.json",
  openGraph: {
    title: "Pahadi — Himachali Matrimonial Network",
    description: "Himachal's most trusted matrimonial network. 2,400+ verified families.",
    type: "website",
    locale: "en_IN",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pahadi",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#064e3b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased`}>
      <body className="font-sans">
        <AuthProvider>
          {children}
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
