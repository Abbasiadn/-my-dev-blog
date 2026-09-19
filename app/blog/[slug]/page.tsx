// app/blog/[slug]/page.tsx
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import Link from "next/link";
import type { Metadata } from "next";
import BlogDetailClient from "@/components/BlogDetailClient";

export async function generateStaticParams() {
  try {
    const postsDirectory = path.join(process.cwd(), "posts");
    const filenames = await fs.readdir(postsDirectory);
    return filenames
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => ({
        slug: filename.replace(/\.md$/, ""),
      }));
  } catch {
    return [];
  }
}

async function getPostData(slug: string) {
  try {
    const fullPath = path.join(process.cwd(), "posts", `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const processedContent = await remark()
      .use(remarkHtml)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    const wordCount = matterResult.content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      slug,
      contentHtml,
      readingTime,
      ...(matterResult.data as {
        title: string;
        date: string;
        description: string;
        category?: string;
        tags?: string[];
        author?: string;
        coverImage?: string;
      }),
    };
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return {
      title: "Post Not Found | DevBlog",
      description: "This post could not be found.",
    };
  }

  return {
    title: `${post.title} | DevBlog`,
    description: post.description,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return <BlogDetailClient post={postData} />;
}
