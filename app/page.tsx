import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

async function getSortedPostsData() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = await fs.readdir(postsDirectory);

  const allPostsData = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFile(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as {
        title: string;
        date: string;
        description: string;
      }),
    };
  });

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default async function Home() {
  const posts = await getSortedPostsData();

  return (
    <main className="min-h-screen max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-5xl font-bold text-center mb-4">My Dev Blog</h1>
      <p className="text-center text-gray-600 mb-12">
        Notes on frontend development, React, and Next.js.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map(({ slug, title, date, description }) => (
          <Link
            key={slug}
            href={`/posts/${slug}`}
            className="block p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p className="text-sm text-gray-500 mb-3">{date}</p>
            <p className="text-gray-700">{description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
