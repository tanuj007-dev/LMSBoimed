"use client";

import { useState } from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AdminShellInner({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200">
        <div className="relative flex">
          <Sidebar
            collapsed={isCollapsed}
            mobileOpen={isMobileOpen}
            onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
            onCloseMobile={() => setIsMobileOpen(false)}
          />
          <div className="flex min-h-screen flex-1 flex-col">
            <Topbar
              collapsed={isCollapsed}
              onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
              onOpenMobile={() => setIsMobileOpen(true)}
            />
            <main className="flex-1 px-4 pb-10 pt-6 sm:px-6 lg:px-10">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminShell({ children }) {
  return (
    <ThemeProvider>
      <AdminShellInner>{children}</AdminShellInner>
    </ThemeProvider>
  );
}
