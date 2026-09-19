// types/index.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  status: "active" | "blocked" | "pending";
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  authorId: string;
  authorName: string;
  status: "pending" | "approved" | "blocked";
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  status: "pending" | "approved" | "blocked";
  createdBy: string;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  description: string;
  status: "active" | "blocked";
  authorId: string;
  createdAt: string;
}