"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  ImageUp,
  Tag,
  FileText,
  Upload,
  X,
  ChevronDown,
  Layout,
  Settings,
  Globe,
  User,
} from "lucide-react";
import { blogCategories, blogStatuses } from "../data";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full animate-pulse rounded-xl bg-slate-100" />
  ),
});

export default function BlogForm({ mode = "add", initialData }) {
  const fileInputRef = useRef(null);
  const defaults = useMemo(
    () => ({
      title: "",
      slug: "",
      shortDescription: "",
      category: blogCategories[0],
      tags: [],
      featuredImage: "",
      bannerImage: "",
      content: "",
      seoTitle: "",
      seoDescription: "",
      status: "Draft",
      readingTime: "5 min",
      categoryId: 1,
      authorId: "",
      imageAlt: "",
      imageCaption: "",
      focusKeyword: "",
      metaRobots: "index, follow",
      allowComments: true,
      isPopular: false,
      showOnHomepage: true,
      isSticky: false,
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
  const [bannerImage, setBannerImage] = useState(data.bannerImage || "");
  const [content, setContent] = useState(data.content || "");
  const [seoTitle, setSeoTitle] = useState(data.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(
    data.seoDescription || ""
  );
  const [status, setStatus] = useState(data.status || "Draft");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Additional fields for API
  const [readingTime, setReadingTime] = useState(data.readingTime || "5 min");
  const [categoryId, setCategoryId] = useState(data.categoryId || 1);
  const [authorId, setAuthorId] = useState(data.authorId || "");
  const [imageAlt, setImageAlt] = useState(data.imageAlt || "");
  const [imageCaption, setImageCaption] = useState(data.imageCaption || "");
  const [focusKeyword, setFocusKeyword] = useState(data.focusKeyword || "");
  const [metaRobots, setMetaRobots] = useState(data.metaRobots || "index, follow");
  const [allowComments, setAllowComments] = useState(data.allowComments !== false);
  const [isPopular, setIsPopular] = useState(data.isPopular || false);
  const [showOnHomepage, setShowOnHomepage] = useState(data.showOnHomepage !== false);
  const [isSticky, setIsSticky] = useState(data.isSticky || false);

  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const quillRef = useRef(null);

  // Fetch users for the author dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoadingUsers(true);
        const response = await fetch("http://localhost:5000/api/v1/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const result = await response.json();
        setUsers(result.data || []);
        
        // If adding and no author selected, pick the first one if available
        if (mode === "add" && !authorId && result.data?.length > 0) {
          setAuthorId(result.data[0].id);
        }
      } catch (err) {
        console.error("Error fetching users for blog form:", err);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [mode, authorId]);

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("folder", "biomed");

        const response = await fetch("http://localhost:5000/api/v1/images/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        const imageUrl = result.data?.url || result.url || result.path;

        if (imageUrl) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, "image", imageUrl);
        }
      } catch (err) {
        console.error("Quill image upload failed:", err);
      }
    };
  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["blockquote", "code-block"],
        ["link", "image"],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), [imageHandler]);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
    "color",
    "background",
  ];

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

  const handleImageUpload = async (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large. Max size is 10MB.");
      return;
    }

    try {
      setIsUploadingImage(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", "biomed");

      const response = await fetch("http://localhost:5000/api/v1/images/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to upload image");
      }

      const imageUrl = result.data?.url || result.url || result.path;
      if (imageUrl) {
        setFeaturedImage(imageUrl);
        setMessageType("success");
        setMessage("📸 Image uploaded successfully!");
      } else {
        throw new Error("Image URL not found in response");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      setMessageType("error");
      setMessage(`❌ Image upload failed: ${err.message}`);
    } finally {
      setIsUploadingImage(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handleSave = async (nextStatus) => {
    try {
      setIsSubmitting(true);
      setMessage("");
      
      const payload = {
        title,
        slug,
        category_id: categoryId,
        author_id: authorId,
        keywords: tags.join(", "),
        content,
        short_description: shortDescription,
        thumbnail_url: featuredImage,
        banner_url: bannerImage,
        reading_time: readingTime,
        image_alt_text: imageAlt,
        image_caption: imageCaption,
        visibility: "public",
        status: nextStatus.toLowerCase(),
        is_popular: isPopular,
        show_on_homepage: showOnHomepage,
        is_sticky: isSticky,
        seo_title: seoTitle || title,
        seo_description: seoDescription || shortDescription,
        focus_keyword: focusKeyword,
        meta_robots: metaRobots,
        allow_comments: allowComments,
      };

      const response = await fetch('http://localhost:5000/api/v1/blogs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Failed to create blog: ${response.status}`);
      }
      
      setStatus(nextStatus);
      setMessageType("success");
      setMessage(
        nextStatus === "Published"
          ? "🎉 Blog post published successfully!"
          : "✅ Draft saved successfully!"
      );
      
      setTimeout(() => {
        if (nextStatus === "Published") {
          window.location.href = "/admin/blogs";
        }
      }, 1500);
      
    } catch (err) {
      console.error('Error creating blog:', err);
      setMessageType("error");
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">
              {mode === "edit" ? "Edit blog post" : "Create new blog post"}
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              {mode === "edit" ? "Update content details" : "Compose your story"}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleSave("Draft")}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save as Draft"}
            </button>
            <button
              type="button"
              onClick={() => handleSave("Published")}
              disabled={isSubmitting}
              className="rounded-lg bg-slate-900 px-8 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
        {message && (
          <div className={`mt-4 rounded-xl border px-4 py-3 text-sm font-medium ${
            messageType === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}>
            {message}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <div className="rounded-lg bg-indigo-100 p-2">
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Blog Content</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="text-sm font-bold text-slate-700">
                  Blog Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all placeholder:text-slate-400"
                  placeholder="Enter blog title"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-bold text-slate-700">Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(event) => {
                      setSlug(event.target.value);
                      setIsSlugTouched(true);
                    }}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none transition-all"
                    placeholder="blog-slug"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700">Reading Time</label>
                  <input
                    type="text"
                    value={readingTime}
                    onChange={(event) => setReadingTime(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none transition-all"
                    placeholder="e.g., 5 min"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">Short Description</label>
                <textarea
                  rows={3}
                  value={shortDescription}
                  onChange={(event) => setShortDescription(event.target.value)}
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all placeholder:text-slate-400"
                  placeholder="Write a concise summary for SEO and social sharing..."
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-2 block">
                  Blog Content <span className="text-rose-500">*</span>
                </label>
                <div className="rich-text-editor overflow-hidden rounded-xl border border-slate-200 shadow-sm transition-all focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    placeholder="Start writing your blog content here... (Supports images, links, and formatting)"
                    className="min-h-[400px]"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-rose-100 p-2">
                  <ImageUp className="h-5 w-5 text-rose-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Featured Image</h3>
              </div>
              <ChevronDown className="h-5 w-5 text-slate-400" />
            </div>
            
            <div className="p-6 space-y-6">
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => !isUploadingImage && fileInputRef.current?.click()}
                className={`group relative flex min-h-[350px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300 ${
                  isDragging
                    ? "border-indigo-500 bg-indigo-50/50"
                    : isUploadingImage 
                      ? "border-slate-200 bg-slate-50 cursor-wait"
                      : "border-slate-200 bg-slate-50/50 hover:border-indigo-400 hover:bg-indigo-50/20"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files?.[0])}
                  disabled={isUploadingImage}
                />
                
                {isUploadingImage ? (
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent mb-4"></div>
                    <p className="text-lg font-bold text-slate-900">Uploading Image...</p>
                    <p className="text-sm text-slate-500">Please wait a moment</p>
                  </div>
                ) : featuredImage ? (
                  <div className="relative h-full w-full p-4">
                    <img
                      src={featuredImage}
                      alt="Preview"
                      className="max-h-[400px] w-full rounded-xl object-contain shadow-md"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-2xl">
                      <p className="bg-white px-4 py-2 rounded-lg font-bold text-sm shadow-xl">Change Image</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFeaturedImage("");
                      }}
                      className="absolute right-8 top-8 rounded-full bg-rose-500 p-2.5 text-white shadow-xl hover:bg-rose-600 transition-transform active:scale-90"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center p-8">
                    <div className="mb-6 rounded-3xl bg-indigo-100/50 p-6 group-hover:scale-110 transition-transform duration-300">
                      <Upload className="h-10 w-10 text-indigo-600" />
                    </div>
                    <p className="text-xl font-bold text-slate-900">
                      <span className="text-indigo-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-500">
                      PNG, JPG, WebP up to 10MB
                    </p>
                  </div>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-bold text-slate-700">Image Alt Text</label>
                  <input
                    type="text"
                    value={imageAlt}
                    onChange={(event) => setImageAlt(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                    placeholder="Describe the image for accessibility"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700">Image Caption</label>
                  <input
                    type="text"
                    value={imageCaption}
                    onChange={(event) => setImageCaption(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                    placeholder="Optional caption for the image"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm sticky top-24">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <div className="rounded-lg bg-amber-100 p-2">
                <Settings className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Post Settings</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="text-sm font-bold text-slate-700">Author</label>
                <div className="relative mt-2">
                  <select
                    value={authorId}
                    onChange={(event) => setAuthorId(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none transition-all"
                    disabled={isLoadingUsers}
                  >
                    {isLoadingUsers ? (
                      <option>Loading users...</option>
                    ) : (
                      users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.first_name} {user.last_name}
                        </option>
                      ))
                    )}
                  </select>
                  <User className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">Category</label>
                <div className="relative mt-2">
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none transition-all"
                  >
                    {blogCategories.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">Tags</label>
                <div className="mt-2 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2 focus-within:bg-white focus-within:border-indigo-500 transition-all">
                  <Tag className="mt-2 h-4 w-4 text-slate-400" />
                  <input
                    value={tagInput}
                    onChange={(event) => setTagInput(event.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="min-w-[120px] flex-1 bg-transparent py-2 text-sm text-slate-900 focus:outline-none"
                    placeholder="Type and press enter"
                  />
                  <button
                    type="button"
                    onClick={() => addTag(tagInput)}
                    className="rounded-lg bg-slate-200/50 px-3 py-1 text-xs font-bold text-slate-600 hover:bg-indigo-500 hover:text-white transition-colors"
                  >
                    Add
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => setTags((prev) => prev.filter((tag) => tag !== item))}
                          className="rounded-full hover:bg-indigo-200/50 p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">Status</label>
                <div className="relative mt-2">
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none transition-all"
                  >
                    {blogStatuses.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-4 pt-2">
                {[
                  { id: "homepage", label: "Show on Homepage", state: showOnHomepage, setter: setShowOnHomepage },
                  { id: "popular", label: "Mark as Popular", state: isPopular, setter: setIsPopular },
                  { id: "sticky", label: "Sticky Post", state: isSticky, setter: setIsSticky },
                  { id: "comments", label: "Allow Comments", state: allowComments, setter: setAllowComments },
                ].map((item) => (
                  <label key={item.id} className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{item.label}</span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.state}
                        onChange={(e) => item.setter(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <div className="rounded-lg bg-emerald-100 p-2">
                <Globe className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">SEO Settings</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="text-sm font-bold text-slate-700">SEO Title</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(event) => setSeoTitle(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                  placeholder="Focus keyword should appear here"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700">SEO Description</label>
                <textarea
                  rows={4}
                  value={seoDescription}
                  onChange={(event) => setSeoDescription(event.target.value)}
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                  placeholder="Write a meta description for search engines..."
                />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700">Focus Keyword</label>
                <input
                  type="text"
                  value={focusKeyword}
                  onChange={(event) => setFocusKeyword(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                  placeholder="e.g., Clinical Research Canada"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
      
      {/* Custom Styles for Quill */}
      <style jsx global>{`
        .rich-text-editor .ql-toolbar {
          border: none !important;
          background: #f8fafc !important;
          border-bottom: 1px solid #e2e8f0 !important;
          padding: 12px 16px !important;
        }
        .rich-text-editor .ql-container {
          border: none !important;
          font-family: inherit !important;
          font-size: 14px !important;
        }
        .rich-text-editor .ql-editor {
          min-height: 400px !important;
          padding: 20px 24px !important;
          line-height: 1.6 !important;
          color: #334155 !important;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: #94a3b8 !important;
          font-style: normal !important;
          left: 24px !important;
        }
        .rich-text-editor .ql-picker-label {
          font-weight: 600 !important;
          color: #475569 !important;
        }
        .rich-text-editor .ql-stroke {
          stroke: #64748b !important;
          stroke-width: 2px !important;
        }
        .rich-text-editor .ql-fill {
          fill: #64748b !important;
        }
        .rich-text-editor .ql-active .ql-stroke {
          stroke: #4f46e5 !important;
        }
        .rich-text-editor .ql-active .ql-fill {
          fill: #4f46e5 !important;
        }
      `}</style>
    </div>
  );
}
