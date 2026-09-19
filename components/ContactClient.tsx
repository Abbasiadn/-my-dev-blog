// components/ContactClient.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Send,
  Sparkles,
  Mail,
  MapPin,
} from "lucide-react";
import { useState } from "react";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setIsSubmitted(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute top-24 right-10 w-6 h-6 border-t border-r border-gold/40" />
        <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-gold/40" />
        <Sparkles className="absolute top-40 right-1/4 w-6 h-6 text-gold/50" />

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

            <div className="eyebrow">GET IN TOUCH</div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.08] mt-4 mb-6">
              Let's start a{" "}
              <em className="italic text-lavender-deep">conversation</em>.
            </h1>
            <p className="text-lg text-ink-soft mb-8">
              Questions, ideas, or just want to connect? I'd love to hear from
              you — whether it's about code, design, or the craft of building
              better software.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
            {/* Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-sage/30 rounded-card p-8">
                <h2 className="font-serif text-2xl mb-6">Contact Details</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-lavender/20 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-lavender-deep" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-1">Email</h3>
                      <Link
                        href="mailto:hello@devblog.com"
                        className="text-sm text-ink-soft hover:text-lavender-deep transition-colors"
                      >
                        hello@devblog.com
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-lavender/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-lavender-deep" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-1">Location</h3>
                      <p className="text-sm text-ink-soft">
                        Remote-first, writing from somewhere with good coffee.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-lavender rounded-card p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gold/40 rounded-tr-card" />
                <h3 className="font-serif text-xl mb-4">What to Expect</h3>
                <p className="text-sm text-ink-soft leading-relaxed">
                  I typically respond within 2-3 business days. If you're
                  reaching out about a project or collaboration, please include
                  as much detail as possible.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-ivory rounded-panel border border-ink/10 p-8 md:p-10 relative"
            >
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/40 rounded-tl-panel" />

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-lavender/20 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-6 h-6 text-lavender-deep" />
                  </div>
                  <h2 className="font-serif text-2xl mb-4">Message Sent!</h2>
                  <p className="text-ink-soft mb-8">
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-pill"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-serif text-2xl mb-8">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-heading mb-2"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Your name"
                          className="w-full bg-transparent border-b border-ink/30 px-0.5 py-2.5 text-sm placeholder:text-ink-faint focus:outline-none focus:border-lavender-deep transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-heading mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="hello@example.com"
                          className="w-full bg-transparent border-b border-ink/30 px-0.5 py-2.5 text-sm placeholder:text-ink-faint focus:outline-none focus:border-lavender-deep transition-colors"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-heading mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="What's on your mind?"
                        className="w-full bg-transparent border-b border-ink/30 px-0.5 py-2.5 text-sm placeholder:text-ink-faint focus:outline-none focus:border-lavender-deep transition-colors resize-none"
                        required
                      />
                    </div>
                    <button type="submit" className="btn-pill w-full">
                      Send Message <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-sage/30">
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="eyebrow justify-center">FAQs</div>
            <h2 className="font-serif text-3xl md:text-4xl mt-4">
              Common <em className="italic text-lavender-deep">questions</em>.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: "Do you take guest posts?",
                a: "Occasionally! I'm always open to featuring thoughtful pieces from other developers and designers. Reach out with your idea.",
              },
              {
                q: "Can I republish your articles?",
                a: "Please contact me for permission. I'm generally happy to share with proper attribution.",
              },
              {
                q: "Do you offer consulting?",
                a: "I'm available for select consulting engagements around design systems and frontend architecture.",
              },
              {
                q: "How often do you publish?",
                a: "I aim for one thoughtful essay each week, though I prioritize quality over schedule.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-ivory rounded-card p-6 border border-ink/10"
              >
                <h3 className="font-serif text-lg font-semibold mb-3">
                  {faq.q}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
