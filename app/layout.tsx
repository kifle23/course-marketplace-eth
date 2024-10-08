import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <body className={`${inter.className} bg-white`}>
        <div className="max-w-7xl mx-auto px-4  overflow-hidden">
          <Web3Provider>
            <header>
              <Nav />
            </header>
            <main>
              <div className="fit">
                {children} <ToastContainer />
              </div>
            </main>
          </Web3Provider>
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

