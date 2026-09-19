// components/BlogListClient.tsx
"use client";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Sparkles,
  Calendar,
  Clock,
  Filter,
} from "lucide-react";
import type { Post } from "@/types/blog";

interface BlogListClientProps {
  posts: Post[];
}

export default function BlogListClient({ posts = [] }: BlogListClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Safe posts array
  const validPosts = Array.isArray(posts)
    ? posts.filter((post) => post && post.slug)
    : [];

  // Extract unique categories
  const categories = [
    "All",
    ...new Set(validPosts.map((post) => post.category || "Uncategorized")),
  ];

  // Filter posts based on search and category
  useEffect(() => {
    let filtered = [...validPosts];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (post) => (post.category || "Uncategorized") === selectedCategory,
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((post) => {
        const title = (post.title || "").toLowerCase();
        const description = (post.description || "").toLowerCase();
        const tags = post.tags || [];
        const tagMatch = tags.some((tag) => tag.toLowerCase().includes(query));

        return title.includes(query) || description.includes(query) || tagMatch;
      });
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, posts]);

  // Initialize filtered posts
  useEffect(() => {
    setFilteredPosts(validPosts);
  }, []);

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
              Back to Home
            </Link>

            <div className="eyebrow">ALL ARTICLES</div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.08] mt-4 mb-6">
              The{" "}
              <em className="italic text-lavender-deep">complete archive</em>.
            </h1>
            <p className="text-lg text-ink-soft mb-8">
              Every essay, tutorial, and reflection — organized chronologically
              for your reading pleasure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="pb-12" ref={ref}>
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-ivory rounded-card border border-ink/10 p-6 mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-faint" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full h-12 bg-cream border border-ink/10 rounded-full pl-12 pr-4 text-sm focus:outline-none focus:border-lavender transition-colors"
                />
              </div>

              {/* Category Filter - Desktop */}
              <div className="hidden lg:flex items-center gap-2 flex-wrap">
                <Filter className="w-4 h-4 text-ink-faint mr-2" />
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                      selectedCategory === category
                        ? "bg-ink text-ivory"
                        : "bg-cream text-ink-soft border border-ink/10 hover:border-ink/30"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden flex items-center justify-center gap-2 h-12 bg-cream border border-ink/10 rounded-full text-sm font-semibold text-ink-soft hover:border-ink/30 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filter: {selectedCategory}
              </button>
            </div>

            {/* Mobile Filter Menu */}
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mt-4 pt-4 border-t border-ink/10"
              >
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFilterOpen(false);
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                        selectedCategory === category
                          ? "bg-ink text-ivory"
                          : "bg-cream text-ink-soft border border-ink/10"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-ink-faint">
              Showing {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "article" : "articles"}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
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
                const description = post.description || "";
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
                <Search className="w-8 h-8 text-lavender-deep" />
              </div>
              <p className="font-serif text-2xl text-ink-soft mb-4">
                No articles found
              </p>
              <p className="text-sm text-ink-faint mb-8">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="btn-pill"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
