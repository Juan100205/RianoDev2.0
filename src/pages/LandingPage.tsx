import type { RefObject } from "react";
import About_me from "../Components/About_me";
import TechPartnerCarousel from "../Components/Consulting";
import Home from "../Components/Home";
import Projects from "../Components/Projects";
import Services from "../Components/Services";
import WhySection from "../Components/WhySection";
import Footer from "../Components/Footer";

interface LandingPageProps {
    languageState: boolean;
    scrollContainerRef: RefObject<HTMLDivElement | null>;
}

const LandingPage = ({ languageState, scrollContainerRef }: LandingPageProps) => {
    return (
        <div ref={scrollContainerRef} className="scroll_snap scrollbar_exp">
            <div id="home" className="scroll_snap_per_comp pb-20">
                <Home languageState={languageState} />
            </div>
            <div id="how" className="scroll_snap_per_comp  pb-20">
                <TechPartnerCarousel languageState={languageState} />
            </div>
            <div id="why" className="scroll_snap_per_comp">
                <WhySection languageState={languageState} />
            </div>
            <div id="projects" className="scroll_snap_per_comp pt-10 pb-30">
                <Projects languageState={languageState} />
            </div>
            <div id="services" className="scroll_snap_per_comp pt-10 pb-30">
                <Services languageState={languageState} />
            </div>
            <div id="about_me" className="scroll_snap_per_comp pt-20 pb-30">
                <About_me languageState={languageState} />
            </div>
            <div className="scroll_snap_per_comp">
                <Footer languageState={languageState} />
            </div>
        </div>
    );
};

export default LandingPage;
