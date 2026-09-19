// app/blog/[slug]/page.tsx
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  Share2,
  Bookmark,
} from "lucide-react";
import PostContent from "@/components/PostContent";

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

    // Calculate reading time
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

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  if (!postData) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-lavender/20 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-lavender-deep" />
          </div>
          <h1 className="font-serif text-3xl mb-4">Post Not Found</h1>
          <p className="text-ink-soft mb-8">
            This post may have been moved or is a user-created post stored in
            your browser.
          </p>
          <Link href="/" className="btn-pill">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return <PostContent post={postData} />;
}
