"use client";
import { useState } from "react";
import Link from "next/link";
import { useWeb3 } from "@components/providers";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { connect, requireInstall } = useWeb3();

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
              {requireInstall ? (
                <span
                  onClick={connect}
                  className="px-8 py-3 border rounded-md text-base font-medium text-white bg-yellow-600 hover:bg-yellow-700"
                >
                  Install MetaMask
                </span>
              ) : (
                <span
                  onClick={connect}
                  className="px-8 py-3 border rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Connect
                </span>
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
              {requireInstall ? (
                <span
                  onClick={connect}
                  className="font-medium mr-8 text-gray-500 hover:text-gray-900"
                >
                  Install MetaMask
                </span>
              ) : (
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
    </section>
  );
}

