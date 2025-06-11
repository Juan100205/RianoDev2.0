import Logo_A3D from "./Logos_comp/Logo_A3D";
import Logo_Astro from "./Logos_comp/Logo_Astro";
import Logo_Maya from "./Logos_comp/Logo_Maya";
import Logo_Tailwind from "./Logos_comp/Logo_Tailwind";
import Logo_UE from "./Logos_comp/Logo_UE";
import Logo_Unity from "./Logos_comp/Logo_Unity";
import Project_card from "./Project_card";

const Projects = () =>{
    return (
        <div className="w-[80%] mx-auto">
            <h1 className="md:text-3xl text-xl md:text-start text-center font-bold mb-10">&lt;/Projects&gt;</h1>
            <div className="mt-10">
                <Project_card
                Index="01"
                Name="Laboratories Building C"
                Description="This 3D Virtual Reality application transforms 
                how engineering students at Universidad de La Sabana engage with 
                lab environments, offering an immersive and interactive way to explore 
                and practice with complex systems in a safe and realistic virtual setting."
                Image={<div className="w-full h-full relative">
                    <div className="absolute inset-0 w-[90%] h-full 
                    bg-[url('https://laboratoriomedellin.com/wp-content/uploads/2022/01/749.jpg')] 
                    bg-cover bg-center rounded-2xl grayscale "/>
                    <div className="absolute inset-0 w-[90%] h-full bg-black rounded-2xl opacity-50"/>
                    </div>}
                link_project="https://github.com/Juan100205/Laboratorio-Edificio-C"
                Technologies={<>
                                <div className="bg-[#111BFF] rounded-2xl md:w-20 w-15 p-2"><Logo_UE/></div>
                                <div className="bg-black rounded-2xl md:w-20 w-15 p-2"><Logo_Maya/></div>
                                <div className="bg-[#D9D9D9] rounded-2xl md:w-20 w-15 p-2 text-black"><Logo_A3D/></div>
                            </>}
                link_live=""
            />
            <Project_card
                Index="02"
                Name="Patology Museum"
                Description="A fully custom 3D VR application that offers 
                immersive visualization of anatomical models with various 
                pathologies. This virtual museum lets users explore 
                interactive metaverse environments, featuring original 
                models designed, sculpted, and textured from scratch."
                Image={<div className="w-full h-full relative">
                    <div className="absolute inset-0 w-[90%] h-full 
                    bg-[url('https://i.pinimg.com/736x/f6/2d/a0/f62da0329b47fefaa34bed8f0297575f.jpg')] 
                    bg-cover bg-center rounded-2xl grayscale "/>
                    <div className="absolute inset-0 w-[90%] h-full bg-black rounded-2xl opacity-50"/>
                    </div>}
                Technologies={<>
                                <div className="bg-[#111BFF] rounded-2xl md:w-20 w-15 p-2"><Logo_UE/></div>
                                <div className="bg-black rounded-2xl md:w-20 w-15 p-2"><Logo_Maya/></div>
                                <div className="bg-[#D9D9D9] rounded-2xl md:w-20 w-15 p-2 text-black"><Logo_A3D/></div>
                                <div className="bg-white rounded-2xl md:w-20 w-15 p-2 text-black"><Logo_Unity/></div>
                            </>}
                 link_project="https://github.com/Juan100205/Museo-de-Patologias"
                 link_live=""
            />
            <Project_card
                Index="03"
                Name="Scholar software"
                Description="An interactive metaverse-based app 
                for onboarding new students or staff, featuring virtual 
                campus environments with informative videos that introduce 
                services, rules, culture, and academic resources."
                Image={<div className="w-full h-full relative">
                    <div className="absolute inset-0 w-[90%] h-full 
                    bg-[url('https://i.pinimg.com/736x/d3/33/dc/d333dc29af4aa034915fb3b9a12cde11.jpg')] 
                    bg-cover bg-center rounded-2xl grayscale "/>
                    <div className="absolute inset-0 w-[90%] h-full bg-black rounded-2xl opacity-50"/>
                    </div>}
                Technologies={<>
                                <div className="bg-[#111BFF] rounded-2xl md:w-20 w-15 p-2 fill-white"><Logo_Unity/></div>
                                <div className="bg-black rounded-2xl md:w-20 w-15 p-2"><Logo_Maya/></div>
                                <div className="bg-[#D9D9D9] rounded-2xl md:w-20 w-15 p-2 text-black"><Logo_A3D/></div>
                            </>}
                link_project="https://github.com/Juan100205/Scholar-software"
                link_live=""
            />
            <Project_card
                Index="04"
                Name="Space X API"
                Description="A RESTful API that provides detailed information 
                about SpaceX launches, rockets, payloads, launchpads, crew, 
                and more. It allows developers to access real-time and historical 
                data to build apps, dashboards, or conduct research related to SpaceX 
                missions and technology."
                Image={<div className="w-full h-full relative">
                    <div className="absolute inset-0 w-[90%] h-full 
                    bg-[url('https://www.thestreet.com/.image/t_share/MjAxNDQ4NzE2MTczODQ2MDY5/spacex_lead_db_101223.jpg')] 
                    bg-cover bg-center rounded-2xl grayscale "/>
                    <div className="absolute inset-0 w-[90%] h-full bg-black rounded-2xl opacity-50"/>
                    </div>}
                Technologies={<>
                                <div className="bg-[#111BFF] rounded-2xl md:w-20 w-15 p-2"><Logo_Astro/></div>
                                <div className="bg-black rounded-2xl md:w-20 w-15 p-2"><Logo_Tailwind/></div>
                            </>}
                 link_project="https://github.com/Juan100205/Astro_course"
                 link_live=""
            />
            </div>
            
        </div>
    )
}

export default Projects;