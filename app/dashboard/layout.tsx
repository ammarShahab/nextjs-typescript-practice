import React from "react";
import SideBar from "./components/dashboard/SideBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

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
