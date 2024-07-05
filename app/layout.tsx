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
        <main className="bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <Nav />
            <div className="fit">{children}</div>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

