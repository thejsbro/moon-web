"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface NatalChartProps {
  onClose: () => void;
}

interface AstrologyChart {
  radix: (data: unknown) => AstrologyChart;
  draw: () => void;
}

interface AstrologyLib {
  Chart: new (id: string, width: number, height: number) => AstrologyChart;
}

declare global {
  interface Window {
    astrology: AstrologyLib;
  }
}

export default function NatalChart({ onClose }: NatalChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const loadAstroChart = async () => {
      try {
        // Import the astrology library
        const astrology = await import('@astrodraw/astrochart');
        
        if (chartRef.current) {
          // Generate random FormedAspect
          const generateRandomAspects = () => {
            const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
            const aspectTypes = [0, 60, 90, 120, 180]; // Conjunction, Sextile, Square, Trine, Opposition
            const aspects = [];
            
            // Generate 8-12 random aspects
            const aspectCount = Math.floor(Math.random() * 5) + 8;
            
            for (let i = 0; i < aspectCount; i++) {
              const planet1 = planets[Math.floor(Math.random() * planets.length)];
              let planet2 = planets[Math.floor(Math.random() * planets.length)];
              
              // Ensure we don't have aspects between the same planet
              while (planet2 === planet1) {
                planet2 = planets[Math.floor(Math.random() * planets.length)];
              }
              
              const aspect = aspectTypes[Math.floor(Math.random() * aspectTypes.length)];
              const orb = Math.random() * 8; // Random orb up to 8 degrees
              
              aspects.push({
                p1: planet1,
                p2: planet2,
                aspect: aspect,
                orb: orb
              });
            }
            
            return aspects;
          };

          // Generate random natal chart data
          const data = {
            planets: {
              Sun: [120, 0],     // Longitude, Latitude
              Moon: [45, 0],
              Mercury: [110, 0],
              Venus: [130, 0],
              Mars: [200, 0],
              Jupiter: [300, 0],
              Saturn: [240, 0],
              Uranus: [15, 0],
              Neptune: [330, 0],
              Pluto: [260, 0],
              NNode: [90, 0],
              Chiron: [180, 0]
            },
            cusps:[296, 350, 30, 56, 75, 94, 116, 170, 210, 236, 255, 274],
            houses: [
              0,    // 1st house cusp
              30,   // 2nd house cusp
              60,   // 3rd house cusp
              90,   // 4th house cusp (IC)
              120,  // 5th house cusp
              150,  // 6th house cusp
              180,  // 7th house cusp (DC)
              210,  // 8th house cusp
              240,  // 9th house cusp
              270,  // 10th house cusp (MC)
              300,  // 11th house cusp
              330   // 12th house cusp
            ],
            aspects: generateRandomAspects()
          };

          // Create the chart
          const chart = new astrology.Chart('chart', 600, 600);
          const radix = chart.radix(data);
          radix.aspects(); // Major aspects
        }
      } catch (error) {
        console.error('Error loading astro chart:', error);
        // Fallback display
        if (chartRef.current) {
          chartRef.current.innerHTML = '<div class="flex items-center justify-center h-full text-lg">Natal Chart Placeholder<br/>Random data generated</div>';
        }
      }
    };

    loadAstroChart();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-4xl rounded-xl shadow-2xl p-6 relative"
        style={{
          backgroundColor: "var(--bg-primary)",
          maxHeight: "90vh",
          overflow: "auto"
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{
            backgroundColor: "var(--bg-secondary)",
            color: "var(--text-primary)"
          }}
        >
          ×
        </button>

        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {t('natal_chart_title')}
          </h2>
          <p 
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            {t('natal_chart_subtitle')}
          </p>
        </motion.div>

        {/* Chart container */}
        <motion.div
          ref={chartRef}
          id="chart"
          className="flex items-center justify-center mx-auto"
          style={{
            minHeight: "500px",
            color: "var(--text-primary)"
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Loading placeholder */}
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: "var(--accent-primary)" }}></div>
            <p style={{ color: "var(--text-secondary)" }}>{t('loading_chart')}</p>
          </div>
        </motion.div>

        {/* Info section */}
        <motion.div
          className="mt-6 p-4 rounded-lg"
          style={{ backgroundColor: "var(--bg-secondary)" }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {t('chart_information')}
          </h3>
          <p 
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            {t('chart_info_description')}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}