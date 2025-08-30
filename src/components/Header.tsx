"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import ThemeSelector from "./ThemeSelector";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.header 
      className="w-full px-6 py-4 flex justify-between items-center"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderBottom: `1px solid var(--border-color)`,
        boxShadow: `0 2px 4px var(--shadow)`
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-xl font-bold"
        style={{ color: "var(--text-primary)" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Moon Calendar
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />
      </motion.div>
    </motion.header>
  );
}