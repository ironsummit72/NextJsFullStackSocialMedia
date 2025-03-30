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

export  default async function RootLayout({
  children,
  modal,
  suggession
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  suggession:React.ReactNode
}>) {
  const {username}=await getCurrentUser()

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid grid-rows-[80px_1fr] md:grid-cols-[250px_1fr]">
          <SideBar username={username}/>
          <div className="md:grid md:grid-cols-[60vw_1fr]">
          {children}
          <div className="hidden md:block">
          {suggession}
          </div>
          </div>
          {modal}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
