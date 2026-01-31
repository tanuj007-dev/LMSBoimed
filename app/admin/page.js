"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { FileText, FolderKanban, MessageSquare, Users, Loader2 } from "lucide-react";
import StatCard from "./components/StatCard";
import { categoriesSeed, commentsSeed, usersSeed } from "./data";

export default function AdminDashboardPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/v1/blogs");
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      const blogsList = data.data || [];
      
      const formattedBlogs = blogsList.map(blog => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        thumbnail_url: blog.thumbnail_url,
        category: blog.category_name || "General",
        status: blog.status === "published" ? "Published" : "Draft",
        date: blog.created_at ? new Date(blog.created_at).toLocaleDateString() : "N/A",
        comments: blog.comments_count || 0
      }));
      
      setBlogs(formattedBlogs);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Overview
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Dashboard Stats
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Blogs"
            value={isLoading ? "..." : blogs.length}
            icon={FileText}
            helper="Across all categories"
          />
          <StatCard
            title="Total Categories"
            value={categoriesSeed.length}
            icon={FolderKanban}
            helper="Active taxonomies"
          />
          <StatCard
            title="Total Users"
            value={usersSeed.length}
            icon={Users}
            helper="Admins and editors"
          />
          <StatCard
            title="Total Comments"
            value={commentsSeed.length}
            icon={MessageSquare}
            helper="Awaiting review"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Activity
            </p>
            <h3 className="text-lg font-semibold text-slate-900">
              Recent Blogs
            </h3>
          </div>
          <Link 
            href="/admin/blogs"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
          >
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Comments</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center">
                    <div className="flex justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    No blogs found.
                  </td>
                </tr>
              ) : (
                blogs.slice(0, 5).map((blog) => (
                  <tr
                    key={blog.id}
                    className="border-t border-slate-100 text-slate-700"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {blog.thumbnail_url || blog.image ? (
                          <div className="h-10 w-10 rounded-xl overflow-hidden border border-slate-100 shadow-sm shrink-0">
                            <img 
                              src={blog.thumbnail_url || blog.image} 
                              alt="" 
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-xl bg-linear-to-br from-indigo-500 to-cyan-400 shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-slate-900">
                            {blog.title}
                          </p>
                          <p className="text-xs text-slate-400">{blog.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{blog.category}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          blog.status === "Published"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{blog.date}</td>
                    <td className="px-6 py-4">{blog.comments}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
