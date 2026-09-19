// lib/posts.ts
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import type { Post } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "posts");

export const getSortedPostsData = cache(async (): Promise<Post[]> => {
  try {
    const filenames = await fs.readdir(postsDirectory);
    
    const allPostsData = await Promise.all(
      filenames
        .filter((filename) => filename.endsWith(".md"))
        .map(async (filename) => {
          try {
            const slug = filename.replace(/\.md$/, "");
            const fullPath = path.join(postsDirectory, filename);
            const fileContents = await fs.readFile(fullPath, "utf8");
            const matterResult = matter(fileContents);
            
            // Calculate reading time
            const content = matterResult.content || "";
            const wordCount = content.trim().split(/\s+/).length;
            const readingTime = Math.max(1, Math.ceil(wordCount / 200));
            
            const data = matterResult.data as Record<string, any>;
            
            return {
              slug,
              title: data.title || slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
              date: data.date || new Date().toISOString().split("T")[0],
              description: data.description || "",
              category: data.category || "General",
              tags: data.tags || [],
              author: data.author || "DevBlog Author",
              readingTime,
              coverImage: data.coverImage || "",
            } as Post;
          } catch (error) {
            console.error(`Error processing ${filename}:`, error);
            return null;
          }
        }),
    );
    
    // Filter out null values and posts without slugs
    const validPosts = allPostsData
      .filter((post): post is Post => post !== null && !!post.slug)
      .sort((a, b) => {
        const dateA = a.date || "";
        const dateB = b.date || "";
        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
        return 0;
      });
    
    return validPosts;
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
});