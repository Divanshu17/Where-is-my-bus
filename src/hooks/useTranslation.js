import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";

/**
 * Custom hook to access translations based on the current language
 * @returns {Object} The translation object for the current language
 */
const useTranslation = () => {
  const { language } = useLanguage();
  return translations[language];
};

export default useTranslation; 