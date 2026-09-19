// components/ClosingCTA.tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Send } from "lucide-react";

export default function ClosingCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section id="contact" className="py-24" ref={ref}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-lavender rounded-panel overflow-hidden relative"
        >
          {/* Decorative accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-gold/40 rounded-tl-panel" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-gold/40 rounded-br-panel" />

          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[300px] bg-gradient-to-br from-sage/60 to-sage-deep/50">
              {/* Abstract visual */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 400"
              >
                <g
                  stroke="#2B2A3D"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                  fill="none"
                >
                  <path
                    d="M40 340 L140 260 L120 150 L240 190 L300 90 L340 200"
                    strokeDasharray="4 6"
                  />
                </g>
                <g fill="#2B2A3D">
                  <circle cx="40" cy="340" r="4" />
                  <circle cx="140" cy="260" r="4" />
                  <circle cx="120" cy="150" r="4" />
                  <circle cx="240" cy="190" r="4" />
                  <circle cx="300" cy="90" r="4" />
                  <circle cx="340" cy="200" r="4" />
                </g>
              </svg>
            </div>

            <div className="p-8 md:p-14 text-ink">
              <div className="eyebrow !text-ink/60">GET IN TOUCH</div>
              <h2 className="font-serif text-2xl md:text-3xl mt-4 mb-6">
                Questions, ideas, or{" "}
                <em className="italic">just saying hello?</em>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-ink/30 px-0.5 py-2.5 text-sm placeholder:text-ink/50 focus:outline-none focus:border-ink transition-colors"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-ink/30 px-0.5 py-2.5 text-sm placeholder:text-ink/50 focus:outline-none focus:border-ink transition-colors"
                    required
                  />
                </div>
                <textarea
                  rows={3}
                  placeholder="What's on your mind?"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-ink/30 px-0.5 py-2.5 text-sm placeholder:text-ink/50 focus:outline-none focus:border-ink transition-colors resize-none"
                  required
                />
                <button
                  type="submit"
                  className="btn-pill bg-ink text-ivory hover:bg-ink/80"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
