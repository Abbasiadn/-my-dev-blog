// app/admin/page.tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { User } from "@/types";

export const metadata: Metadata = {
  title: "Admin Dashboard | DevBlog",
  description: "Manage users, posts, categories, and blogs.",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();

  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  return <AdminDashboard user={session as User} />;
}
