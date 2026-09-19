// lib/posts-admin.ts
import { promises as fs } from "fs";
import path from "path";

export interface AdminPost {
  id: string;
  title: string;
  content: string;
  description: string;
  category: string;
  authorId: string;
  authorName: string;
  status: "pending" | "approved" | "blocked";
  tags: string[];
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

const postsFile = path.join(process.cwd(), "data", "posts.json");

async function readPosts(): Promise<AdminPost[]> {
  try {
    const data = await fs.readFile(postsFile, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writePosts(posts: AdminPost[]) {
  await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
  await fs.writeFile(postsFile, JSON.stringify(posts, null, 2));
}

export async function getAllPosts(): Promise<AdminPost[]> {
  const posts = await readPosts();
  return posts.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });
}

export async function getApprovedPosts(): Promise<AdminPost[]> {
  const posts = await readPosts();
  return posts.filter((post) => post.status === "approved");
}

export async function getPendingPosts(): Promise<AdminPost[]> {
  const posts = await readPosts();
  return posts.filter((post) => post.status === "pending");
}

export async function getBlockedPosts(): Promise<AdminPost[]> {
  const posts = await readPosts();
  return posts.filter((post) => post.status === "blocked");
}

export async function createPost(
  postData: Omit<AdminPost, "id" | "createdAt" | "updatedAt">
): Promise<AdminPost> {
  const now = new Date().toISOString();
  const post: AdminPost = {
    ...postData,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  const posts = await readPosts();
  posts.push(post);
  await writePosts(posts);

  return post;
}

export async function updatePostStatus(
  id: string,
  status: "pending" | "approved" | "blocked"
): Promise<AdminPost | null> {
  const posts = await readPosts();
  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex === -1) return null;

  posts[postIndex].status = status;
  posts[postIndex].updatedAt = new Date().toISOString();
  await writePosts(posts);

  return posts[postIndex];
}

export async function updatePost(
  id: string,
  updates: Partial<Omit<AdminPost, "id" | "createdAt">>
): Promise<AdminPost | null> {
  const posts = await readPosts();
  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex === -1) return null;

  posts[postIndex] = {
    ...posts[postIndex],
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  };
  await writePosts(posts);

  return posts[postIndex];
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await readPosts();
  const filteredPosts = posts.filter((p) => p.id !== id);

  if (filteredPosts.length === posts.length) return false;

  await writePosts(filteredPosts);
  return true;
}

// lib/posts-admin.ts (add these functions)
export async function getUserPosts(userId: string): Promise<AdminPost[]> {
  const posts = await readPosts();
  return posts
    .filter((post) => post.authorId === userId)
    .sort((a, b) => {
      if (a.createdAt < b.createdAt) return 1;
      if (a.createdAt > b.createdAt) return -1;
      return 0;
    });
}

export async function getPostsByStatus(status: "pending" | "approved" | "blocked"): Promise<AdminPost[]> {
  const posts = await readPosts();
  return posts.filter((post) => post.status === status);
}