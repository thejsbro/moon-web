"use client";

import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import ThemeSelector from "./ThemeSelector";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  lang?: string;
}

export default function Header({ lang = 'en' }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  const handleTitleClick = () => {
    const currentPath = `/${lang}`;
    if (pathname !== currentPath) {
      router.push(currentPath);
    }
  };

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
        className="text-xl font-bold cursor-pointer hover:opacity-75 transition-opacity"
        style={{ color: "var(--text-primary)" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        onClick={handleTitleClick}
      >
        {t('moon_calendar')}
      </motion.h1>
      
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <LanguageSwitcher currentLang={lang} />
        <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />
      </motion.div>
    </motion.header>
  );
}