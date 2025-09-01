"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import SolarSystem from "@/components/SolarSystem";

interface HomeProps {
  params: Promise<{ lang: string }>;
}

export default function Home({ params }: HomeProps) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const getParams = async () => {
      const { lang: paramLang } = await params;
      setLang(paramLang);
      
      // Set the language based on the route parameter
      if (i18n.language !== paramLang) {
        i18n.changeLanguage(paramLang);
      }
    };
    
    getParams();
  }, [params, i18n]);

  const handleNavigateToForm = () => {
    router.push(`/${lang}/birth-form`);
  };

  return (
    <div className="min-h-screen relative">
      <SolarSystem />
      <Header lang={lang} />
      
      <div className="py-12 px-4">
        <motion.div 
          className="max-w-md mx-auto rounded-xl shadow-lg p-8 text-center backdrop-blur-md"
          style={{
            backgroundColor: "rgba(22, 33, 62, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: `0 20px 25px -5px rgba(124, 58, 237, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-3xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {t('moon_calendar')}
          </motion.h1>
          
          <motion.p 
            className="text-lg mb-8"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {t('welcome_subtitle')}
          </motion.p>

          <motion.button
            onClick={handleNavigateToForm}
            className="py-3 px-8 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 text-lg font-semibold"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "white",
              '--tw-ring-color': "var(--accent-primary)",
            } as React.CSSProperties}
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "var(--accent-hover)"
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {t('get_started')}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}