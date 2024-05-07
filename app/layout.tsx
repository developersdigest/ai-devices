import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AI } from "./action";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "pin",
  description: "Created by Developers Digest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <title>Whisper on Groq - Developers Digest</title>
        <meta name="title" content="Whisper on Groq - Developers Digest" />
        <meta name="description" content="Whisper Now Available on Groq" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pin.developersdigest.tech" />
        <meta property="og:title" content="Whisper on Groq - Developers Digest" />
        <meta property="og:description" content="Whisper Now Available on Groq" />
        <meta property="og:image" content="https://pin.developersdigest.tech/og.jpeg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pin.developersdigest.tech" />
        <meta property="twitter:title" content="Whisper on Groq - Developers Digest" />
        <meta property="twitter:description" content="Whisper Now Available on Groq" />
        <meta property="twitter:image" content="https://pin.developersdigest.tech/og.jpeg" />
      </Head>
      <AI>
        <body className={inter.className}>{children}</body>
      </AI>
    </html>
  );
}