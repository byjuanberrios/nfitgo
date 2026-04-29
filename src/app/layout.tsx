import type { Metadata } from "next";
import { Saira } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";

import "./globals.css";

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NFITGO",
  description: "Entrena donde quieras, cuando quieras.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${saira.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
