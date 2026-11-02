import type { Metadata } from "next";
import {
  JetBrains_Mono,
  Libre_Baskerville,
  Source_Sans_3,
} from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AIChatbot } from "@/app/AIChatbot";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deepara Solutions",
  description: "Digital services and solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${sourceSans.variable} ${libreBaskerville.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className={sourceSans.className}>
        <ThemeProvider>
          <Header />
          <main style={{ paddingTop: "var(--topbar-height)" }}>{children}</main>
          <Footer />
          <AIChatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
