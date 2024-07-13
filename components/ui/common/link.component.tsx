"use client";
import Link, { LinkProps } from "next/link";
import React, { ReactElement } from "react";
import { usePathname } from "next/navigation";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeLinkClass?: string;
}

export default function ActiveLink({
  children,
  activeLinkClass,
  ...props
}: ActiveLinkProps) {
  const pathname = usePathname();
  let className = children.props.className || "";

  if (pathname === props.href) {
    className = `${className} ${
      activeLinkClass ? activeLinkClass : "text-indigo-600"
    }`;
  }

  return <Link {...props}>{React.cloneElement(children, { className })}</Link>;
}

