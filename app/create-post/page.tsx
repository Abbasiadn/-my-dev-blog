// app/create-post/page.tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Create Post | DevBlog",
  description: "Create a new blog post.",
};

export const dynamic = "force-dynamic";

type CreatePostClientProps = {
  user: NonNullable<Awaited<ReturnType<typeof getSession>>>;
};

function CreatePostClient({ user }: CreatePostClientProps) {
  return (
    <main>
      <h1>Create Post</h1>
      <p>Signed in as {user.email}</p>
      <form method="post">
        <label>
          Title
          <input name="title" required />
        </label>
        <label>
          Content
          <textarea name="content" required />
        </label>
        <button type="submit">Publish</button>
      </form>
    </main>
  );
}

export default async function CreatePostPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <CreatePostClient user={session} />;
}
