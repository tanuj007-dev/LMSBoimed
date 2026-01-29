"use client";

import { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const value = useMemo(
    () => ({
      isDark,
      toggleTheme: () => setIsDark((prev) => !prev),
      setTheme: (next) => setIsDark(Boolean(next)),
    }),
    [isDark]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
