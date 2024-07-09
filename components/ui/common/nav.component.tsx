"use client";
import { useState } from "react";
import Link from "next/link";
import { useWeb3 } from "@components/providers";
import { Button } from "@components/ui/common";
import { useAccount } from "@components/hooks/web3";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { connect, isLoading, requireInstall } = useWeb3();
  const { account } = useAccount();
  const pathname = usePathname();

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center">
            <div className="hidden sm:flex items-center">
              <Link
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                href="/marketplace"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Marketplace
              </Link>
              <Link
                href="/blogs"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Blogs
              </Link>
            </div>
            <div className="hidden md:flex items-center">
              <Link
                href="/wishlist"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Wishlist
              </Link>
              {isLoading ? (
                <Button disabled={true}>Loading</Button>
              ) : account ? (
                  <Button hoverable={false}>
                    Hi there {account.isAdmin && "Admin"}
                  </Button>
                ) : requireInstall? (
                  <Button
                    onClick={() =>
                      window.open("https://metamask.io/download.html", "_blank")
                    }
                    variant="secondary"
                  >
                    Install MetaMask
                  </Button>
                )
               : (
                <Button onClick={connect}>Connect</Button>
              )}
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                    }
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          {isOpen && (
            <div className="md:hidden mt-4">
              <Link
                href="/"
                className="block font-medium mb-4 text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                href="/marketplace"
                className="block font-medium mb-4 text-gray-500 hover:text-gray-900"
              >
                Marketplace
              </Link>
              <Link
                href="/blogs"
                className="block font-medium mb-4 text-gray-500 hover:text-gray-900"
              >
                Blogs
              </Link>
              <Link
                href="/wishlist"
                className="block font-medium mb-4 text-gray-500 hover:text-gray-900"
              >
                Wishlist
              </Link>
              {isLoading ? (
                <span className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Loading
                </span>
              ) : account ? (
                
                  <span className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                    Hi There {account.isAdmin && "Admin"}
                  </span>
                ) : requireInstall?(
                  <span
                    onClick={() =>
                      window.open("https://metamask.io/download.html", "_blank")
                    }
                    className="font-medium mr-8 text-gray-500 hover:text-gray-900"
                  >
                    Install MetaMask
                  </span>
                )
               : (
                <span
                  onClick={connect}
                  className="font-medium mr-8 text-gray-500 hover:text-gray-900"
                >
                  Connect
                </span>
              )}
            </div>
          )}
        </nav>
      </div>
      {!isOpen && account && !pathname.includes("/marketplace") && (
        <div className="hidden sm:flex justify-end pt-1 sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-2">
            {account.data}
          </div>
        </div>
      )}
    </section>
  );
}

