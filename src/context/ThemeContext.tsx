"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "normal" | "dark-red" | "dark-yellow" | "earth";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("normal");

  useEffect(() => {
    const savedTheme = localStorage.getItem("moon-calendar-theme") as Theme;
    if (savedTheme && ["normal", "dark-red", "dark-yellow", "earth"].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("moon-calendar-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}