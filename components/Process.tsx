// components/Process.tsx (How I Write)
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Lightbulb,
  PenTool,
  GitCommit,
  RefreshCw,
  BookOpen,
} from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Observe",
    description: "Notice patterns in daily work",
  },
  {
    icon: PenTool,
    title: "Draft",
    description: "Write freely, structure later",
  },
  {
    icon: GitCommit,
    title: "Refine",
    description: "Edit ruthlessly, clarify examples",
  },
  {
    icon: RefreshCw,
    title: "Review",
    description: "Test code, verify accuracy",
  },
  {
    icon: BookOpen,
    title: "Publish",
    description: "Share and continue the dialogue",
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-lavender/20" ref={ref}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-head"
        >
          <div className="eyebrow">HOW I WRITE</div>
          <h2>
            A process for{" "}
            <em className="italic text-lavender-deep">clear thinking</em>.
          </h2>
        </motion.div>

        <div className="relative mt-10">
          <div className="hidden lg:block absolute top-5 left-[10%] right-[10%] border-t-2 border-dashed border-ink/30" />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center relative"
              >
                <div className="w-10 h-10 mx-auto rounded-full bg-ivory border-2 border-ink flex items-center justify-center mb-4 relative z-10">
                  <step.icon className="w-4 h-4 text-ink" />
                </div>
                <div className="text-xs text-ink-faint font-medium mb-2">
                  0{i + 1}
                </div>
                <h3 className="font-serif text-base font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-ink-soft">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
