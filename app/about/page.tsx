// app/about/page.tsx
import AboutClient from "@/components/AboutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | DevBlog",
  description:
    "About this blog — code, design, and the craft of building software.",
};

export default function AboutPage() {
  return <AboutClient />;
}
