// app/api/admin/categories/[id]/block/route.ts
import { NextResponse } from "next/server";
import { updateCategoryStatus } from "@/lib/categories";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const category = await updateCategoryStatus(id, "blocked");
    
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error("Error blocking category:", error);
    return NextResponse.json(
      { error: "Failed to block category" },
      { status: 500 }
    );
  }
}