// app/blog/page.tsx
import type { Metadata } from "next";
import { getSortedPostsData } from "@/lib/posts";
import BlogListClient from "@/components/BlogListClient";

export const metadata: Metadata = {
  title: "Blog | DevBlog",
  description:
    "All articles on development, design systems, and the craft of building software.",
};

export default async function BlogPage() {
  const posts = await getSortedPostsData();

  return <BlogListClient posts={posts} />;
}
