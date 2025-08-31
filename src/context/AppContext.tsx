"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface FormData {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

interface AppContextType {
  formData: FormData | null;
  setFormData: (data: FormData) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [formData, setFormDataState] = useState<FormData | null>(null);

  useEffect(() => {
    const savedData = sessionStorage.getItem("moon-calendar-form-data");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as FormData;
        setFormDataState(parsedData);
      } catch (error) {
        console.error("Failed to parse saved form data:", error);
      }
    }
  }, []);

  const setFormData = (data: FormData) => {
    setFormDataState(data);
    sessionStorage.setItem("moon-calendar-form-data", JSON.stringify(data));
  };

  return (
    <AppContext.Provider value={{ formData, setFormData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppData must be used within an AppProvider");
  }
  return context;
}