"use client";
import { Socials } from "@/constants";
import Image from "next/image";

const Navbar = () => {
    return(
        <div className="w-full h-[65px] fixed top-0 z-[50] shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-sm px-10">
            <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
            {/* Logo: hide on mobile */}
            <a href="#about-me" className="h-auto w-auto flex flex-row items-center hidden md:flex">
                <Image
                 src={"/logo.svg"}
                 alt="MW"
                 width={70}
                 height={70}
                 className="cursor-pointer hover:animate-bounce"
                />

                <span className="font-bold ml-[10px] hidden md:block text-gray-300">
                    zealousMW
                </span>
            </a>

            {/* Nav links: always visible */}
            <div className="w-full md:w-[500px] max-w-md h-full flex flex-row items-center justify-between md:mr-20 text-gray-300">
                <div className="flex items-center w-full h-auto justify-between border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full">
                    <a href="#about-me" className="cursor-pointer">About me</a>
                    <a href="#skills" className="cursor-pointer">SKills</a>
                    <a href="#projects" className="cursor-pointer">Projects</a>
                </div>
            </div>

            {/* Social icons: hide on mobile */}
            <div className="flex flex-row gap-5 hidden md:flex">
                {Socials.map((social)=>(
                    <Image
                      src={social.src}
                      alt={social.name}
                      key={social.name}
                      width={24}
                      height={24}
                    />
                ))}
            </div>
            </div>    
        </div>
    );
}

export default Navbar;