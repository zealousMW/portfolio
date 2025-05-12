"use client"
import { slideInFromLeft, slideInFromTop } from "@/utils/motion";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
const Herocontent = () => {

    return (
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-center px-4 md:px-20 mt-20 md:mt-40 w-full z-20"
        >
          <div className="w-full h-full flex flex-col gap-5 justify-center m-auto text-start">
            <motion.div
              variants={slideInFromTop}
              className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] max-w-fit"
            >
              <Sparkles className="text-purple-400 animate-pulse mr-[10px] h-5 w-5" />
              <h1 className="Welcome-text text-[13px] md:text-[14px]">
                Hey there! I&apos;m Maheshwar Muthukumar, a passionate fullstack developer
              </h1>
            </motion.div>
    
            <motion.div
              variants={slideInFromLeft(0.5)}
              className="flex flex-col gap-6 mt-6 text-4xl md:text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
            >
              <span>
                Building{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                  intelligent experiences
                </span>{" "}
                with code and creativity
              </span>
            </motion.div>
    
            <motion.p
              variants={slideInFromLeft(0.8)}
              className="text-base md:text-lg text-gray-400 my-4 max-w-[600px]"
            >
              I&apos;m a full stack developer who can work with anything—front-end, back-end, or whatever the project needs. I love tackling new challenges and building solutions that just work.
            </motion.p>
    
            <motion.a
              variants={slideInFromLeft(1)}
              href="#skills"
              className="py-3 px-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-center text-white cursor-pointer rounded-lg max-w-[200px] hover:scale-105 hover:opacity-90 transition-all duration-300"
            >
              Learn More!
            </motion.a>
          </div>
    
          <motion.div
            variants={slideInFromLeft(1.2)}
            className="w-full h-full flex justify-center items-center mt-10 lg:mt-0"
          >
            <Image
              src="/mainIconsdark.svg"
              alt="Developer skills"
              height={650}
              width={650}
              priority
              className="animate-pulse w-full max-w-[400px] md:max-w-[650px]"
            />
          </motion.div>
        </motion.div>
      );
    }

export default Herocontent;