import React from "react";

import { Instagram, Linkedin, MailIcon, Github, Twitter, Youtube, DollarSign, User } from "lucide-react"

const Footer = () => {
    return(
        <div className="w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px]">
            <div className="w-full flex flex-col items-center justify-center gap-5 m-auto">
                <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">

                    <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">

                        <div className="font-bold text-[16px]">
                            Community
                        </div>
                        <p className="flex flex-row items-center my-[15px] cursor-pointer">
                            <Youtube className="h-5 w-5 mr-[10px] text-gray-200"/>
                            <span className="text-[15px] ml-[6px]">Youtube</span>

                        </p>
                        <p className="flex flex-row items-center my-[15px] cursor-pointer">
                            <Github className="h-5 w-5 mr-[10px] text-gray-200"/>
                            <span className="text-[15px] ml-[6px]">Github</span>   
                        </p>

                    </div>
                    <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">

                        <div className="font-bold text-[16px]">
                            Social 
                        </div>
                        <p className="flex flex-row items-center my-[15px] cursor-pointer">
                            <Instagram className="h-5 w-5 mr-[10px] text-gray-200"/>
                            <span className="text-[15px] ml-[6px]">Instagram</span>

                        </p>
                        <p className="flex flex-row items-center my-[15px] cursor-pointer">
                            <Linkedin className="h-5 w-5 mr-[10px] text-gray-200"/>
                            <span className="text-[15px] ml-[6px]">Linkedin</span>
                        </p>    
                        <p className="flex flex-row items-center my-[15px] cursor-pointer">
                            <Twitter className="h-5 w-5 mr-[10px] text-gray-200"/>
                            <span className="text-[15px] ml-[6px]">Twitter</span>
                        </p>

                    </div>
                    <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
                        <div className="font-bold text-[16px]">
                            Contact
                        </div>
                        <p className="flex flex-row items-center my-[15px] cursor-pointer">
                            <DollarSign className="h-5 w-5 mr-[10px] text-gray-200"/>
                            <span className="text-[15px] ml-[6px]">become a sponsor</span>
                        </p>
                        <p className="flex flex-row items-center my-[15px] cursor-pointer">
                            <User className="h-5 w-5 mr-[10px] text-gray-200"/>
                            <span className="text-[15px] ml-[6px]">
                                Learn about me
                            </span>
                        </p>
                        <p className="flex flex-row items-center my-[15px] cursor-pointer">
                            <MailIcon className="h-5 w-5 mr-[10px] text-gray-200"/>
                            <span className="text-[15px] ml-[6px]">mmkganeshwar@gmail.com</span>
                        </p>
                        
                    </div>

                    
                </div>
                <div className="mb-[20px] text-center text-[15px]">
                         &copy; 2025 zealous. All rights reserved.
                    </div>
            </div>
        </div>
    )
}

export default Footer;

