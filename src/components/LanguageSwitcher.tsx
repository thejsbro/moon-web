"use client";

import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface LanguageSwitcherProps {
  currentLang?: string;
}

export default function LanguageSwitcher({ currentLang = 'en' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'es' : 'en';
    
    // Update i18n language
    i18n.changeLanguage(newLang);
    
    // Navigate to the same page in the new language
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-md text-sm font-medium transition-colors"
      style={{
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-primary)",
        border: `1px solid var(--border-color)`
      }}
      whileHover={{ 
        backgroundColor: "var(--accent-primary)",
        color: "white"
      }}
      whileTap={{ scale: 0.95 }}
    >
      {currentLang === 'en' ? 'ES' : 'EN'}
    </motion.button>
  );
}