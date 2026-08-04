import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

// 1. This function tells Next.js which paths to build
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = await fs.readdir(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}

// 2. Get the data
async function getPostData(slug: string) {
  const fullPath = path.join(process.cwd(), "posts", `${slug}.md`);
  const fileContents = await fs.readFile(fullPath, "utf8");

  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as {
      title: string;
      date: string;
      description: string;
    }),
  };
}

// 3. Use 'Promise' type for params to fix Next.js 15 typing
export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // UNWRAP the params promise!
  const postData = await getPostData(slug);

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">{postData.title}</h1>
      <p className="text-gray-500 mb-8">{postData.date}</p>
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </article>
  );
}
