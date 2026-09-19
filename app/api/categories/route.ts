// app/api/categories/route.ts
import { NextResponse } from "next/server";
import { createCategory } from "@/lib/categories";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const categoryData = await request.json();
    const category = await createCategory({
      ...categoryData,
      createdBy: session.id,
      status: session.role === "admin" ? "approved" : "pending",
    });
    
    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}