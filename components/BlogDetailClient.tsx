// components/BlogDetailClient.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Tag,
  User,
} from "lucide-react";
import { useState } from "react";

interface BlogDetailClientProps {
  post: {
    slug: string;
    title: string;
    date: string;
    description: string;
    contentHtml: string;
    readingTime?: number;
    category?: string;
    tags?: string[];
    author?: string;
    coverImage?: string;
  } | null;
}

export default function BlogDetailClient({ post }: BlogDetailClientProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-lavender/20 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-lavender-deep" />
          </div>
          <h1 className="font-serif text-3xl mb-4">Post Not Found</h1>
          <p className="text-ink-soft mb-8">
            This post may have been moved or is a user-created post stored in
            your browser.
          </p>
          <Link href="/blog" className="btn-pill">
            <ArrowLeft className="w-4 h-4" />
            Browse All Posts
          </Link>
        </div>
      </main>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute top-24 right-10 w-6 h-6 border-t border-r border-gold/40" />
        <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-gold/40" />
        <Sparkles className="absolute top-40 right-1/4 w-5 h-5 text-gold/50" />

        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all posts
            </Link>

            {post.category && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-lavender/20 text-lavender-deep text-xs font-bold tracking-[0.1em] uppercase mb-6">
                {post.category}
              </span>
            )}

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-ink-faint mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              {post.readingTime && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} min read
                </span>
              )}
              {post.author && (
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                  isBookmarked
                    ? "bg-lavender text-ink border-lavender"
                    : "border-ink/20 text-ink-soft hover:border-lavender hover:text-lavender-deep"
                }`}
                aria-label="Bookmark post"
              >
                <Bookmark
                  className="w-4 h-4"
                  fill={isBookmarked ? "currentColor" : "none"}
                />
              </button>
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center text-ink-soft hover:border-lavender hover:text-lavender-deep transition-colors"
                aria-label="Share post"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {isShared && (
                <span className="text-xs text-lavender-deep animate-fade-in">
                  Link copied!
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <article className="pb-20">
        <div className="wrap">
          <div className="max-w-3xl mx-auto">
            {/* Decorative divider */}
            <div className="flex items-center gap-4 mb-12">
              <span className="flex-1 h-px bg-ink/10" />
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="flex-1 h-px bg-ink/10" />
            </div>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="rounded-card overflow-hidden border border-ink/10 mb-12">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Markdown Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-ink/10">
                <h3 className="text-sm font-semibold text-heading mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag}`}
                      className="px-3 py-1.5 rounded-full bg-lavender/20 text-lavender-deep text-xs font-medium hover:bg-lavender/30 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Card */}
            <div className="mt-12 bg-sage/30 rounded-card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold/40 rounded-tr-card" />
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lavender/40 to-sage flex items-center justify-center shrink-0">
                  <span className="font-serif text-2xl text-ink/40 italic">
                    D
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    Written by {post.author || "DevBlog Author"}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    Essays on development, design systems, and the craft of
                    building software that lasts — written with intention.
                  </p>
                </div>
              </div>
            </div>

            {/* Post Navigation */}
            <div className="mt-12 flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Post
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink transition-colors"
              >
                Next Post
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts CTA */}
      <section className="py-24 bg-sage/50">
        <div className="wrap">
          <div className="text-center mb-12">
            <div className="eyebrow justify-center">KEEP READING</div>
            <h2 className="font-serif text-3xl md:text-4xl mt-4">
              More{" "}
              <em className="italic text-lavender-deep">thoughtful essays</em>.
            </h2>
          </div>
          <div className="text-center">
            <Link href="/blog" className="btn-pill">
              Browse All Posts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
