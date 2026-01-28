import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useRef, useState } from "react";
import LandingPage from "./Components/LandingPage";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsOfService from "./Components/TermsOfService";
import Header from "./Components/Header";

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isEnglish, setIsEnglish] = useState(true);

  return (
    <HashRouter>
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
      </Routes>
    </HashRouter>
  );
}

export default App;


