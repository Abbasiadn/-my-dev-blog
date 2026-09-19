// app/page.tsx
import { getSortedPostsData } from "@/lib/posts";
import Hero from "@/components/Hero";
import AboutBand from "@/components/AboutBand";

import BlogClient from "@/components/BlogClient";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import ClosingCTA from "@/components/ClosingCTA";
import Categories from "@/components/HowWeHelp";

export default async function Home() {
  const posts = await getSortedPostsData();

  return (
    <>
      <Hero />
      <AboutBand />
      <Categories />
      <BlogClient initialPosts={posts} />
      <Process />
      <Testimonials />
      <ClosingCTA />
    </>
  );
}
