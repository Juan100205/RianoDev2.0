import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
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
      <button
        onClick={() => setIsDark(!isDark)}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="fixed left-4 bottom-4 z-50 opacity-20 hover:opacity-100 transition-opacity duration-300 cursor-pointer border-none bg-transparent p-2"
      >
        {isDark ? (
          <SunIcon className="w-6 h-6 text-white" />
        ) : (
          <MoonIcon className="w-6 h-6 text-gray-500" />
        )}
      </button>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  scrollRef={scrollContainerRef}
                  languageState={isEnglish}
                  setLanguageState={setIsEnglish}
                />
                <LandingPage
                  languageState={isEnglish}
                  scrollContainerRef={scrollContainerRef}
                />
              </>
            }
          />
          <Route
            path="/privacy"
            element={
              <PrivacyPolicy
                languageState={isEnglish}
                setLanguageState={setIsEnglish}
                scrollRef={scrollContainerRef}
              />
            }
          />
          <Route
            path="/terms"
            element={
              <TermsOfService
                languageState={isEnglish}
                setLanguageState={setIsEnglish}
                scrollRef={scrollContainerRef}
              />
            }
          />
          <Route
            path="/servicios"
            element={
              <Servicios
                languageState={isEnglish}
                setLanguageState={setIsEnglish}
                scrollRef={scrollContainerRef}
              />
            }
          />
          <Route
            path="/portal"
            element={
              <Portal
                languageState={isEnglish}
                setLanguageState={setIsEnglish}
                scrollRef={scrollContainerRef}
              />
            }
          />
          <Route
            path="/clientes"
            element={
              <Clientes
                languageState={isEnglish}
                setLanguageState={setIsEnglish}
                scrollRef={scrollContainerRef}
              />
            }
          />
          <Route
            path="/sobre"
            element={
              <Sobre
                languageState={isEnglish}
                setLanguageState={setIsEnglish}
                scrollRef={scrollContainerRef}
              />
            }
          />
          <Route
            path="/faq"
            element={
              <FAQ
                languageState={isEnglish}
                setLanguageState={setIsEnglish}
                scrollRef={scrollContainerRef}
              />
            }
          />
          <Route
            path="/schedule"
            element={
              <Schedule
                languageState={isEnglish}
                setLanguageState={setIsEnglish}
                scrollRef={scrollContainerRef}
              />
            }
          />
          <Route
            path="/quote"
            element={
              <Quote
                languageState={isEnglish}
                setLanguageState={setIsEnglish}
                scrollRef={scrollContainerRef}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


