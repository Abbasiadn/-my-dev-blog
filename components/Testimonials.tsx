// components/Testimonials.tsx (Reader Notes)
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Clear, practical, and actually useful. This blog has changed how I approach component design.",
    name: "Alex Rivera",
    title: "Senior Frontend Engineer",
    initials: "AR",
  },
  {
    quote:
      "Finally, a dev blog that values craft over clicks. Every post is worth reading twice.",
    name: "Sam Chen",
    title: "Design Systems Lead",
    initials: "SC",
  },
  {
    quote:
      "The architecture essays alone are worth subscribing for. Pragmatic and deeply thoughtful.",
    name: "Jordan Blake",
    title: "Full-Stack Developer",
    initials: "JB",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24" ref={ref}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-head"
        >
          <div className="eyebrow">READER NOTES</div>
          <h2>
            Words from{" "}
            <em className="italic text-lavender-deep">the community</em>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-ivory rounded-card p-7 border border-ink/10"
            >
              <Quote className="w-8 h-8 text-lavender mb-4" />
              <p className="text-sm text-ink-soft mb-6 leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lavender/40 to-sage flex items-center justify-center text-sm font-semibold text-ink">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-ink-faint">
                    {testimonial.title}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-lavender rounded-card p-7 flex flex-col justify-between text-ink"
          >
            <p className="font-serif text-lg font-medium leading-snug">
              Join readers getting one thoughtful essay each week.
            </p>
            <Link href="/contact" className="link-arrow mt-6">
              Subscribe <ArrowRight className="inline w-3 h-3" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
