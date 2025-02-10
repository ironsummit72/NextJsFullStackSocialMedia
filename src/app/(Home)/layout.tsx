import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import SideBar from "@/components/custom/SideBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Snapgram',
    default: 'Snapgram'
  },
  description: "A Social media to share your creativity and make friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid grid-rows-[80px_1fr] md:grid-cols-[250px_1fr]">
          <SideBar />
          {children}
        </div>
      </body>
    </html>
  );
}
