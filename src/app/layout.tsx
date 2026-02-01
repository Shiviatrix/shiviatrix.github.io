import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akshit Sivaraman | Research & Systems",
  description: "Researcher and Systems Engineer. Exploring computational mathematics, heavy-tailed distributions, and high-performance architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground min-h-screen`}
      >
        <SmoothScrollProvider>
          <div className="mx-auto max-w-screen-xl px-6 md:px-12 py-12 md:py-24">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
