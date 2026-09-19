// components/AboutClient.tsx
"use client";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Palette,
  PenTool,
  GitBranch,
  Rocket,
  Sparkles,
  Heart,
  Coffee,
} from "lucide-react";

const stats = [
  { icon: Code2, value: "120+", label: "Articles Written" },
  { icon: Palette, value: "15+", label: "Years of Craft" },
  { icon: GitBranch, value: "200+", label: "Open Source Commits" },
  { icon: Rocket, value: "40+", label: "Projects Shipped" },
];

const values = [
  {
    icon: Heart,
    title: "Craft Over Hype",
    description:
      "Every post is written with intention — no clickbait, no filler. Just ideas that matter and code that works.",
  },
  {
    icon: Coffee,
    title: "Practical Wisdom",
    description:
      "Theory is useful, but practice is where learning happens. I write about what actually works in production.",
  },
  {
    icon: PenTool,
    title: "Clarity in Complexity",
    description:
      "The best writing makes the complex simple. I aim to explain deeply technical topics with warmth and clarity.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "The Blog Begins",
    description:
      "Started writing to share lessons learned from building production applications.",
  },
  {
    year: "2025",
    title: "Finding a Voice",
    description:
      "Focused on design systems and frontend architecture — the topics readers kept asking about.",
  },
  {
    year: "2026",
    title: "Growing Community",
    description:
      "Built a readership of developers who value craft, clarity, and intentional engineering.",
  },
];

export default function AboutClient() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute top-24 right-10 w-6 h-6 border-t border-r border-gold/40" />
        <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-gold/40" />
        <Sparkles className="absolute top-40 right-1/4 w-6 h-6 text-gold/50" />
        <Sparkles className="absolute bottom-40 left-1/4 w-5 h-5 text-gold/40" />

        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <div className="eyebrow">ABOUT THIS BLOG</div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.08] mt-4 mb-6">
              Notes from the intersection of{" "}
              <em className="italic text-lavender-deep">code and craft</em>.
            </h1>
            <p className="text-lg text-ink-soft mb-8 max-w-2xl">
              This is a space for thoughtful essays on development, design
              systems, and the craft of building software that lasts. Built with
              modern tools, written with intention.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="pb-24" ref={ref}>
        <div className="wrap">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-16 items-start">
            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-card bg-gradient-to-br from-lavender/30 via-sage/50 to-sage-deep/40 overflow-hidden relative">
                {/* Abstract monogram */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-8xl text-ink/20 italic">
                    D
                  </span>
                </div>

                {/* Decorative circuit pattern */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  viewBox="0 0 400 500"
                >
                  <g stroke="#2B2A3D" strokeWidth="1" fill="none">
                    <path d="M50 400 L150 320 L130 200 L250 280 L320 180" />
                    <path d="M150 320 L250 380 L340 340" />
                    <path d="M130 200 L80 120" />
                    <path d="M250 280 L200 120" />
                  </g>
                  <g fill="#2B2A3D">
                    <circle cx="50" cy="400" r="4" />
                    <circle cx="150" cy="320" r="4" />
                    <circle cx="130" cy="200" r="4" />
                    <circle cx="250" cy="280" r="4" />
                    <circle cx="320" cy="180" r="4" />
                    <circle cx="250" cy="380" r="4" />
                    <circle cx="340" cy="340" r="4" />
                    <circle cx="80" cy="120" r="4" />
                    <circle cx="200" cy="120" r="4" />
                  </g>
                </svg>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-ivory border border-gold/40 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-gold" />
              </div>
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-lavender/20 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-lavender-deep" />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-tight">
                Built with{" "}
                <em className="italic text-lavender-deep">modern tools</em>,
                written with{" "}
                <em className="italic text-lavender-deep">
                  timeless principles
                </em>
                .
              </h2>

              <div className="space-y-6 text-ink-soft leading-relaxed">
                <p>
                  This blog is a fully functional static site built with{" "}
                  <strong className="text-ink font-semibold">Next.js 16</strong>
                  ,{" "}
                  <strong className="text-ink font-semibold">
                    Tailwind CSS v4
                  </strong>
                  , and{" "}
                  <strong className="text-ink font-semibold">
                    Framer Motion
                  </strong>
                  . It serves as both a portfolio project and a living document
                  of modern frontend development practices.
                </p>

                <p>
                  The design draws inspiration from editorial and brand-focused
                  websites — warm, crafted, and intentional rather than cold and
                  corporate. Every detail, from the serif headlines to the gold
                  accents, is chosen to create a reading experience that feels
                  considered.
                </p>

                <p>
                  More importantly, this space is about the intersection of
                  technology and craft. It's about writing code that's not just
                  functional, but beautiful. About building systems that scale
                  without losing their soul. About the small decisions that make
                  products feel intentional.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mt-10 mb-12">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-lavender/20 flex items-center justify-center shrink-0">
                      <stat.icon className="w-4 h-4 text-lavender-deep" />
                    </div>
                    <div>
                      <div className="font-serif text-xl font-semibold">
                        {stat.value}
                      </div>
                      <div className="text-xs text-ink-faint">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Signature */}
              <div className="border-t border-ink/10 pt-8">
                <p className="font-hand text-2xl text-ink-soft">
                  — Written with care,
                </p>
                <p className="font-serif italic text-lg text-ink-soft mt-1">
                  The DevBlog Author
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-sage/30">
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="eyebrow justify-center">WHAT GUIDES ME</div>
            <h2 className="font-serif text-3xl md:text-4xl mt-4">
              Values that{" "}
              <em className="italic text-lavender-deep">shape the writing</em>.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-ivory rounded-card p-8 border border-ink/10"
              >
                <div className="w-12 h-12 rounded-full bg-lavender/20 flex items-center justify-center mb-6">
                  <value.icon className="w-5 h-5 text-lavender-deep" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="eyebrow justify-center">THE JOURNEY</div>
            <h2 className="font-serif text-3xl md:text-4xl mt-4">
              How this{" "}
              <em className="italic text-lavender-deep">blog evolved</em>.
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-ink/10" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-lavender border-2 border-ivory" />

                  <span className="text-xs font-bold tracking-[0.1em] uppercase text-lavender-deep mb-2 block">
                    {item.year}
                  </span>
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24">
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-lavender rounded-panel p-8 md:p-12 relative overflow-hidden text-center"
          >
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-gold/40 rounded-tl-panel" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-gold/40 rounded-br-panel" />

            <div className="relative max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl mb-4 text-ink">
                Ready to explore some <em className="italic">good writing</em>?
              </h2>
              <p className="text-ink-soft mb-8">
                Browse the latest essays or start with a topic that interests
                you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/"
                  className="btn-pill bg-ink text-ivory hover:bg-ink/80"
                >
                  Read Latest <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/categories" className="btn-pill ghost">
                  Browse Categories
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
