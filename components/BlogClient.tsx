// components/BlogClient.tsx (Featured Posts / Case Studies style)
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { Post } from "@/types/blog";

interface BlogClientProps {
  initialPosts: Post[];
}

export default function BlogClient({ initialPosts = [] }: BlogClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Safe filter - only show posts with required fields
  const validPosts = Array.isArray(initialPosts)
    ? initialPosts.filter((post) => post && post.slug && post.title)
    : [];

  const featuredPosts = validPosts.slice(0, 3);

  // If no valid posts, show empty state
  if (featuredPosts.length === 0) {
    return (
      <section id="latest" className="py-24" ref={ref}>
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-head"
          >
            <div className="eyebrow">LATEST WRITING</div>
            <h2>
              Essays{" "}
              <em className="italic text-lavender-deep">worth your time</em>.
            </h2>
          </motion.div>

          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-lavender/20 flex items-center justify-center mx-auto mb-6">
              <ArrowRight className="w-8 h-8 text-lavender-deep" />
            </div>
            <p className="font-serif text-2xl text-ink-soft mb-4">
              No posts available yet
            </p>
            <p className="text-sm text-ink-faint mb-8">
              Check back soon for new essays and articles.
            </p>
            <Link href="/blog" className="btn-pill">
              Browse All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="latest" className="py-24" ref={ref}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-head"
        >
          <div className="eyebrow">LATEST WRITING</div>
          <h2>
            Essays{" "}
            <em className="italic text-lavender-deep">worth your time</em>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-7">
          {featuredPosts.map((post, i) => {
            // Safe fallbacks for all fields
            const title = post.title || "Untitled Post";
            const slug = post.slug || `post-${i}`;
            const category = post.category || "Development";
            const date = post.date || "No date";
            const readingTime = post.readingTime || 5;
            const description = post.description || "";
            const firstLetter = title.charAt(0).toUpperCase();
            const coverImage = post.coverImage || "";

            return (
              <motion.article
                key={slug}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-ivory rounded-card overflow-hidden border border-ink/10 group cursor-pointer hover:shadow-card transition-shadow"
              >
                <Link href={`/blog/${slug}`}>
                  <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-lavender/30 via-sage/50 to-sage-deep/40">
                    {coverImage ? (
                      <Image
                        src={coverImage}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif text-5xl text-ink/20 italic">
                          {firstLetter}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-lavender-deep">
                        {category}
                      </span>
                      <ArrowRight className="w-4 h-4 text-ink group-hover:text-lavender-deep transition-colors" />
                    </div>

                    <h3 className="font-serif text-lg font-semibold mb-2 leading-snug group-hover:text-lavender-deep transition-colors">
                      {title}
                    </h3>

                    {description && (
                      <p className="text-sm text-ink-soft mb-4 line-clamp-2">
                        {description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-ink-faint">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {readingTime} min read
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {validPosts.length > 3 && (
          <div className="text-center mt-12">
            <Link href="/blog" className="btn-pill">
              View All Posts ({validPosts.length}){" "}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
