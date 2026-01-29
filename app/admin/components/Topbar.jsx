"use client";

import {
  Bell,
  Menu,
  Search,
  UserCircle,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export default function Topbar({ collapsed, onToggleCollapse, onOpenMobile }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/80 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobile}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 lg:inline-flex"
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Admin Panel
            </p>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
              Blog Management
            </h1>
          </div>
        </div>

        <div className="hidden flex-1 max-w-xl items-center rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm transition focus-within:border-slate-300 dark:border-slate-800 dark:bg-slate-900 lg:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search for posts, users, or categories"
            className="ml-2 w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none dark:text-slate-200"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:inline-flex"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <UserCircle className="h-5 w-5 text-slate-500 dark:text-slate-200" />
            <div className="hidden text-left text-sm leading-tight sm:block">
              <p className="font-medium text-slate-900 dark:text-white">
                Admin User
              </p>
              <p className="text-xs text-slate-400">admin@lms.dev</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
