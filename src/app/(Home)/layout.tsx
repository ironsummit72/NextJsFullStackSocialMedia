import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import SideBar from "@/components/custom/SideBar";
import { Toaster } from "@/components/ui/toaster";

import { getCurrentUser } from "@/lib/getCurrentUser";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Snapgram',
    default: 'Snapgram'
  },
  description: "A Social media to share your creativity and make friends",
};

export default async function RootLayout({
  children,
  stories,
  suggession
}: Readonly<{
  children: React.ReactNode;
  suggession: React.ReactNode
  stories: React.ReactNode
}>) {
  const { username } = await getCurrentUser()

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid grid-rows-[80px_1fr] md:grid-cols-[250px_1fr]">
          <SideBar username={username} />
          <div className="md:grid md:grid-cols-[60vw_1fr]">
            <div className="flex flex-col  items-center gap-5">
              {stories}
              {children}
            </div>
            <div className="hidden md:block">
              {suggession}
            </div>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
