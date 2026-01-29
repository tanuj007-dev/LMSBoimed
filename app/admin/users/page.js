"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Edit3, Trash2 } from "lucide-react";
import { usersSeed } from "../data";

const roles = ["Admin", "Editor"];
const statuses = ["Active", "Pending", "Suspended"];

export default function UsersPage() {
  const [users, setUsers] = useState(usersSeed);
  const [editingUser, setEditingUser] = useState(null);

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleSave = () => {
    setUsers((prev) =>
      prev.map((user) => (user.id === editingUser.id ? editingUser : user))
    );
    setEditingUser(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          People
        </p>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Users
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400 dark:bg-slate-950">
            <tr>
              <th className="px-6 py-3">Avatar</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-slate-100 text-slate-700 dark:border-slate-800 dark:text-slate-200"
              >
                <td className="px-6 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                    {user.name.charAt(0)}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  {user.name}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.status === "Active"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                        : user.status === "Pending"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingUser(user)}
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(user.id)}
                      className="rounded-lg border border-slate-200 p-2 text-rose-500 transition hover:bg-rose-50 dark:border-slate-800 dark:text-rose-300 dark:hover:bg-rose-950/40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {editingUser && (
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
                  Edit User
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="text-sm text-slate-500"
                >
                  Close
                </button>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <p>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {editingUser.name}
                  </span>{" "}
                  — {editingUser.email}
                </p>
                <select
                  value={editingUser.role}
                  onChange={(event) =>
                    setEditingUser({
                      ...editingUser,
                      role: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-950"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <select
                  value={editingUser.status}
                  onChange={(event) =>
                    setEditingUser({
                      ...editingUser,
                      status: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-950"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-slate-900"
                >
                  Save User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
