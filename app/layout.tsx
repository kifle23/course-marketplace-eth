import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import { Footer, Nav } from "@components/common";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marketplace ETH",
  description: "Marketplace ETH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="relative bg-white overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4">
            <Nav />
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

