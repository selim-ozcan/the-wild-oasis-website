"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ children, href }) {
  const pathname = usePathname();

  return (
    <Link
      className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
        href === pathname ? "bg-primary-900 text-primary-100" : null
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
