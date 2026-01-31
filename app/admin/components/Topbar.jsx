"use client";

import {
  Bell,
  Menu,
  Search,
  UserCircle,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import Image from "next/image";
import logo from "../../components/assets/logo.png";

export default function Topbar({ collapsed, onToggleCollapse, onOpenMobile }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/80 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobile}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 lg:inline-flex"
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </button>
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-24 lg:hidden">
              <Image
                src={logo}
                alt="BioMed Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Admin Panel
              </p>
              <h1 className="text-lg font-semibold text-slate-900 leading-none">
                Blog Management
              </h1>
            </div>
          </div>
        </div>

      
      </div>
    </header>
  );
}
