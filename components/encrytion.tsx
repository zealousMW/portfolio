"use client"
import { slideInFromTop } from "@/utils/motion";
import { motion } from "framer-motion";
import Image from "next/image";

const Encryption = () => {
    return(
        <div className="relative flex flex-col items-center justify-center min-h-[600px] w-full py-10">
            <motion.div
                variants={slideInFromTop}
                initial="hidden"
                animate="visible"
                className="text-[32px] md:text-[40px] font-medium text-center text-gray-200 mb-8 px-4"
            >
                Performance{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                    &
                </span>{" "}
                Security
            </motion.div>

            <div className="flex flex-col items-center justify-center relative z-20">
                <div className="flex flex-col items-center group cursor-pointer">
                    <Image 
                        src="/LockTop.png"
                        alt="lock top"
                        width={50}
                        height={50}
                        className="translate-y-5 transition-all duration-300 group-hover:translate-y-11"
                    />
                    <Image 
                        src="/LockMain.png"
                        alt="lock main"
                        width={70}
                        height={70}
                        className="z-10"
                    />
                </div>

                <div className="Welcome-box px-[15px] py-[4px] border my-[20px] border-[#7042f88b] opacity-[0.9]">
                    <h1 className="Welcome-text text-[13px] md:text-[14px]">
                        I build with security in mind
                    </h1>
                </div>

                <div className="px-4 md:px-[15px] max-w-[90%] md:max-w-[600px] mt-4">
                    <div className="cursive text-[18px] md:text-[20px] font-medium text-center text-gray-300">
                        Every project I create is designed to keep your data safe and secure.
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 z-0">
                <video 
                    loop
                    autoPlay
                    muted
                    playsInline
                    preload="false"
                    className="w-full h-full object-cover opacity-80"
                    src="/encryption.webm"
                />
            </div>
        </div>
    );
}

export default Encryption;