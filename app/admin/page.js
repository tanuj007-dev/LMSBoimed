"use client";

import { FileText, FolderKanban, MessageSquare, Users } from "lucide-react";
import StatCard from "./components/StatCard";
import { blogsSeed, categoriesSeed, commentsSeed, usersSeed } from "./data";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Overview
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Dashboard Stats
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Blogs"
            value={blogsSeed.length}
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

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Activity
            </p>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Recent Blogs
            </h3>
          </div>
          <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800">
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400 dark:bg-slate-950">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Comments</th>
              </tr>
            </thead>
            <tbody>
              {blogsSeed.slice(0, 5).map((blog) => (
                <tr
                  key={blog.id}
                  className="border-t border-slate-100 text-slate-700 dark:border-slate-800 dark:text-slate-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
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
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{blog.date}</td>
                  <td className="px-6 py-4">{blog.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
