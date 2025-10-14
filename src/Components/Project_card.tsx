import type { ReactNode } from "react";
import Logo_GitHub from "./Logos_comp/Logo_GitHub";
import {  PlayIcon } from "@heroicons/react/24/solid";

interface Props {
    Index:ReactNode;
    Name: ReactNode;
    Description:ReactNode;
    Technologies:ReactNode;
    Image:ReactNode;
    link_project:string;
    link_live:string;
}
 function Project_card ({Index,Name,Description,Technologies,Image,link_project,link_live}:Props){
    return (
        <div className="flex w-full mx-auto h-100 justify-between mt-20 scroll_snap_per_comp_project">
            <div className="w-3/7 md:flex hidden">
                {Image}
            </div>
            <div className="md:w-5/7 w-full md:px-10 flex flex-col justify-center">
                <div className="flex">
                    <span className="w-3 h-5 bg-[#10dffd]"></span>
                    <span className="text-sm font-black ml-2">
                        {Index}
                    </span>
                </div>
                <h1 className="text-xl md:text-3xl font-black md:px-10">
                    {Name}
                </h1>
                <p className="md:text-base text-sm text-gray-500 md:pl-10 md:pr-25 mt-10">
                    {Description}
                </p>
                <div className="w-full flex md:h-20 h-15 justify-between md:pl-10 md:pr-30 mt-8">
                    <div className="flex justify-start md:gap-5 gap-2">
                        {Technologies}
                    </div>
                    <div className="w-20 md:flex-row flex-col flex gap-2 justify-end  text-gray-400">
                        <Logo_GitHub link={link_project}/>
                        <PlayIcon className="hover:scale-110 cursor-pointer  " onClick={()=>window.open(link_live,'_blank')}/>
                    </div>
                </div>
            </div>
        </div>
    )
 }
 export default Project_card;