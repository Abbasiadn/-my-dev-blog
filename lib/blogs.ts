// lib/blogs.ts
import { promises as fs } from "fs";
import path from "path";

export interface Blog {
  id: string;
  title: string;
  description: string;
  authorId: string;
  status: "active" | "blocked";
  createdAt: string;
  updatedAt: string;
}

const blogsFile = path.join(process.cwd(), "data", "blogs.json");

async function readBlogs(): Promise<Blog[]> {
  try {
    const data = await fs.readFile(blogsFile, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeBlogs(blogs: Blog[]) {
  await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
  await fs.writeFile(blogsFile, JSON.stringify(blogs, null, 2));
}

export async function getAllBlogs(): Promise<Blog[]> {
  return readBlogs();
}

export async function getActiveBlogs(): Promise<Blog[]> {
  const blogs = await readBlogs();
  return blogs.filter((blog) => blog.status === "active");
}

export async function createBlog(
  blogData: Omit<Blog, "id" | "createdAt" | "updatedAt">
): Promise<Blog> {
  const now = new Date().toISOString();
  const blog: Blog = {
    ...blogData,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  const blogs = await readBlogs();
  blogs.push(blog);
  await writeBlogs(blogs);

  return blog;
}

export async function updateBlogStatus(
  id: string,
  status: "active" | "blocked"
): Promise<Blog | null> {
  const blogs = await readBlogs();
  const blogIndex = blogs.findIndex((b) => b.id === id);

  if (blogIndex === -1) return null;

  blogs[blogIndex].status = status;
  blogs[blogIndex].updatedAt = new Date().toISOString();
  await writeBlogs(blogs);

  return blogs[blogIndex];
}

export async function deleteBlog(id: string): Promise<boolean> {
  const blogs = await readBlogs();
  const filteredBlogs = blogs.filter((b) => b.id !== id);

  if (filteredBlogs.length === blogs.length) return false;

  await writeBlogs(filteredBlogs);
  return true;
}