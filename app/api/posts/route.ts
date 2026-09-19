// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { createPost, getApprovedPosts, getUserPosts } from "@/lib/posts-admin";
import { getSession } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

export const dynamic = "force-dynamic";

// GET - Public: Returns only approved posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");

    // Get approved posts from database
    let posts = await getApprovedPosts();

    // Also get markdown posts from filesystem
    const markdownPosts = await getMarkdownPosts();
    
    // Combine both sources
    posts = [...posts, ...markdownPosts];

    // Filter by category
    if (category && category !== "All") {
      posts = posts.filter((post: any) => post.category === category);
    }

    // Search
    if (search) {
      const query = search.toLowerCase();
      posts = posts.filter((post: any) => 
        post.title?.toLowerCase().includes(query) ||
        post.description?.toLowerCase().includes(query) ||
        post.tags?.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    // Sort by date (newest first)
    posts.sort((a: any, b: any) => {
      const dateA = a.date || a.createdAt || "";
      const dateB = b.date || b.createdAt || "";
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    });

    // Pagination
    const total = posts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    return NextResponse.json({
      posts: paginatedPosts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: endIndex < total,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST - Create a new post (requires authentication)
export async function POST(request: Request) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Please login to create a post." },
        { status: 401 }
      );
    }

    // Check if user is blocked
    if (session.role === "user" && session.status === "blocked") {
      return NextResponse.json(
        { error: "Your account has been blocked. Contact an administrator." },
        { status: 403 }
      );
    }
    
    const postData = await request.json();

    // Validate required fields
    if (!postData.title || !postData.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Create post with pending status for users, approved for admins
    const post = await createPost({
      ...postData,
      authorId: session.id,
      authorName: session.name,
      status: session.role === "admin" ? "approved" : "pending",
    });
    
    return NextResponse.json({ 
      success: true, 
      post,
      message: session.role === "admin" 
        ? "Post created and published successfully" 
        : "Post submitted for review. It will be visible once approved."
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

async function getMarkdownPosts() {
  try {
    const postsDirectory = path.join(process.cwd(), "posts");
    const filenames = await fs.readdir(postsDirectory);
    
    const posts = await Promise.all(
      filenames
        .filter((filename) => filename.endsWith(".md"))
        .map(async (filename) => {
          const slug = filename.replace(/\.md$/, "");
          const fullPath = path.join(postsDirectory, filename);
          const fileContents = await fs.readFile(fullPath, "utf8");
          const matterResult = matter(fileContents);
          
          const wordCount = matterResult.content.trim().split(/\s+/).length;
          const readingTime = Math.ceil(wordCount / 200);

          return {
            id: slug,
            slug,
            title: matterResult.data.title,
            description: matterResult.data.description,
            category: matterResult.data.category,
            tags: matterResult.data.tags || [],
            authorName: matterResult.data.author,
            status: "approved",
            readingTime,
            date: matterResult.data.date,
            coverImage: matterResult.data.coverImage,
            source: "markdown",
          };
        }),
    );

    return posts;
  } catch {
    return [];
  }
}