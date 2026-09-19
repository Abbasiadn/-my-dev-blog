// components/BaseLink.tsx
"use client";
import Link from "next/link";
import { ReactNode } from "react";

interface BaseLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

export default function BaseLink({
  href,
  children,
  className,
  onClick,
  target,
  rel,
}: BaseLinkProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Don't add basePath to external links or hash links
  const fullHref =
    href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto")
      ? href
      : `${basePath}${href}`;

  return (
    <Link
      href={fullHref}
      className={className}
      onClick={onClick}
      target={target}
      rel={rel}
    >
      {children}
    </Link>
  );
}
