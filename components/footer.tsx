import React from "react";
import { Instagram, Linkedin, MailIcon, Github, Twitter, Youtube, DollarSign, User } from "lucide-react"

const Footer = () => {
    return(
        <div className="relative w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px]">
            <div className="w-full flex flex-col items-center justify-center gap-5 m-auto z-[50]">
                <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">
                    <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
                        <div className="font-bold text-[16px]">
                            Community
                        </div>
                        <a 
                            href="https://youtube.com/@zealousmw" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex flex-row items-center my-[15px] cursor-pointer hover:text-purple-500 transition-colors"
                        >
                            <Youtube className="h-5 w-5 mr-[10px]"/>
                            <span className="text-[15px] ml-[6px]">Youtube</span>
                        </a>
                        <a 
                            href="https://github.com/zealousemmy" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex flex-row items-center my-[15px] cursor-pointer hover:text-purple-500 transition-colors"
                        >
                            <Github className="h-5 w-5 mr-[10px]"/>
                            <span className="text-[15px] ml-[6px]">Github</span>   
                        </a>
                    </div>

                    <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
                        <div className="font-bold text-[16px]">
                            Social 
                        </div>
                        <a 
                            href="https://instagram.com/zealous_mw" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex flex-row items-center my-[15px] cursor-pointer hover:text-purple-500 transition-colors"
                        >
                            <Instagram className="h-5 w-5 mr-[10px]"/>
                            <span className="text-[15px] ml-[6px]">Instagram</span>
                        </a>
                        <a 
                            href="https://linkedin.com/in/maheshwar-muthukumar" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex flex-row items-center my-[15px] cursor-pointer hover:text-purple-500 transition-colors"
                        >
                            <Linkedin className="h-5 w-5 mr-[10px]"/>
                            <span className="text-[15px] ml-[6px]">Linkedin</span>
                        </a>    
                        <a 
                            href="https://twitter.com/zealousmw" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex flex-row items-center my-[15px] cursor-pointer hover:text-purple-500 transition-colors"
                        >
                            <Twitter className="h-5 w-5 mr-[10px]"/>
                            <span className="text-[15px] ml-[6px]">Twitter</span>
                        </a>
                    </div>

                    <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
                        <div className="font-bold text-[16px]">
                            Contact
                        </div>
                        <a 
                            href="https://github.com/sponsors/zealousemmy" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex flex-row items-center my-[15px] cursor-pointer hover:text-purple-500 transition-colors"
                        >
                            <DollarSign className="h-5 w-5 mr-[10px]"/>
                            <span className="text-[15px] ml-[6px]">become a sponsor</span>
                        </a>
                        <a 
                            href="#about-me"
                            className="flex flex-row items-center my-[15px] cursor-pointer hover:text-purple-500 transition-colors"
                        >
                            <User className="h-5 w-5 mr-[10px]"/>
                            <span className="text-[15px] ml-[6px]">
                                Learn about me
                            </span>
                        </a>
                        <a 
                            href="mailto:mmkganeshwar@gmail.com"
                            className="flex flex-row items-center my-[15px] cursor-pointer hover:text-purple-500 transition-colors"
                        >
                            <MailIcon className="h-5 w-5 mr-[10px]"/>
                            <span className="text-[15px] ml-[6px]">mmkganeshwar@gmail.com</span>
                        </a>
                    </div>
                </div>

                <div className="mb-[20px] text-center text-[15px]">
                    &copy; {new Date().getFullYear()} zealous. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default Footer;

