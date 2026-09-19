// app/api/admin/blogs/[id]/block/route.ts
import { NextResponse } from "next/server";
import { updateBlogStatus } from "@/lib/blogs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = await updateBlogStatus(id, "blocked");
    
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("Error blocking blog:", error);
    return NextResponse.json(
      { error: "Failed to block blog" },
      { status: 500 }
    );
  }
}