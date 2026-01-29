"use client";

import { useState } from "react";
import { CheckCircle, Trash2 } from "lucide-react";
import { commentsSeed } from "../data";

export default function CommentsPage() {
  const [comments, setComments] = useState(commentsSeed);

  const handleApprove = (id) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, status: "Approved" } : comment
      )
    );
  };

  const handleDelete = (id) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Community
        </p>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Comments
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400 dark:bg-slate-950">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Comment</th>
              <th className="px-6 py-3">Blog</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr
                key={comment.id}
                className="border-t border-slate-100 text-slate-700 dark:border-slate-800 dark:text-slate-200"
              >
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  {comment.user}
                </td>
                <td className="px-6 py-4">{comment.comment}</td>
                <td className="px-6 py-4">{comment.blog}</td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      comment.status === "Approved"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200"
                    }`}
                  >
                    {comment.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleApprove(comment.id)}
                      className="rounded-lg border border-slate-200 p-2 text-emerald-600 transition hover:bg-emerald-50 dark:border-slate-800 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(comment.id)}
                      className="rounded-lg border border-slate-200 p-2 text-rose-500 transition hover:bg-rose-50 dark:border-slate-800 dark:text-rose-300 dark:hover:bg-rose-950/40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {comments.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-slate-400"
                >
                  No comments in the queue.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
