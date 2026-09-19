// app/categories/page.tsx
import type { Metadata } from "next";
import { getSortedPostsData } from "@/lib/posts";
import CategoriesClient from "@/components/CategoriesClient";

export const metadata: Metadata = {
  title: "Categories | DevBlog",
  description:
    "Browse articles by topic — React, Next.js, design systems, and more.",
};

export default async function CategoriesPage() {
  const posts = await getSortedPostsData();

  // Define main categories with icons
  const mainCategories = [
    {
      name: "React",
      icon: "⚛️",
      description: "Components, hooks, and React patterns",
    },
    {
      name: "Next.js",
      icon: "▲",
      description: "App Router, SSR, and full-stack React",
    },
    {
      name: "Vue.js",
      icon: "💚",
      description: "Composition API, Pinia, and Vue patterns",
    },
    {
      name: "UI/UX Design",
      icon: "🎨",
      description: "Design systems and user experience",
    },
    {
      name: "Tailwind CSS",
      icon: "🌊",
      description: "Utility-first styling and theming",
    },
    {
      name: "Web Security",
      icon: "🔒",
      description: "Best practices and security patterns",
    },
  ];

  // Count posts per category
  const categoryCounts = posts.reduce(
    (acc, post) => {
      if (post.category) {
        acc[post.category] = (acc[post.category] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <CategoriesClient
      categories={mainCategories}
      categoryCounts={categoryCounts}
      posts={posts}
    />
  );
}
