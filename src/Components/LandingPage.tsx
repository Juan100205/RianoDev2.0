import type { RefObject } from "react";
import About_me from "./About_me";
import TechPartnerCarousel from "./Consulting";
import Home from "./Home";
import Projects from "./Projects";
import Resume from "./Resume";
import Services from "./Services";
import Footer from "./Footer";

interface LandingPageProps {
    languageState: boolean;
    scrollContainerRef: RefObject<HTMLDivElement | null>;
}

const LandingPage = ({ languageState, scrollContainerRef }: LandingPageProps) => {
    return (
        <div ref={scrollContainerRef} className="scroll_snap">
            <div id="home" className="scroll_snap_per_comp pt-30 md:pt-10">
                <Home languageState={languageState} />
            </div>
            <div id="tech" className="scroll_snap_per_comp pt-30 md:pt-20">
                <TechPartnerCarousel languageState={languageState} />
            </div>
            <div id="about_me" className="scroll_snap_per_comp pt-30 md:pt-20">
                <About_me languageState={languageState} />
            </div>
            <div id="resume" className="scroll_snap_per_comp mt-20">
                <Resume languageState={languageState} />
            </div>
            <div id="projects" className="scroll_snap_per_comp pt-20">
                <Projects languageState={languageState} />
            </div>
            <div id="services" className="scroll_snap_per_comp pt-40 md:pt-20">
                <Services languageState={languageState} />
            </div>
            <div className="scroll_snap_per_comp pt-20">
                <Footer languageState={languageState} />
            </div>
        </div>
    );
};

export default LandingPage;
