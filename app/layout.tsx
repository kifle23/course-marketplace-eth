import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import { Footer, Nav } from "@components/ui/common";
import { Web3Provider } from "@components/providers";

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
        <Web3Provider>
          <main className="bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
              <Nav />
              <div className="fit">{children}</div>
            </div>
          </main>
          <Footer />
        </Web3Provider>
      </body>
    </html>
  );
}

