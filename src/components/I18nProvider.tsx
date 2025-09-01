"use client";

import { useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "moon_calendar": "Moon Calendar",
      "home": "Home",
      "birth_chart": "Birth Chart",
      
      // Home page
      "welcome_title": "Welcome to Moon Calendar",
      "welcome_subtitle": "Discover your natal chart and planetary positions",
      "get_started": "Find Birth Planetary Positions",
      "learn_more": "Learn More",
      
      // Birth form
      "birth_form_title": "Birth Information",
      "birth_form_subtitle": "Enter your details to generate your personalized natal chart",
      "first_name": "Full Name",
      "first_name_placeholder": "Enter your full name",
      "last_name": "Last Name", 
      "last_name_placeholder": "Enter your last name",
      "birth_date": "Birth Date",
      "birth_time": "Birth Time",
      "birth_location": "Birth Location",
      "birth_location_placeholder": "Enter your place of birth",
      "generate_chart": "Generate Natal Chart",
      "required_field": "This field is required",
      "invalid_email": "Invalid email address",
      
      // Natal Chart
      "natal_chart_title": "Your Natal Chart",
      "natal_chart_subtitle": "Generated with random data for demonstration",
      "chart_information": "Chart Information",
      "chart_info_description": "This is a sample natal chart generated with random planetary positions. In a real application, this would use your actual birth data to calculate precise planetary positions and house cusps.",
      "loading_chart": "Loading your natal chart...",
      
      // Common
      "close": "Close",
      "back": "Back",
      "next": "Next",
      "submit": "Submit",
      "cancel": "Cancel",
      "save": "Save",
      "edit": "Edit",
      "delete": "Delete",
    }
  },
  es: {
    translation: {
      // Navigation
      "moon_calendar": "Calendario Lunar",
      "home": "Inicio",
      "birth_chart": "Carta Natal",
      
      // Home page
      "welcome_title": "Bienvenido al Calendario Lunar",
      "welcome_subtitle": "Descubre tu carta natal y posiciones planetarias",
      "get_started": "Encontrar Posiciones Planetarias de Nacimiento",
      "learn_more": "Aprender Más",
      
      // Birth form
      "birth_form_title": "Información de Nacimiento",
      "birth_form_subtitle": "Ingresa tus datos para generar tu carta natal personalizada",
      "first_name": "Nombre Completo",
      "first_name_placeholder": "Ingresa tu nombre completo",
      "last_name": "Apellido",
      "last_name_placeholder": "Ingresa tu apellido", 
      "birth_date": "Fecha de Nacimiento",
      "birth_time": "Hora de Nacimiento",
      "birth_location": "Lugar de Nacimiento",
      "birth_location_placeholder": "Ingresa tu lugar de nacimiento",
      "generate_chart": "Generar Carta Natal",
      "required_field": "Este campo es obligatorio",
      "invalid_email": "Dirección de correo inválida",
      
      // Natal Chart
      "natal_chart_title": "Tu Carta Natal",
      "natal_chart_subtitle": "Generada con datos aleatorios para demostración",
      "chart_information": "Información de la Carta",
      "chart_info_description": "Esta es una carta natal de muestra generada con posiciones planetarias aleatorias. En una aplicación real, esto usaría tus datos de nacimiento reales para calcular posiciones planetarias y cúspides de casas precisas.",
      "loading_chart": "Cargando tu carta natal...",
      
      // Common
      "close": "Cerrar",
      "back": "Atrás",
      "next": "Siguiente", 
      "submit": "Enviar",
      "cancel": "Cancelar",
      "save": "Guardar",
      "edit": "Editar",
      "delete": "Eliminar",
    }
  }
};

// Initialize i18n only if not already initialized
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
}

interface I18nProviderProps {
  children: React.ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  useEffect(() => {
    // Additional client-side initialization if needed
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}