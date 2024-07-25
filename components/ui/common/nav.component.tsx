"use client";
import { useState } from "react";
import { useWeb3 } from "@components/providers";
import { ActiveLink, Button } from "@components/ui/common";
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
            <div className="hidden cm:flex items-center">
              <ActiveLink href="/">
                <span className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </span>
              </ActiveLink>
              <ActiveLink href="/marketplace">
                <span className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
                </span>
              </ActiveLink>
              <ActiveLink href="/blogs">
                <span className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
                </span>
              </ActiveLink>
            </div>
            <div className="hidden cm:flex items-center">
              <ActiveLink href="/wishlist">
                <span className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Wishlist
                </span>
              </ActiveLink>
              {isLoading ? (
                <Button disabled={true}>Loading</Button>
              ) : account.data && account.isInitialized ? (
                <Button hoverable={false}>
                  Hi there {account.isAdmin && "Admin"}
                </Button>
              ) : requireInstall ? (
                <Button
                  onClick={() =>
                    window.open("https://metamask.io/download.html", "_blank")
                  }
                  variant="secondary"
                >
                  Install MetaMask
                </Button>
              ) : (
                <Button onClick={connect}>Connect</Button>
              )}
            </div>
            <div className="cm:hidden flex w-full justify-between">
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
              {isLoading ? (
                <Button disabled={true}>Loading</Button>
              ) : account.data && account.isInitialized ? (
                <Button hoverable={false}>
                  Hi there {account.isAdmin && "Admin"}
                </Button>
              ) : requireInstall ? (
                <Button
                  onClick={() =>
                    window.open("https://metamask.io/download.html", "_blank")
                  }
                  variant="secondary"
                >
                  Install MetaMask
                </Button>
              ) : (
                <Button onClick={connect}>Connect</Button>
              )}
            </div>
          </div>
          {isOpen && (
            <div className="cm:hidden mt-4">
              <ActiveLink href="/">
                <span className="block font-medium mb-4 text-gray-500 hover:text-gray-900">
                  Home
                </span>
              </ActiveLink>
              <ActiveLink href="/marketplace">
                <span className="block font-medium mb-4 text-gray-500 hover:text-gray-900">
                  Marketplace
                </span>
              </ActiveLink>
              <ActiveLink href="/blogs">
                <span className="block font-medium mb-4 text-gray-500 hover:text-gray-900">
                  Blogs
                </span>
              </ActiveLink>
              <ActiveLink href="/wishlist">
                <span className="block font-medium mb-4 text-gray-500 hover:text-gray-900">
                  Wishlist
                </span>
              </ActiveLink>
            </div>
          )}
        </nav>
      </div>
      {!isOpen &&
        account.data &&
        account.isInitialized &&
        !pathname.includes("/marketplace") && (
          <div className="hidden cm:flex justify-end  pt-1 sm:px-6 lg:px-8">
            <div className="text-white break-words text-sm bg-indigo-600 rounded-md p-2">
              {account.data}
            </div>
          </div>
        )}
    </section>
  );
}

