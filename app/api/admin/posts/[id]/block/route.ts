// app/api/admin/posts/[id]/block/route.ts
import { NextResponse } from "next/server";
import { updatePostStatus } from "@/lib/posts-admin";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await updatePostStatus(id, "blocked");
    
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error blocking post:", error);
    return NextResponse.json(
      { error: "Failed to block post" },
      { status: 500 }
    );
  }
}