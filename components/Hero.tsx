// components/Hero.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
      {/* Decorative elements */}
      <Sparkles className="absolute top-24 right-10 w-6 h-6 text-gold/60" />
      <div className="absolute bottom-12 left-8 w-6 h-6 border-t border-l border-gold/40" />
      <div className="absolute top-1/3 right-8 w-6 h-6 border-b border-r border-gold/40" />

      <div className="wrap">
        <div className="grid lg:grid-cols-[1fr_1fr_40px] gap-5 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-copy"
          >
            <div className="eyebrow">CODE, DESIGN & PRACTICE</div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.08] mt-4 mb-6">
              Writing that{" "}
              <em className="italic text-lavender-deep">builds better</em>{" "}
              software.
            </h1>
            <p className="text-base md:text-lg text-ink-soft max-w-[420px] mb-8">
              Essays on development, design systems, and the craft of building
              products that last — written with intention.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/#latest" className="btn-pill">
                Read Latest <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about" className="link-arrow">
                About Me
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="arch relative w-full max-w-[420px] aspect-[3/3.6] rounded-t-full overflow-hidden bg-gradient-to-br from-lavender/40 via-sage to-sage-deep/50 shadow-2xl">
              {/* Abstract code/network visualization */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 420 500"
              >
                <g
                  stroke="#2B2A3D"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                  fill="none"
                >
                  <path
                    className="edge"
                    d="M60 420 L150 340"
                    strokeDasharray="4 6"
                  />
                  <path
                    className="edge"
                    d="M150 340 L120 230"
                    strokeDasharray="4 6"
                  />
                  <path
                    className="edge"
                    d="M150 340 L260 300"
                    strokeDasharray="4 6"
                  />
                  <path
                    className="edge"
                    d="M260 300 L230 180"
                    strokeDasharray="4 6"
                  />
                  <path
                    className="edge"
                    d="M230 180 L120 230"
                    strokeDasharray="4 6"
                  />
                  <path
                    className="edge"
                    d="M260 300 L340 360"
                    strokeDasharray="4 6"
                  />
                  <path
                    className="edge"
                    d="M230 180 L300 100"
                    strokeDasharray="4 6"
                  />
                  <path
                    className="edge"
                    d="M120 230 L60 140"
                    strokeDasharray="4 6"
                  />
                </g>
                <g fill="#2B2A3D">
                  <circle cx="60" cy="420" r="4" className="animate-pulse" />
                  <circle
                    cx="150"
                    cy="340"
                    r="4"
                    className="animate-pulse"
                    style={{ animationDelay: "0.6s" }}
                  />
                  <circle
                    cx="120"
                    cy="230"
                    r="4"
                    className="animate-pulse"
                    style={{ animationDelay: "1.2s" }}
                  />
                  <circle
                    cx="260"
                    cy="300"
                    r="4"
                    className="animate-pulse"
                    style={{ animationDelay: "1.8s" }}
                  />
                  <circle
                    cx="230"
                    cy="180"
                    r="4"
                    className="animate-pulse"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <circle
                    cx="340"
                    cy="360"
                    r="4"
                    className="animate-pulse"
                    style={{ animationDelay: "0.9s" }}
                  />
                  <circle
                    cx="300"
                    cy="100"
                    r="4"
                    className="animate-pulse"
                    style={{ animationDelay: "1.5s" }}
                  />
                  <circle
                    cx="60"
                    cy="140"
                    r="4"
                    className="animate-pulse"
                    style={{ animationDelay: "2.1s" }}
                  />
                </g>
              </svg>
            </div>

            <Sparkles className="absolute -top-4 -left-4 w-8 h-8 text-gold/60" />
            <Sparkles className="absolute bottom-24 -right-8 w-6 h-6 text-gold/40" />
          </motion.div>

          <div className="side-label hidden lg:flex flex-col items-center gap-3 text-[11px] font-bold tracking-[0.22em] uppercase text-ink-faint">
            CODE · DESIGN · PRACTICE
            <span className="w-px flex-1 bg-gradient-to-b from-gold to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
