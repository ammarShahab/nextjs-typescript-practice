"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItems {
  label: string;
  href: string;
  role?: string | null;
}

export default function SideBar() {
  const { data: session } = useSession();
  console.log("SESSION", session);

  const navItems: NavItems[] = [
    { label: "Home", href: "/", role: null },
    { label: "Products", href: "/dashboard/products", role: "user" },
    { label: "Settings", href: "/dashboard/settings", role: "user" },
    { label: "Admin", href: "/dashboard/admin", role: "admin" },
  ];

  const pathname = usePathname();

  const userRole = session?.user?.role;

  console.log("User Role", userRole);

  // Filter nav items based on role
  const visibleItems = navItems.filter((item) => {
    if (item.role === null) return true; // public item
    if (!session) return false; // not logged in
    if (item.role === "user") return true; // any logged-in user
    if (item.role === "admin") return userRole === "admin"; // admin only
    return false;
  });
  return (
    <aside className="border-r border-slate-500 w-72 min-h-screen">
      <div>{/* <h3>SideBar</h3> */}</div>
      <div className="flex flex-col gap-2">
        {visibleItems.map((item): React.ReactNode => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              className={isActive ? "bg-gray-900 text-white" : ""}
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
