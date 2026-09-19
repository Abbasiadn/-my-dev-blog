// components/HowWeHelp.tsx (Categories/Featured Topics)
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Code2, Palette, Boxes, Terminal } from "lucide-react";

const topics = [
  {
    icon: Code2,
    title: "Frontend Architecture",
    description:
      "Component design, state management, and building scalable UI systems.",
  },
  {
    icon: Palette,
    title: "Design Systems",
    description:
      "Creating cohesive visual languages that scale across products and teams.",
  },
  {
    icon: Boxes,
    title: "Backend Patterns",
    description:
      "API design, data modeling, and the patterns that keep systems maintainable.",
  },
  {
    icon: Terminal,
    title: "Developer Workflow",
    description:
      "Tooling, automation, and the daily practices that compound over time.",
  },
];

export default function Categories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-sage" ref={ref}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-head"
        >
          <div className="eyebrow">TOPICS I COVER</div>
          <h2>
            Areas I <em className="italic text-lavender-deep">return to</em>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-9">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-t border-ink/20 pt-6"
            >
              <topic.icon className="w-9 h-9 mb-5 text-ink" strokeWidth={1.2} />
              <h3 className="font-serif text-lg font-semibold mb-3">
                {topic.title}
              </h3>
              <p className="text-sm text-ink-soft mb-4">{topic.description}</p>
              <Link href="/categories" className="link-arrow text-xs">
                Explore <ArrowRight className="inline w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
