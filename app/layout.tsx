import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StarCanvas from "@/components/background/back";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My portfolio",
  description: "Created by zealousMW",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#311c46] overflow-y-scroll overflow-x-hidden`}
      >
        <div className="bg-[#090011]">
        <StarCanvas/>
        
        {children}
        </div>
        
      </body>
    </html>
  );
}
