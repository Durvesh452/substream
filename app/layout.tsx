import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/context/Web3Context";
import Navbar from "@/components/layout/Navbar";
import ActivityFeed from "@/components/layout/ActivityFeed";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SubStream | Token-Powered Memberships",
  description: "Decentralized subscription platform for creators and communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Web3Provider>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-24 pb-12 px-4">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
            <ActivityFeed />
            
            {/* Background Glows */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
            </div>
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
