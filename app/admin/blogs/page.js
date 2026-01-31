"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
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
import { blogCategories, blogStatuses } from "../data";

const perPage = 5;

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [editingBlog, setEditingBlog] = useState(null);
  const [previewBlog, setPreviewBlog] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("http://localhost:5000/api/v1/blogs");
      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.status}`);
      }
      const data = await response.json();
      // The blogs are in the 'data' property of the API response
      const blogsList = data.data || [];
      
      // Ensure data structure matches what the UI expects
      const formattedBlogs = blogsList.map(blog => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        category: blog.category_name || blog.category?.name || "General",
        status: blog.status === "published" ? "Published" : "Draft",
        date: blog.created_at ? new Date(blog.created_at).toLocaleDateString() : "N/A",
        comments: blog.comments_count || 0,
        excerpt: blog.short_description || "",
        tags: blog.keywords ? blog.keywords.split(",").map(t => t.trim()) : [],
        ...blog
      }));

      setBlogs(formattedBlogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

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

  const handleDelete = async (id) => {
    // Show confirmation dialog
    if (!window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      return;
    }

    try {
      setDeletingId(id);
      setDeleteError(null);
      setDeleteSuccess(null);

      const response = await fetch(`http://localhost:5000/api/v1/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to delete blog: ${response.status}`);
      }

      // Remove from local state on success
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      setDeleteSuccess(`Blog post deleted successfully!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setDeleteSuccess(null), 3000);

    } catch (err) {
      console.error('Error deleting blog:', err);
      setDeleteError(`Failed to delete: ${err.message}`);
      
      // Clear error message after 5 seconds
      setTimeout(() => setDeleteError(null), 5000);
    } finally {
      setDeletingId(null);
    }
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
          <h2 className="text-2xl font-semibold text-slate-900">
            Blog List
          </h2>
        </div>
        <Link
          href="/admin/blogs/add"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          Add Blog
        </Link>
      </div>

      {/* Success Message */}
      {deleteSuccess && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          ✅ {deleteSuccess}
        </div>
      )}

      {/* Error Message */}
      {(deleteError || error) && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          ❌ {deleteError || error}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
          <Search className="h-4 w-4" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent focus:outline-none"
            placeholder="Search blogs..."
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
        
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
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
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
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

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400">
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
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
                      <p className="text-slate-500 font-medium">Loading blogs...</p>
                    </div>
                  </td>
                </tr>
              ) : pageData.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Search className="h-8 w-8 opacity-20" />
                      <p>No blogs found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                pageData.map((blog) => (
                  <tr
                    key={blog.id}
                    className="border-t border-slate-100 text-slate-700"
                  >
                    <td className="px-6 py-4">
                      {blog.thumbnail_url ? (
                        <div className="h-12 w-12 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                          <img 
                            src={blog.thumbnail_url} 
                            alt="" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-xl bg-linear-to-br from-indigo-500 to-cyan-400" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">
                        {blog.title}
                      </p>
                      <p className="text-xs text-slate-400">{blog.slug}</p>
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
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingBlog(blog)}
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                          aria-label="Edit"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewBlog(blog)}
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                          aria-label="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(blog.id)}
                          disabled={deletingId === blog.id}
                          className="rounded-lg border border-slate-200 p-2 text-rose-500 transition hover:bg-rose-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Delete"
                          title={deletingId === blog.id ? "Deleting..." : "Delete blog"}
                        >
                          {deletingId === blog.id ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          Showing {pageData.length} of {filteredBlogs.length} results
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-100 disabled:opacity-40"
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
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {value}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            className="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-100 disabled:opacity-40"
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
              className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
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
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
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
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
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
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
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
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEditSave}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
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
              className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">
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
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p className="text-lg font-semibold text-slate-900">
                  {previewBlog.title}
                </p>
                <p>{previewBlog.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {previewBlog.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
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
