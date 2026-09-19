// types/blog.ts
export interface Post {
  slug: string;
  title?: string;
  date?: string;
  description?: string;
  category?: string;
  tags?: string[];
  author?: string;
  readingTime?: number;
  coverImage?: string;
}

export interface PostWithContent extends Post {
  title: string; // Required in detail view
  content: string;
}