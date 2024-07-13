import Link from "next/link";

export default function Breadcrumbs() {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
          <li className="pr-4 font-medium mr-8 text-gray-500 hover:text-gray-900">
            <Link href="#">Buy</Link>
          </li>
          <li className="px-4 font-medium mr-8 text-gray-500 hover:text-gray-900">
            <Link href="#">My Courses</Link>
          </li>
          <li className="px-4 font-medium mr-8 text-gray-500 hover:text-gray-900">
            <Link href="#">Manage Courses</Link>
          </li>
        </ol>
      </nav>
    </>
  );
}

