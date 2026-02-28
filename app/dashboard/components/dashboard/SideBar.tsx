"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItems {
  label: string;
  href: string;
}

export default function SideBar() {
  const navItems: NavItems[] = [
    { label: "Products", href: "/dashboard/products" },
    { label: "Settings", href: "/dashboard/settings" },
    { label: "Admin", href: "/dashboard/Admin" },
  ];

  const pathname = usePathname();
  return (
    <aside className="border-r border-slate-500 w-72 min-h-screen">
      <div>{/* <h3>SideBar</h3> */}</div>
      <div className="flex flex-col gap-2">
        {navItems.map((item): React.ReactNode => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              className={isActive ? "bg-gray-900 mt-1.5 mb-1.5" : ""}
              href={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
