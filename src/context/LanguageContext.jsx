import React, { createContext, useState, useContext, useEffect } from "react";

// Create the language context
const LanguageContext = createContext();

// Available languages
export const languages = {
  ENGLISH: "en",
  HINDI: "hi",
};

// Language provider component
export const LanguageProvider = ({ children }) => {
  // Get saved language from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || languages.ENGLISH;
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  // Function to change language
  const changeLanguage = (lang) => {
    if (Object.values(languages).includes(lang)) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
