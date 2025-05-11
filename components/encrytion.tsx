"use client"
import { slideInFromTop } from "@/utils/motion";
import { motion } from "framer-motion";
import Image from "next/image";

const Encryption = () => {
    return(
        <div className="flex flex-col items-center justify-center relative min-h-screen w-full h-full">
            <div className="absolute w-auto h-auto top-0 z-[5]">
                <motion.div
                    variants={slideInFromTop}
                    className="text-[40px] font-medium text-center text-gray-200 mt-10"
                >
                    Performance{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                        &
                    </span>{" "}
                    Security
                </motion.div>
            </div>
            <div className="flex flex-col items-center justify-center translate-y-[-50px] absolute z-[20] w-auto h-auto">
                <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">
                    <Image 
                        src={"/LockTop.png"}
                        alt="lock"
                        width={50}
                        height={50}
                        className="translate-y-5 transition-all duration-300 group-hover:translate-y-11"
                    />
                    <Image 
                        src={"/LockMain.png"}
                        alt="lock"
                        width={70}
                        height={70}
                        className="z-10"
                    />
                </div>

                <div className="Welcome-box px-[15px] py-[4px] z-[20] border my-[20px] border-[#7042f88b] opacity-[0.9]">
                    <h1 className="Welcome-text text-[13px]">
                        Encryption
                    </h1>
                </div>
            </div>

                <div className="absolute z-20 bottom-[10px] px-[5px] mb-15">
                <div className="cursive text-[20px] font-medium text-center text-gray-300">
                    secure your data with encryption
                </div>
                </div>
                
          
            <div className="w-full flex items-start justify-center absolute">
                <video 
                    loop
                    autoPlay
                    muted
                    playsInline
                    preload="false"
                    className="w-full h-full object-cover "
                    src={"/encryption.webm"}
                ></video> 
            </div>
        </div>
    );
}

export default Encryption;