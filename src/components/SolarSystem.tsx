"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function SolarSystem() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* Stars */}
      {isClient && Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            backgroundColor: "var(--text-secondary)",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            opacity: Math.random() * 0.6 + 0.2,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            x: [0, Math.random() * 20 - 10, 0],
            y: [0, Math.random() * 15 - 7.5, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}