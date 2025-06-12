import "./App.css";
import About_me from "./Components/About_me";
import Education from "./Components/Education";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Projects from "./Components/Projects";
import Resume from "./Components/Resume";
import Services from "./Components/Services";
import { useRef, useState } from "react";



function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isEnglish, setIsEnglish] = useState(true); 

  return (
    <div ref={scrollContainerRef} className="scroll_snap">
      <Header scrollRef={scrollContainerRef} 
        languageState={isEnglish}
        setLanguageState={setIsEnglish} />
      <div id="home" className="scroll_snap_per_comp pt-30 md:pt-10">
        <Home languageState={isEnglish}/>
      </div>
      <div id="about_me" className="scroll_snap_per_comp pt-30 md:pt-20">
        <About_me languageState={isEnglish}/>
      </div>
      <div id="resume" className="scroll_snap_per_comp mt-20">
        <Resume languageState={isEnglish}/>
      </div>
      <div id="education" className="scroll_snap_per_comp pt-20">
        <Education languageState={isEnglish}/>
      </div>
      <div id="projects" className="scroll_snap_per_comp pt-20">
        <Projects languageState={isEnglish}/>
      </div>
      <div id="services" className="scroll_snap_per_comp pt-40 md:pt-20">
        <Services languageState={isEnglish}/>
      </div>
      <div className="scroll_snap_per_comp pt-20">
        <Footer languageState={isEnglish}/>
      </div>
    </div>
  );
}

export default App;
