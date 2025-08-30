"use client";

import { motion } from "framer-motion";

type Theme = "normal" | "dark-red" | "dark-yellow" | "earth";

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const themes = [
  { id: "normal" as Theme, name: "Space", preview: "bg-gradient-to-r from-blue-900 to-purple-800" },
  { id: "dark-red" as Theme, name: "Dark Red", preview: "bg-gradient-to-r from-red-900 to-red-800" },
  { id: "dark-yellow" as Theme, name: "Dark Yellow", preview: "bg-gradient-to-r from-yellow-800 to-yellow-700" },
  { id: "earth" as Theme, name: "Earth", preview: "bg-gradient-to-r from-blue-800 to-green-800" },
];

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      {themes.map((theme) => (
        <motion.button
          key={theme.id}
          onClick={() => onThemeChange(theme.id)}
          className={`
            relative p-2 rounded-lg border-2 transition-all duration-200
            ${currentTheme === theme.id 
              ? 'shadow-lg scale-105' 
              : 'hover:scale-102'
            }
          `}
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: currentTheme === theme.id ? "var(--accent-primary)" : "var(--border-color)",
            boxShadow: currentTheme === theme.id ? `0 4px 12px var(--shadow)` : "none",
            color: "var(--text-primary)"
          }}
          whileHover={{ scale: currentTheme === theme.id ? 1.05 : 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className={`w-6 h-6 rounded ${theme.preview}`} />
          {currentTheme === theme.id && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
              style={{ backgroundColor: "var(--accent-primary)" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}