"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import NatalChart from "@/components/NatalChart";
import { useAppData } from "@/context/AppContext";

interface NatalChartPageProps {
  params: Promise<{ lang: string }>;
}

export default function NatalChartPage({ params }: NatalChartPageProps) {
  const [showChart, setShowChart] = useState(false);
  const [lang, setLang] = useState('en');
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { formData } = useAppData();

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

  useEffect(() => {
    // Redirect if no form data
    if (!formData) {
      router.push(`/${lang}/birth-form`);
      return;
    }
    
    // Show chart after a brief delay
    const timer = setTimeout(() => {
      setShowChart(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData, router, lang]);

  const handleCloseChart = () => {
    setShowChart(false);
    router.push(`/${lang}`);
  };

  if (!formData) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen">
      <Header lang={lang} />
      
      <div className="py-12 px-4">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
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
            {t('natal_chart_title')}
          </motion.h1>
          
          <motion.p 
            className="text-lg mb-8"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {t('natal_chart_subtitle')}
          </motion.p>

          {!showChart && (
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: "var(--accent-primary)" }}></div>
              <p className="ml-4" style={{ color: "var(--text-secondary)" }}>{t('loading_chart')}</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {showChart && (
        <NatalChart onClose={handleCloseChart} />
      )}
    </div>
  );
}