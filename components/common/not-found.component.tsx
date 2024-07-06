import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Item not found
        </h1>
        <p className="text-lg text-gray-600">
          Sorry, we couldn&apos;t find the item you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

