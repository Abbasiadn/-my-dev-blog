// app/contact/page.tsx
import ContactClient from "@/components/ContactClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | DevBlog",
  description: "Get in touch — questions, ideas, or just saying hello.",
};

export default function ContactPage() {
  return <ContactClient />;
}
