import type { Metadata } from "next";
import { Be_Vietnam_Pro, Geist_Mono, Work_Sans } from "next/font/google";

import { QueryProvider } from "@/components/providers/query-provider";
import { siteConfig } from "@/config/site";

import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${beVietnam.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body
        cz-shortcut-listen="true"
        className="flex min-h-full flex-col font-sans selection:bg-tertiary-fixed selection:text-on-tertiary-fixed"
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
