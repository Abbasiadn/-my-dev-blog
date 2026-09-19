// components/admin/AdminDashboard.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  FolderOpen,
  BookOpen,
  Plus,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  LogOut,
  LayoutDashboard,
  UserPlus,
  FilePlus,
  FolderPlus,
  BookPlus,
} from "lucide-react";
import { fetchAPI } from "@/lib/api";
import type { User as UserType } from "@/types";

type Tab = "overview" | "users" | "posts" | "categories" | "blogs";

export default function AdminDashboard({ user }: { user: UserType }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [users, setUsers] = useState<UserType[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [usersRes, postsRes, categoriesRes, blogsRes] = await Promise.all([
        fetchAPI("/api/admin/users"),
        fetchAPI("/api/admin/posts"),
        fetchAPI("/api/admin/categories"),
        fetchAPI("/api/admin/blogs"),
      ]);

      if (usersRes.ok) setUsers((await usersRes.json()).users);
      if (postsRes.ok) setPosts((await postsRes.json()).posts);
      if (categoriesRes.ok)
        setCategories((await categoriesRes.json()).categories);
      if (blogsRes.ok) setBlogs((await blogsRes.json()).blogs);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveUser = async (userId: string) => {
    await fetchAPI(`/api/admin/users/${userId}/approve`, { method: "POST" });
    loadAllData();
  };

  const handleBlockUser = async (userId: string) => {
    await fetchAPI(`/api/admin/users/${userId}/block`, { method: "POST" });
    loadAllData();
  };

  const handleApprovePost = async (postId: string) => {
    await fetchAPI(`/api/admin/posts/${postId}/approve`, { method: "POST" });
    loadAllData();
  };

  const handleBlockPost = async (postId: string) => {
    await fetchAPI(`/api/admin/posts/${postId}/block`, { method: "POST" });
    loadAllData();
  };

  const handleApproveCategory = async (categoryId: string) => {
    await fetchAPI(`/api/admin/categories/${categoryId}/approve`, {
      method: "POST",
    });
    loadAllData();
  };

  const handleBlockCategory = async (categoryId: string) => {
    await fetchAPI(`/api/admin/categories/${categoryId}/block`, {
      method: "POST",
    });
    loadAllData();
  };

  const handleDeletePost = async (postId: string) => {
    await fetchAPI(`/api/admin/posts/${postId}`, { method: "DELETE" });
    loadAllData();
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "posts", label: "Posts", icon: FileText },
    { id: "categories", label: "Categories", icon: FolderOpen },
    { id: "blogs", label: "Blogs", icon: BookOpen },
  ];

  return (
    <main className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="wrap">
        {/* Header */}
        <div className="bg-ivory rounded-panel border border-ink/10 p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="font-serif text-3xl mb-2">Admin Dashboard</h1>
              <p className="text-ink-soft">
                Welcome back, {user.name}. Manage your blog content here.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="btn-pill text-sm">
                <Plus className="w-4 h-4" /> New Post
              </button>
              <button className="btn-pill ghost text-sm">
                <UserPlus className="w-4 h-4" /> Add User
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? "bg-ink text-ivory"
                  : "bg-ivory text-ink-soft border border-ink/10 hover:border-ink/30"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-4 gap-6">
            <StatCard
              icon={Users}
              label="Total Users"
              value={users.length}
              color="lavender"
            />
            <StatCard
              icon={FileText}
              label="Total Posts"
              value={posts.length}
              color="sage"
            />
            <StatCard
              icon={FolderOpen}
              label="Categories"
              value={categories.length}
              color="gold"
            />
            <StatCard
              icon={BookOpen}
              label="Active Blogs"
              value={blogs.filter((b) => b.status === "active").length}
              color="lavender"
            />

            {/* Recent Activity */}
            <div className="md:col-span-4 bg-ivory rounded-card border border-ink/10 p-6 mt-4">
              <h2 className="font-serif text-xl mb-4">Pending Approvals</h2>
              <div className="space-y-3">
                {users
                  .filter((u) => u.status === "pending")
                  .map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between bg-cream rounded-card p-4"
                    >
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-ink-soft">{user.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveUser(user.id)}
                          className="btn-pill text-xs bg-success text-white"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleBlockUser(user.id)}
                          className="btn-pill text-xs bg-danger text-white"
                        >
                          Block
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-ivory rounded-card border border-ink/10 overflow-hidden">
            <div className="p-6 border-b border-ink/10">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl">Manage Users</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-full border border-ink/10 text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cream">
                  <tr>
                    <th className="text-left p-4 text-xs uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider">
                      Email
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider">
                      Role
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(
                      (u) =>
                        u.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        u.email
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()),
                    )
                    .map((user) => (
                      <tr key={user.id} className="border-t border-ink/10">
                        <td className="p-4">{user.name}</td>
                        <td className="p-4 text-ink-soft">{user.email}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.role === "admin"
                                ? "bg-lavender/20 text-lavender-deep"
                                : "bg-sage/30 text-ink"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.status === "active"
                                ? "bg-success/20 text-success"
                                : user.status === "pending"
                                  ? "bg-warning/20 text-warning"
                                  : "bg-danger/20 text-danger"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {user.status === "pending" && (
                              <button
                                onClick={() => handleApproveUser(user.id)}
                                className="p-2 text-success hover:bg-success/10 rounded-full"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            {user.status !== "blocked" && (
                              <button
                                onClick={() => handleBlockUser(user.id)}
                                className="p-2 text-danger hover:bg-danger/10 rounded-full"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === "posts" && (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-ivory rounded-card border border-ink/10 p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-semibold">
                      {post.title}
                    </h3>
                    <p className="text-sm text-ink-soft mt-1">
                      by {post.authorName} · {post.category}
                    </p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        post.status === "approved"
                          ? "bg-success/20 text-success"
                          : post.status === "pending"
                            ? "bg-warning/20 text-warning"
                            : "bg-danger/20 text-danger"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {post.status === "pending" && (
                      <button
                        onClick={() => handleApprovePost(post.id)}
                        className="btn-pill text-xs bg-success text-white"
                      >
                        Approve
                      </button>
                    )}
                    {post.status !== "blocked" && (
                      <button
                        onClick={() => handleBlockPost(post.id)}
                        className="btn-pill text-xs bg-danger text-white"
                      >
                        Block
                      </button>
                    )}
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 text-danger hover:bg-danger/10 rounded-full"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-ivory rounded-card border border-ink/10 p-6"
              >
                <h3 className="font-serif text-lg font-semibold">
                  {category.name}
                </h3>
                <p className="text-sm text-ink-soft mt-2">
                  {category.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      category.status === "approved"
                        ? "bg-success/20 text-success"
                        : category.status === "pending"
                          ? "bg-warning/20 text-warning"
                          : "bg-danger/20 text-danger"
                    }`}
                  >
                    {category.status}
                  </span>
                  <div className="flex gap-2">
                    {category.status === "pending" && (
                      <button
                        onClick={() => handleApproveCategory(category.id)}
                        className="p-2 text-success hover:bg-success/10 rounded-full"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    {category.status !== "blocked" && (
                      <button
                        onClick={() => handleBlockCategory(category.id)}
                        className="p-2 text-danger hover:bg-danger/10 rounded-full"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blogs Tab */}
        {activeTab === "blogs" && (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-ivory rounded-card border border-ink/10 p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-semibold">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-ink-soft mt-1">
                      {blog.description}
                    </p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        blog.status === "active"
                          ? "bg-success/20 text-success"
                          : "bg-danger/20 text-danger"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </div>
                  <button className="btn-pill text-xs">
                    {blog.status === "active" ? "Block" : "Activate"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  const colorClasses: any = {
    lavender: "bg-lavender/20 text-lavender-deep",
    sage: "bg-sage/30 text-ink",
    gold: "bg-gold/20 text-ink",
  };

  return (
    <div className="bg-ivory rounded-card border border-ink/10 p-6">
      <div
        className={`w-12 h-12 rounded-full ${colorClasses[color]} flex items-center justify-center mb-4`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <p className="font-serif text-3xl font-semibold">{value}</p>
      <p className="text-sm text-ink-soft mt-1">{label}</p>
    </div>
  );
}
