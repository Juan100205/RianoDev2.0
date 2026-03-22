import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import LandingPage from "./pages/LandingPage";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsOfService from "./Components/TermsOfService";
import Header from "./Components/Header";
import Servicios from "./pages/Servicios";
import Portal from "./pages/Portal";
import Clientes from "./pages/Clientes";
import Sobre from "./pages/Sobre";
import FAQ from "./pages/FAQ";
import Schedule from "./pages/Schedule";
import Quote from "./pages/Quote";

const fadeStyle = { willChange: "opacity" } as const;

const Fade = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.22, ease: "easeInOut" }}
    style={fadeStyle}
  >
    {children}
  </motion.div>
);

interface RoutesProps {
  isEnglish: boolean;
  setIsEnglish: (v: boolean) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

function AppRoutes({ isEnglish, setIsEnglish, scrollContainerRef }: RoutesProps) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Fade>
              <>
                <Header scrollRef={scrollContainerRef} languageState={isEnglish} setLanguageState={setIsEnglish} />
                <LandingPage languageState={isEnglish} scrollContainerRef={scrollContainerRef} />
              </>
            </Fade>
          }
        />
        <Route path="/privacy" element={<Fade><PrivacyPolicy languageState={isEnglish} setLanguageState={setIsEnglish} scrollRef={scrollContainerRef} /></Fade>} />
        <Route path="/terms" element={<Fade><TermsOfService languageState={isEnglish} setLanguageState={setIsEnglish} scrollRef={scrollContainerRef} /></Fade>} />
        <Route path="/servicios" element={<Fade><Servicios languageState={isEnglish} setLanguageState={setIsEnglish} scrollRef={scrollContainerRef} /></Fade>} />
        <Route path="/portal" element={<Fade><Portal languageState={isEnglish} setLanguageState={setIsEnglish} scrollRef={scrollContainerRef} /></Fade>} />
        <Route path="/clientes" element={<Fade><Clientes languageState={isEnglish} setLanguageState={setIsEnglish} scrollRef={scrollContainerRef} /></Fade>} />
        <Route path="/sobre" element={<Fade><Sobre languageState={isEnglish} setLanguageState={setIsEnglish} scrollRef={scrollContainerRef} /></Fade>} />
        <Route path="/faq" element={<Fade><FAQ languageState={isEnglish} setLanguageState={setIsEnglish} scrollRef={scrollContainerRef} /></Fade>} />
        <Route path="/schedule" element={<Fade><Schedule languageState={isEnglish} setLanguageState={setIsEnglish} scrollRef={scrollContainerRef} /></Fade>} />
        <Route path="/quote" element={<Fade><Quote languageState={isEnglish} setLanguageState={setIsEnglish} scrollRef={scrollContainerRef} /></Fade>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isEnglish, setIsEnglish] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="bg-white dark:bg-black min-h-screen overflow-x-hidden">
      <motion.button
        onClick={() => setIsDark(!isDark)}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="fixed left-4 bottom-4 z-50 opacity-20 hover:opacity-100 transition-opacity duration-300 cursor-pointer border-none bg-transparent p-2"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <SunIcon className="w-6 h-6 text-white" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-500" />
          )}
        </motion.div>
      </motion.button>
      <BrowserRouter>
        <AppRoutes isEnglish={isEnglish} setIsEnglish={setIsEnglish} scrollContainerRef={scrollContainerRef} />
      </BrowserRouter>
    </div>
  );
}

export default App;
