"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Edit3, Trash2 } from "lucide-react";
import { categoriesSeed } from "../data";

export default function CategoriesPage() {
  const [categories, setCategories] = useState(categoriesSeed);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const resetForm = () => {
    setName("");
    setSlug("");
    setEditingCategory(null);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((item) =>
          item.id === editingCategory.id
            ? { ...item, name, slug: slug || item.slug }
            : item
        )
      );
    } else {
      setCategories((prev) => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          name,
          slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
          blogs: 0,
        },
      ]);
    }
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setName(category.name);
    setSlug(category.slug);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Taxonomy
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Categories
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-slate-800 dark:bg-white dark:text-slate-900"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400 dark:bg-slate-950">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Slug</th>
              <th className="px-6 py-3">Number of Blogs</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-t border-slate-100 text-slate-700 dark:border-slate-800 dark:text-slate-200"
              >
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  {category.name}
                </td>
                <td className="px-6 py-4">{category.slug}</td>
                <td className="px-6 py-4">{category.blogs}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(category)}
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(category.id)}
                      className="rounded-lg border border-slate-200 p-2 text-rose-500 transition hover:bg-rose-50 dark:border-slate-800 dark:text-rose-300 dark:hover:bg-rose-950/40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-slate-400"
                >
                  No categories added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
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
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {editingCategory ? "Edit Category" : "Add Category"}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="text-sm text-slate-500"
                >
                  Close
                </button>
              </div>
              <div className="mt-4 space-y-3">
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-950"
                  placeholder="Category name"
                />
                <input
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-950"
                  placeholder="Slug (optional)"
                />
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-slate-900"
                >
                  Save Category
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
