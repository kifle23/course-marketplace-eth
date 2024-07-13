import Link from "next/link";

interface BreadcrumbsProps {
  items: {
    href: string;
    value: string;
  }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
          {items.map((item, index) => (
            <li
              key={index}
              className={` ${
                index == 0 ? "pr-4" : "px-4"
              } font-medium mr-8 text-gray-500 hover:text-gray-900`}
            >
              <Link href={item.href}>{item.value}</Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

