"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../components/assets/logo.png";
import {
  LayoutDashboard,
  FileText,
  FilePlus2,
  FolderKanban,
  Users,
  MessageSquare,
  LogOut,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Add Blog", href: "/admin/blogs/add", icon: FilePlus2 },
  { label: "Categories", href: "/admin/categories", icon: FolderKanban },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Add User", href: "/admin/users/add", icon: FilePlus2 },
 
  { label: "Logout", href: "/", icon: LogOut },
];

function SidebarContent({ collapsed, onNavigate }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div
        className={`flex items-center border-b border-slate-200/70 py-5 transition-all duration-200 ${
          collapsed ? "justify-center px-2" : "justify-between px-4"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`relative h-10 transition-all duration-200 ${
              collapsed ? "w-10" : "w-28"
            }`}
          >
            <Image
              src={logo}
              alt="BioMed Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
         
        </div>
      </div>

      <nav className={`flex-1 space-y-2 py-4 ${collapsed ? "px-2" : "px-3"}`}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              title={collapsed ? item.label : ""}
              className={`group flex items-center rounded-xl transition-all duration-200 ${
                collapsed ? "justify-center px-0 py-3" : "gap-3 px-3 py-2"
              } ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className={collapsed ? "h-5 w-5" : "h-4 w-4"} />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

    
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
        className={`hidden min-h-screen border-r border-slate-200/60 bg-white shadow-sm backdrop-blur transition-all duration-200 lg:flex ${
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
              className="relative z-10 h-full w-72 border-r border-slate-200/60 bg-white shadow-xl"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
            >
              <div className="flex items-center justify-between px-4 py-4">
                <span className="text-sm font-semibold text-slate-900">
                  Navigation
                </span>
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-500"
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
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
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
