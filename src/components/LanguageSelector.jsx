import React, { useState } from "react";
import { useLanguage, languages } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import translations from "../translations";

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];
  const [isHovered, setIsHovered] = useState(false);

  const isHindi = language === languages.HINDI;

  const handleToggle = () => {
    changeLanguage(isHindi ? languages.ENGLISH : languages.HINDI);
  };

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-3 p-2 rounded-xl bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
        <motion.div
          animate={{
            rotate: isHovered ? [0, 20, -20, 0] : 0,
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <GlobeAltIcon className="h-5 w-5 text-gray-600" />
        </motion.div>

        {/* Language Toggle Switch */}
        <div
          onClick={handleToggle}
          className="relative flex items-center cursor-pointer"
        >
          {/* Track */}
          <div className="w-20 h-10 bg-gradient-to-r from-blue-500 to-amber-500 rounded-full shadow-inner overflow-hidden">
            {/* Highlight overlay */}
            <div className="absolute inset-0 flex justify-between items-center px-2 text-white font-medium">
              <span
                className={`transition-opacity duration-300 ${
                  isHindi ? "opacity-50" : "opacity-100"
                }`}
              >
                EN
              </span>
              <span
                className={`transition-opacity duration-300 ${
                  isHindi ? "opacity-100" : "opacity-50"
                }`}
              >
                हिं
              </span>
            </div>

            {/* Thumb */}
            <motion.div
              className="absolute top-1 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-lg"
              animate={{
                x: isHindi ? 44 : 4,
                rotate: isHovered ? 360 : 0,
              }}
              transition={{
                x: { type: "spring", stiffness: 500, damping: 30 },
                rotate: { duration: 0.5, ease: "easeInOut" },
              }}
            >
              {isHindi ? "🇮🇳" : "🇬🇧"}
            </motion.div>
          </div>
        </div>

        {/* Current language name */}
        <AnimatePresence mode="wait">
          <motion.span
            key={language}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-medium text-gray-700 min-w-[60px]"
          >
            {isHindi ? t.hindi : t.english}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Subtle glow effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-amber-400/30 rounded-xl blur-md -z-10"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LanguageSelector;
