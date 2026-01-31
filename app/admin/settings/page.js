"use client";

import { useState } from "react";
import { ImageUp, Moon, Sun } from "lucide-react";
import { useTheme } from "../components/ThemeContext";

export default function SettingsPage() {
  const { isDark, toggleTheme } = useTheme();
  const [siteName, setSiteName] = useState("LMS Blog");
  const [logoFile, setLogoFile] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Preferences
        </p>
        <h2 className="text-2xl font-semibold text-slate-900 ">
          Settings
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm  ">
          <h3 className="text-lg font-semibold text-slate-900 ">
            Site Details
          </h3>
          <div className="mt-5 space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600 ">
                Site Name
              </label>
              <input
                value={siteName}
                onChange={(event) => setSiteName(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none   "
                placeholder="Site name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 ">
                Logo Upload
              </label>
              <label className="mt-2 flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500 transition hover:border-slate-400   ">
                <ImageUp className="h-4 w-4" />
                <span>{logoFile ? logoFile : "Upload logo asset"}</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(event) =>
                    setLogoFile(event.target.files?.[0]?.name || "")
                  }
                />
              </label>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm  ">
          <h3 className="text-lg font-semibold text-slate-900 ">
            Theme
          </h3>
          <div className="mt-5 space-y-3 text-sm text-slate-600 ">
            <p>Switch between light and dark mode for the admin panel.</p>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm transition hover:bg-slate-50   "
            >
              <span className="flex items-center gap-2">
                {isDark ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
                {isDark ? "Dark Mode" : "Light Mode"}
              </span>
              <span className="text-xs text-slate-400">
                Click to toggle
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
