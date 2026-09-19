// lib/auth.ts
import { cookies } from "next/headers";
import { simpleHash } from "./hash";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}

// Simple base64 session (no external dependencies)
export async function createSession(user: User) {
  const token = Buffer.from(JSON.stringify({
    ...user,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  })).toString("base64");

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function getSession(): Promise<User | null> {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  try {
    const decoded = Buffer.from(token, "base64").toString();
    const user = JSON.parse(decoded);
    
    if (user.exp && user.exp < Date.now()) {
      return null;
    }
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch {
    return null;
  }
}

export async function destroySession() {
  (await cookies()).delete("session");
}

export async function isAdmin(): Promise<boolean> {
  const user = await getSession();
  return user?.role === "admin";
}