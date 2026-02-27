import React from "react";
import SideBar from "./components/dashboard/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Layout UI */}
      {/* Place children where you want to render a page or nested layout */}
      <main className="flex gap-2">
        <SideBar />
        {children}
      </main>
    </div>
  );
}
