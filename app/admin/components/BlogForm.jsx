"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ImageUp,
  Link2,
  List,
  Bold,
  Italic,
  Tag,
  FileText,
} from "lucide-react";
import { blogCategories, blogStatuses } from "../data";

export default function BlogForm({ mode = "add", initialData }) {
  const defaults = useMemo(
    () => ({
      title: "",
      slug: "",
      shortDescription: "",
      category: blogCategories[0],
      tags: [],
      featuredImage: "",
      content: "",
      seoTitle: "",
      seoDescription: "",
      status: "Draft",
    }),
    []
  );

  const data = { ...defaults, ...(initialData || {}) };
  const [title, setTitle] = useState(data.title);
  const [slug, setSlug] = useState(data.slug);
  const [isSlugTouched, setIsSlugTouched] = useState(Boolean(data.slug));
  const [shortDescription, setShortDescription] = useState(
    data.shortDescription || data.excerpt || ""
  );
  const [category, setCategory] = useState(data.category);
  const [tags, setTags] = useState(data.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [featuredImage, setFeaturedImage] = useState(data.featuredImage || "");
  const [content, setContent] = useState(data.content || "");
  const [seoTitle, setSeoTitle] = useState(data.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(
    data.seoDescription || ""
  );
  const [status, setStatus] = useState(data.status || "Draft");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isSlugTouched) {
      const nextSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(nextSlug);
    }
  }, [title, isSlugTouched]);

  const addTag = (value) => {
    const cleaned = value.trim();
    if (!cleaned || tags.includes(cleaned)) return;
    setTags((prev) => [...prev, cleaned]);
    setTagInput("");
  };

  const handleTagKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(tagInput);
    }
  };

  const handleSave = (nextStatus) => {
    setStatus(nextStatus);
    setMessage(
      nextStatus === "Published"
        ? "Post published locally."
        : "Draft saved locally."
    );
    setTimeout(() => setMessage(""), 2500);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {mode === "edit" ? "Edit blog post" : "Create new blog post"}
            </p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              {mode === "edit" ? "Update content details" : "Compose your story"}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleSave("Draft")}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSave("Published")}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-slate-800 dark:bg-white dark:text-slate-900"
            >
              Publish
            </button>
          </div>
        </div>
        {message && (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-200">
            {message}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Blog Content
            </h3>
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Blog Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  placeholder="Enter blog title"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(event) => {
                    setSlug(event.target.value);
                    setIsSlugTouched(true);
                  }}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  placeholder="blog-slug"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Short Description
                </label>
                <textarea
                  rows={3}
                  value={shortDescription}
                  onChange={(event) => setShortDescription(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  placeholder="Write a concise summary..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Blog Content
                </label>
                <div className="mt-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 text-slate-500 dark:border-slate-800 dark:text-slate-300">
                    <button
                      type="button"
                      className="rounded-lg border border-slate-200 px-3 py-1 text-xs dark:border-slate-700"
                    >
                      <Bold className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-slate-200 px-3 py-1 text-xs dark:border-slate-700"
                    >
                      <Italic className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-slate-200 px-3 py-1 text-xs dark:border-slate-700"
                    >
                      <List className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-slate-200 px-3 py-1 text-xs dark:border-slate-700"
                    >
                      <Link2 className="h-3 w-3" />
                    </button>
                  </div>
                  <textarea
                    rows={10}
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    className="mt-3 w-full resize-none bg-transparent text-sm text-slate-900 focus:outline-none dark:text-white"
                    placeholder="Start writing your blog content..."
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Post Settings
            </h3>
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                >
                  {blogCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Tags
                </label>
                <div className="mt-2 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
                  <Tag className="h-4 w-4 text-slate-400" />
                  <input
                    value={tagInput}
                    onChange={(event) => setTagInput(event.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="min-w-[120px] flex-1 bg-transparent text-sm text-slate-900 focus:outline-none dark:text-white"
                    placeholder="Type and press enter"
                  />
                  <button
                    type="button"
                    onClick={() => addTag(tagInput)}
                    className="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-200"
                  >
                    Add
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-200"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() =>
                            setTags((prev) => prev.filter((tag) => tag !== item))
                          }
                          className="text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Featured Image
                </label>
                <label className="mt-2 flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500 transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
                  <ImageUp className="h-4 w-4" />
                  <span>
                    {featuredImage ? featuredImage : "Upload featured image"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(event) =>
                      setFeaturedImage(event.target.files?.[0]?.name || "")
                    }
                  />
                </label>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                >
                  {blogStatuses.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              SEO Settings
            </h3>
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(event) => setSeoTitle(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  placeholder="SEO title"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  SEO Description
                </label>
                <textarea
                  rows={4}
                  value={seoDescription}
                  onChange={(event) => setSeoDescription(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  placeholder="SEO meta description"
                />
              </div>
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <p>Preview snippet will appear here.</p>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Optimized for 50-60 characters and 150-160 characters.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
