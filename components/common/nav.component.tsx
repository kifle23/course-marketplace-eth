"use client";
import Link from "next/link";

export default function Nav() {
  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div>
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
            <div>
              <Link
                href="/wishlist"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Wishlist
              </Link>
              <Link
                href="/login"
                className="font-medium mr-8 text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}

