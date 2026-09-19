// app/login/page.tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginClient from "@/components/LoginClient";

export const metadata: Metadata = {
  title: "Login | DevBlog",
  description: "Login to your DevBlog account.",
};

// This page uses cookies, so it must be dynamic
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return <LoginClient />;
}
