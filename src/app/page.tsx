"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import NatalChart from "@/components/NatalChart";
import { useAppData } from "@/context/AppContext";

interface FormData {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

export default function Home() {
  const { setFormData } = useAppData();
  const [showNatalChart, setShowNatalChart] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    setFormData(data);
    console.log("Form Data saved:", data);
    setShowNatalChart(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="py-12 px-4">
        <motion.div 
          className="max-w-md mx-auto rounded-xl shadow-lg p-8"
          style={{
            backgroundColor: "var(--bg-secondary)",
            boxShadow: `0 20px 25px -5px var(--shadow), 0 10px 10px -5px var(--shadow)`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-8 text-center"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Birth Information
          </motion.h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label htmlFor="fullName" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
              Full Name
            </label>
            <input
              {...register("fullName", { required: "Full name is required" })}
              type="text"
              id="fullName"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 transition duration-200"
              style={{
                backgroundColor: "var(--bg-primary)",
                border: `1px solid var(--border-color)`,
                color: "var(--text-primary)",
                '--tw-ring-color': "var(--border-focus)",
              } as React.CSSProperties}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm" style={{ color: "var(--error-color)" }}>
                {errors.fullName.message}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
              Date of Birth
            </label>
            <input
              {...register("dateOfBirth", { required: "Date of birth is required" })}
              type="date"
              id="dateOfBirth"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 transition duration-200"
              style={{
                backgroundColor: "var(--bg-primary)",
                border: `1px solid var(--border-color)`,
                color: "var(--text-primary)",
                '--tw-ring-color': "var(--border-focus)",
              } as React.CSSProperties}
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm" style={{ color: "var(--error-color)" }}>
                {errors.dateOfBirth.message}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label htmlFor="timeOfBirth" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
              Time of Birth
            </label>
            <input
              {...register("timeOfBirth", { required: "Time of birth is required" })}
              type="time"
              id="timeOfBirth"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 transition duration-200"
              style={{
                backgroundColor: "var(--bg-primary)",
                border: `1px solid var(--border-color)`,
                color: "var(--text-primary)",
                '--tw-ring-color': "var(--border-focus)",
              } as React.CSSProperties}
            />
            {errors.timeOfBirth && (
              <p className="mt-1 text-sm" style={{ color: "var(--error-color)" }}>
                {errors.timeOfBirth.message}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <label htmlFor="placeOfBirth" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
              Place of Birth
            </label>
            <input
              {...register("placeOfBirth", { required: "Place of birth is required" })}
              type="text"
              id="placeOfBirth"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 transition duration-200"
              style={{
                backgroundColor: "var(--bg-primary)",
                border: `1px solid var(--border-color)`,
                color: "var(--text-primary)",
                '--tw-ring-color': "var(--border-focus)",
              } as React.CSSProperties}
              placeholder="Enter your place of birth"
            />
            {errors.placeOfBirth && (
              <p className="mt-1 text-sm" style={{ color: "var(--error-color)" }}>
                {errors.placeOfBirth.message}
              </p>
            )}
          </motion.div>

          <motion.button
            type="submit"
            className="w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200"
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
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>

    {/* Natal Chart Modal */}
    {showNatalChart && (
      <NatalChart onClose={() => setShowNatalChart(false)} />
    )}
    </div>
  );
}