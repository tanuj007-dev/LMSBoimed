"use client";

import { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  // Theme is strictly light as per user request
  const isDark = false;

  const value = useMemo(
    () => ({
      isDark,
      toggleTheme: () => {},
      setTheme: () => {},
    }),
    []
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
