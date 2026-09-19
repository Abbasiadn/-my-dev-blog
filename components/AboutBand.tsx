// components/AboutBand.tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, PenTool, GitBranch, Rocket, Sparkles } from "lucide-react";

const stats = [
  { icon: Code2, value: "120+", label: "Articles Written" },
  { icon: PenTool, value: "15+", label: "Years Coding" },
  { icon: GitBranch, value: "200+", label: "Open Source Commits" },
  { icon: Rocket, value: "40+", label: "Projects Shipped" },
];

export default function AboutBand() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24" ref={ref}>
      <div className="wrap">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-card bg-gradient-to-br from-lavender/30 via-sage/50 to-sage-deep/40 overflow-hidden relative">
              {/* Abstract avatar/monogram */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-8xl text-ink/30 italic">
                  D
                </span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-ivory border border-gold/40 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-gold" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="eyebrow">ABOUT THIS BLOG</div>
            <h2 className="font-serif text-3xl md:text-4xl mt-4 mb-5 leading-tight">
              Notes from the intersection of{" "}
              <em className="italic text-lavender-deep">code and craft</em>.
            </h2>
            <p className="text-ink-soft max-w-[480px] mb-8">
              I write about building software that lasts — design systems,
              frontend architecture, and the small decisions that make products
              feel intentional rather than accidental.
            </p>

            <div className="grid grid-cols-2 gap-6 max-w-[440px] mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-full bg-lavender/20 flex items-center justify-center shrink-0">
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

            <p className="font-hand text-2xl text-ink-soft">
              — Written with care,
            </p>
            <p className="font-serif italic text-lg text-ink-soft mt-1">
              The DevBlog Author
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
