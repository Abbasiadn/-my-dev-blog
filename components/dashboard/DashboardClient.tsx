// components/dashboard/DashboardClient.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  LogOut,
  User,
  Shield,
  Sparkles,
  ArrowRight,
  Users,
  FileText,
  Settings,
} from "lucide-react";
import type { User as UserType } from "@/lib/auth";
import BaseLink from "../BaseLink";
import { fetchAPI } from "@/lib/api";

interface DashboardClientProps {
  user: UserType;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetchAPI("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="wrap">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-ivory rounded-panel border border-ink/10 p-8 md:p-10 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-gold/40 rounded-tr-panel" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-lavender/40 to-sage flex items-center justify-center">
                <User className="w-8 h-8 text-lavender-deep" />
              </div>
              <div>
                <h1 className="font-serif text-3xl">Welcome, {user.name}!</h1>
                <p className="text-sm text-ink-soft mt-1">
                  {user.role === "admin"
                    ? "Administrator Account"
                    : "Member Account"}
                </p>
              </div>
            </div>
            <button onClick={handleLogout} className="btn-pill ghost text-sm">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Role Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`rounded-card p-6 mb-8 flex items-center gap-4 ${
            user.role === "admin" ? "bg-lavender/20" : "bg-sage/30"
          }`}
        >
          {user.role === "admin" ? (
            <Shield className="w-8 h-8 text-lavender-deep" />
          ) : (
            <User className="w-8 h-8 text-ink-soft" />
          )}
          <div>
            <h2 className="font-serif text-xl font-semibold">
              {user.role === "admin" ? "Admin Access" : "User Access"}
            </h2>
            <p className="text-sm text-ink-soft">
              {user.role === "admin"
                ? "You have full access to manage posts, users, and settings."
                : "You can read posts, bookmark content, and manage your profile."}
            </p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-ivory rounded-card border border-ink/10 p-6"
          >
            <FileText className="w-8 h-8 text-lavender-deep mb-4" />
            <h3 className="font-serif text-lg font-semibold mb-2">
              Browse Posts
            </h3>
            <p className="text-sm text-ink-soft mb-4">
              Explore the latest articles and essays.
            </p>
            <BaseLink href="/blog" className="link-arrow text-sm">
              View Posts <ArrowRight className="inline w-3 h-3" />
            </BaseLink>
          </motion.div>

          {user.role === "admin" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-ivory rounded-card border border-ink/10 p-6"
            >
              <Users className="w-8 h-8 text-lavender-deep mb-4" />
              <h3 className="font-serif text-lg font-semibold mb-2">
                Manage Users
              </h3>
              <p className="text-sm text-ink-soft mb-4">
                View and manage user accounts.
              </p>
              <BaseLink href="/admin/users" className="link-arrow text-sm">
                Manage Users <ArrowRight className="inline w-3 h-3" />
              </BaseLink>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-ivory rounded-card border border-ink/10 p-6"
          >
            <Settings className="w-8 h-8 text-lavender-deep mb-4" />
            <h3 className="font-serif text-lg font-semibold mb-2">
              Profile Settings
            </h3>
            <p className="text-sm text-ink-soft mb-4">
              Update your profile information.
            </p>
            <BaseLink href="/profile" className="link-arrow text-sm">
              Edit Profile <ArrowRight className="inline w-3 h-3" />
            </BaseLink>
          </motion.div>
        </div>

        {/* Admin Only Section */}
        {user.role === "admin" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 bg-ink text-ivory rounded-card p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-gold" />
              <h3 className="font-serif text-xl font-semibold">Admin Panel</h3>
            </div>
            <p className="text-sm text-ivory/70 mb-6">
              You have administrative privileges. Access the full admin panel
              for advanced controls.
            </p>
            <BaseLink
              href="/admin"
              className="btn-pill bg-lavender text-ink hover:bg-lavender-deep hover:text-ivory"
            >
              Go to Admin Panel <ArrowRight className="w-4 h-4" />
            </BaseLink>
          </motion.div>
        )}
      </div>
    </main>
  );
}
