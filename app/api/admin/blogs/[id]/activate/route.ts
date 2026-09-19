// app/api/admin/blogs/[id]/activate/route.ts
import { NextResponse } from "next/server";
import { updateBlogStatus } from "@/lib/blogs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = await updateBlogStatus(id, "active");
    
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("Error activating blog:", error);
    return NextResponse.json(
      { error: "Failed to activate blog" },
      { status: 500 }
    );
  }
}