import "./App.css";
import About_me from "./Components/About_me";
import Education from "./Components/Education";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Projects from "./Components/Projects";
import Resume from "./Components/Resume";
import Services from "./Components/Services";
import { useRef } from "react";



function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollContainerRef} className="scroll_snap">
      <Header scrollRef={scrollContainerRef} />
      <div id="home" className="scroll_snap_per_comp pt-10">
        <Home />
      </div>
      <div id="about_me" className="scroll_snap_per_comp pt-20">
        <About_me />
      </div>
      <div id="resume" className="scroll_snap_per_comp mt-20">
        <Resume />
      </div>
      <div id="education" className="scroll_snap_per_comp pt-20">
        <Education />
      </div>
      <div id="projects" className="scroll_snap_per_comp pt-20">
        <Projects />
      </div>
      <div id="services" className="scroll_snap_per_comp pt-20">
        <Services />
      </div>
      <div className="scroll_snap_per_comp pt-20">
        <Footer />
      </div>
    </div>
  );
}

export default App;
