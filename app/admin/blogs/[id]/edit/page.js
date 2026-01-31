"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import BlogForm from "../../../components/BlogForm";
import { blogsSeed } from "../../../data";

export default function EditBlogPage() {
  const params = useParams();
  const blog = useMemo(
    () => blogsSeed.find((item) => item.id === params?.id),
    [params]
  );

  return (
    <div className="space-y-6">
      {blog ? (
        <BlogForm mode="edit" initialData={blog} />
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm   ">
          Blog not found in local data.
        </div>
      )}
    </div>
  );
}
