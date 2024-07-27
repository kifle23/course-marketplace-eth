"use client";
import { useAccount } from "@components/hooks/web3";
import { ActiveLink } from "@components/ui/common";

interface BreadcrumbsProps {
  items: {
    href: string;
    value: string;
    requireAdmin?: boolean;
  }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const account = useAccount();
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        {items
          .filter((item) => !item.requireAdmin || account.isAdmin)
          .map((item, index) => (
            <li
              key={index}
              className={`${
                index === 0 ? "cm:pr-4 pr-1" : "cm:px-4 px-1"
              } font-medium mr-4 cm:mr-8 text-sm cm:text-base text-gray-500 hover:text-gray-900`}
            >
              <ActiveLink href={item.href}>
                <span>{item.value}</span>
              </ActiveLink>
            </li>
          ))}
      </ol>
    </nav>
  );
}

