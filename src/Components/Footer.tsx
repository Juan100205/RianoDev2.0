import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";

const Footer = () =>{
    return(
        <div className="w-full  bg-[#D9D9D9] ">
            <div className=" border-b-1 h-75 border-gray-400 md:mx-5 flex justify-between items-center md:px-100">
                <div className="md:w-full w-1/2 text-center">
                    <h1 className="font-bold text-center">Attachments</h1>
                    <a onClick={()=>window.open("https://drive.google.com/drive/folders/1OKmfIBey0vfV6QiR2QMvXtKVe1u2qP_7?usp=sharing",'_blank')} className=" transition-all text-gray-500 block mt-5 hover:text-black cursor-pointer">Certificates</a>
                    <a onClick={()=>window.open("https://drive.google.com/file/d/17ugZAIEIP7au6lPodQTcukQvqu5n3M3d/view",'_blank')} className=" transition-all text-gray-500 block mt-5 hover:text-black cursor-pointer">Resume</a>
                    <a onClick={()=>window.open("https://drive.google.com/file/d/17kh4o2_hp7jNY9GTOlBQ25xzmY1TPm6R/view",'_blank')} className=" transition-all text-gray-500 block mt-5 hover:text-black cursor-pointer">CV</a>
                </div>
                <div className="md:w-full w-1/2 text-center">
                    <h1 className="font-bold text-center">Contact me</h1>
                    <div className="flex justify-start mt-5">
                        <PhoneIcon className="w-5"/>
                        <p onClick={()=>window.open("callto:+573124508591",'_blank')}className=" transition-all text-gray-500 block ml-5 hover:text-black cursor-pointer">+57 312 450 8591</p>
                    </div>
                    <div className="flex mt-10 justify-start "> 
                        <EnvelopeIcon className="w-5"/>
                        <p onClick={()=>window.open("emailto:juanjorianozabaleta@gmail.com",'_blank')}className="md:hidden flex transition-all text-gray-500 block ml-5 md:ml-5 hover:text-black cursor-pointer">juanj...@gmail.com</p>
                        <p onClick={()=>window.open("emailto:juanjorianozabaleta@gmail.com",'_blank')}className="md:flex hidden transition-all text-gray-500 block ml-5 md:ml-5 hover:text-black cursor-pointer">juanjorianozabaleta@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className=" w-full flex justify-between px-15 md:text-sm text-xs font-light text-gray-500">
                <span className="w-50 md:flex hidden"></span>
                <span> © 2025 Juan Jose Riaño. All rights reserved.</span>
                <span> Made with React & Three.js </span>
            </div>
        </div>
    )
}

export default Footer;