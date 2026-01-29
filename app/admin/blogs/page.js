"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Edit3,
  Eye,
  Filter,
  Search,
  Trash2,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { blogCategories, blogsSeed, blogStatuses } from "../data";

const perPage = 5;

export default function BlogsPage() {
  const [blogs, setBlogs] = useState(blogsSeed);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [editingBlog, setEditingBlog] = useState(null);
  const [previewBlog, setPreviewBlog] = useState(null);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.slug.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || blog.category === categoryFilter;
      const matchesStatus =
        statusFilter === "All" || blog.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogs, search, categoryFilter, statusFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, categoryFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / perPage));
  const pageData = filteredBlogs.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const handleDelete = (id) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  const handleEditSave = () => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === editingBlog.id ? editingBlog : blog
      )
    );
    setEditingBlog(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Content
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Blog List
          </h2>
        </div>
        <Link
          href="/admin/blogs/add"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-slate-800 dark:bg-white dark:text-slate-900"
        >
          <Plus className="h-4 w-4" />
          Add Blog
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
          <Search className="h-4 w-4" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent focus:outline-none"
            placeholder="Search blogs..."
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
          <Filter className="h-4 w-4" />
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
          >
            <option value="All">All Categories</option>
            {blogCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
          >
            <option value="All">All Status</option>
            {blogStatuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400 dark:bg-slate-950">
              <tr>
                <th className="px-6 py-3">Thumbnail</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((blog) => (
                <tr
                  key={blog.id}
                  className="border-t border-slate-100 text-slate-700 dark:border-slate-800 dark:text-slate-200"
                >
                  <td className="px-6 py-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400" />
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {blog.title}
                    </p>
                    <p className="text-xs text-slate-400">{blog.slug}</p>
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
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingBlog(blog)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
                        aria-label="Edit"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewBlog(blog)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
                        aria-label="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(blog.id)}
                        className="rounded-lg border border-slate-200 p-2 text-rose-500 transition hover:bg-rose-50 dark:border-slate-800 dark:text-rose-300 dark:hover:bg-rose-950/40"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {pageData.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-slate-400"
                  >
                    No blogs match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500 dark:text-slate-300">
          Showing {pageData.length} of {filteredBlogs.length} results
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-100 disabled:opacity-40 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
            disabled={page === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, index) => {
            const value = index + 1;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setPage(value)}
                className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                  page === value
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {value}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            className="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-100 disabled:opacity-40 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <AnimatePresence>
        {editingBlog && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Edit Blog
                  </h3>
                  <Link
                    href={`/admin/blogs/${editingBlog.id}/edit`}
                    className="text-xs text-slate-400 underline"
                  >
                    Open full editor
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="text-sm text-slate-500"
                >
                  Close
                </button>
              </div>
              <div className="mt-4 space-y-3">
                <input
                  value={editingBlog.title}
                  onChange={(event) =>
                    setEditingBlog({ ...editingBlog, title: event.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-950"
                  placeholder="Blog title"
                />
                <select
                  value={editingBlog.category}
                  onChange={(event) =>
                    setEditingBlog({
                      ...editingBlog,
                      category: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-950"
                >
                  {blogCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <select
                  value={editingBlog.status}
                  onChange={(event) =>
                    setEditingBlog({
                      ...editingBlog,
                      status: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-950"
                >
                  {blogStatuses.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEditSave}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-slate-900"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {previewBlog && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Blog Preview
                </h3>
                <button
                  type="button"
                  onClick={() => setPreviewBlog(null)}
                  className="text-sm text-slate-500"
                >
                  Close
                </button>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {previewBlog.title}
                </p>
                <p>{previewBlog.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {previewBlog.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
