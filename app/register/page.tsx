// app/register/page.tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import RegisterClient from "@/components/RegisterClient";

export const metadata: Metadata = {
  title: "Register | DevBlog",
  description: "Create your DevBlog account.",
};

export default async function RegisterPage() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  return <RegisterClient />;
}
