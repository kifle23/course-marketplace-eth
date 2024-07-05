import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import Nav from "@components/nav.component";

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
        <footer className="bg-gray-900 pt-1">
          <div className="container mx-auto px-6">
            <div className="mt-5 flex flex-col items-center">
              <div className="py-6">
                <p className="mb-6 text-white text-sm text-primary-2 font-bold">
                  © {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

