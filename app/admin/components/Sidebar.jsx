"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FilePlus2,
  FolderKanban,
  Users,
  MessageSquare,
  Settings,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Add Blog", href: "/admin/blogs/add", icon: FilePlus2 },
  { label: "Categories", href: "/admin/categories", icon: FolderKanban },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Comments", href: "/admin/comments", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function SidebarContent({ collapsed, onNavigate }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-5 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow">
            LMS
          </div>
          {!collapsed && (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Workspace
              </p>
              <p className="text-base font-semibold text-slate-900 dark:text-white">
                Blog Admin
              </p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200/70 px-4 py-4 text-xs text-slate-400 dark:border-slate-800/80">
        {!collapsed && (
          <div>
            <p>Version 1.0.0</p>
            <p className="mt-1">All data is local only.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Sidebar({
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onCloseMobile,
}) {
  return (
    <>
      <aside
        className={`hidden min-h-screen border-r border-slate-200/60 bg-white/90 shadow-sm backdrop-blur transition-all duration-200 dark:border-slate-800/80 dark:bg-slate-950/70 lg:flex ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        <SidebarContent collapsed={collapsed} onNavigate={() => {}} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-slate-900/40"
              onClick={onCloseMobile}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className="relative z-10 h-full w-72 border-r border-slate-200/60 bg-white shadow-xl dark:border-slate-800/80 dark:bg-slate-950"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
            >
              <div className="flex items-center justify-between px-4 py-4">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  Navigation
                </span>
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-300"
                  onClick={onCloseMobile}
                >
                  Close
                </button>
              </div>
              <SidebarContent
                collapsed={false}
                onNavigate={onCloseMobile}
              />
              <div className="px-4 pb-4">
                <button
                  type="button"
                  onClick={onToggleCollapse}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
                >
                  Toggle compact mode
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
