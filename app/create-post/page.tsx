// app/create-post/page.tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import CreatePostClient from "@/components/posts/CreatePostClient";

export const metadata: Metadata = {
  title: "Create Post | DevBlog",
  description: "Create a new blog post.",
};

export const dynamic = "force-dynamic";

export default async function CreatePostPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <CreatePostClient user={session} />;
}
