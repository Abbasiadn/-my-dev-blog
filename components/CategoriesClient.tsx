// components/CategoriesClient.tsx
"use client";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Palette,
  Shield,
  Boxes,
  Terminal,
  Layout,
  Sparkles,
  Calendar,
  Clock,
} from "lucide-react";
import type { Post } from "@/types/blog";

interface CategoriesClientProps {
  categories: Array<{ name: string; icon: string; description: string }>;
  categoryCounts: Record<string, number>;
  posts: Post[];
}

const iconMap: Record<string, any> = {
  React: Code2,
  "Next.js": Terminal,
  "Vue.js": Layout,
  "UI/UX Design": Palette,
  "Tailwind CSS": Boxes,
  "Web Security": Shield,
};

export default function CategoriesClient({
  categories = [],
  categoryCounts = {},
  posts = [],
}: CategoriesClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Safe filtering
  const validPosts = Array.isArray(posts)
    ? posts.filter((post) => post && post.slug)
    : [];

  const validCategories = Array.isArray(categories) ? categories : [];

  const allCategories = [
    { name: "All", count: validPosts.length },
    ...validCategories.map((cat) => ({
      name: cat.name || "Uncategorized",
      count: categoryCounts[cat.name] || 0,
    })),
  ];

  const filteredPosts =
    activeCategory === "All"
      ? validPosts
      : validPosts.filter(
          (post) => (post.category || "Uncategorized") === activeCategory,
        );

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute top-24 right-10 w-6 h-6 border-t border-r border-gold/40" />
        <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-gold/40" />
        <Sparkles className="absolute top-40 left-1/4 w-5 h-5 text-gold/50" />

        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <div className="eyebrow">BROWSE BY TOPIC</div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.08] mt-4 mb-6">
              Categories that{" "}
              <em className="italic text-lavender-deep">shape the craft</em>.
            </h1>
            <p className="text-lg text-ink-soft mb-8">
              Every essay, organized by theme. Find what resonates, or explore
              something new.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="pb-20" ref={ref}>
        <div className="wrap">
          {validCategories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            >
              {validCategories.map((category, i) => {
                const Icon = iconMap[category.name] || Code2;
                const count = categoryCounts[category.name] || 0;
                const name = category.name || "Uncategorized";
                const description =
                  category.description || "Explore articles in this category.";

                return (
                  <motion.button
                    key={name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    onClick={() => setActiveCategory(name)}
                    className={`text-left bg-ivory rounded-card p-6 border transition-all group ${
                      activeCategory === name
                        ? "border-lavender shadow-card"
                        : "border-ink/10 hover:border-lavender/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-lavender/20 flex items-center justify-center group-hover:bg-lavender/30 transition-colors">
                        <Icon
                          className="w-5 h-5 text-lavender-deep"
                          strokeWidth={1.5}
                        />
                      </div>
                      <span className="text-xs text-ink-faint font-medium">
                        {count} {count === 1 ? "post" : "posts"}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-lavender-deep transition-colors">
                      {name}
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed mb-4">
                      {description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink group-hover:text-lavender-deep transition-colors">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <span className="text-sm font-semibold text-ink mr-2">Filter:</span>
            {allCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === category.name
                    ? "bg-ink text-ivory"
                    : "bg-ivory text-ink-soft border border-ink/10 hover:border-ink/30"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {filteredPosts.map((post, i) => {
                const title = post.title || "Untitled Post";
                const slug = post.slug || `post-${i}`;
                const category = post.category || "Uncategorized";
                const date = post.date || "No date";
                const readingTime = post.readingTime || 5;
                const firstLetter = title.charAt(0).toUpperCase();
                const coverImage = post.coverImage || "";

                return (
                  <motion.article
                    key={slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="bg-ivory rounded-card overflow-hidden border border-ink/10 group cursor-pointer hover:shadow-card transition-shadow"
                  >
                    <Link href={`/blog/${slug}`}>
                      <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-lavender/30 via-sage/50 to-sage-deep/40">
                        {coverImage ? (
                          <img
                            src={coverImage}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                        <h3 className="font-serif text-lg font-semibold mb-3 leading-snug group-hover:text-lavender-deep transition-colors">
                          {title}
                        </h3>
                        <div className="flex items-center gap-4 text-xs text-ink-faint">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {readingTime} min
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 rounded-full bg-lavender/20 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-lavender-deep" />
              </div>
              <p className="font-serif text-2xl text-ink-soft mb-4">
                No posts in this category yet.
              </p>
              <p className="text-sm text-ink-faint mb-8">
                Check back soon or explore other categories.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="btn-pill"
              >
                View All Posts <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-sage/50">
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-lavender rounded-panel p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-gold/40 rounded-tr-panel" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-gold/40 rounded-bl-panel" />

            <div className="max-w-2xl relative">
              <div className="eyebrow !text-ink/60">STAY CURIOUS</div>
              <h2 className="font-serif text-3xl md:text-4xl mt-4 mb-4 text-ink">
                Get new essays in your <em className="italic">inbox</em>.
              </h2>
              <p className="text-ink-soft mb-8">
                One thoughtful article each week. No noise, no spam — just ideas
                worth your time.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-transparent border-b border-ink/30 px-0.5 py-2.5 text-sm placeholder:text-ink/50 focus:outline-none focus:border-ink transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="btn-pill bg-ink text-ivory hover:bg-ink/80 whitespace-nowrap"
                >
                  Subscribe <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
