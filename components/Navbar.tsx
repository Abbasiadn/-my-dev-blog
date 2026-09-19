// components/Navbar.tsx
"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import BaseLink from "./BaseLink";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Categories", href: "/categories" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 w-full z-50 bg-cream/90 backdrop-blur-md border-b border-ink/10">
      <div className="wrap">
        <div className="flex items-center justify-between py-5">
          <BaseLink href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 relative">
              <svg viewBox="0 0 26 26" fill="none" className="w-full h-full">
                <path
                  d="M13 1L24 7V19L13 25L2 19V7L13 1Z"
                  stroke="#2B2A3D"
                  strokeWidth="1.2"
                />
                <circle cx="13" cy="13" r="3" fill="#A8A6D9" />
              </svg>
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-gold" />
            </div>
            <span>
              <span className="font-serif text-xl font-semibold">DevBlog</span>
              <span className="block text-[9.5px] tracking-[0.14em] uppercase text-ink-faint font-semibold mt-0.5">
                Code · Design · Practice
              </span>
            </span>
          </BaseLink>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <BaseLink
                  key={link.name}
                  href={link.href}
                  className={`text-[13px] font-semibold transition-colors ${
                    isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {link.name}
                </BaseLink>
              );
            })}
            <BaseLink
              href="/contact"
              className="btn-pill text-[13px] px-5 py-2.5"
            >
              Subscribe
            </BaseLink>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-ink-soft hover:text-ink"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream border-t border-ink/10"
          >
            <div className="wrap py-6 space-y-4">
              {navLinks.map((link) => (
                <BaseLink
                  key={link.name}
                  href={link.href}
                  className="block text-sm font-semibold text-ink-soft hover:text-ink"
                >
                  {link.name}
                </BaseLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
