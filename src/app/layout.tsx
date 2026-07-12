import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sonder Sweets",
  description: "A demo e-commerce bakery store using Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${inter.variable}`}
    >
      <body className="font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}