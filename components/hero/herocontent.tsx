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
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-20"
    >
      <div className="w-full h-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[4px] border border-[#7042f88b] opacity-[0.9]"
        >
          <Sparkles className="text-purple-400 animate-pulse mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Fullstack Developer
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
         <span>
         Providing{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            the best
          </span>{" "}
          Experience
         </span>
          
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-4 max-w-[600px]"
        >
          I&apos;m a passionate fullstack developer with a knack for creating dynamic
          and responsive web applications. I specialize in both front-end and
          back-end development, ensuring a seamless user experience from start to finish.
        </motion.p>

        <motion.a
          variants={slideInFromLeft(1)}
          className="py-3 px-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-center text-white cursor-pointer rounded-lg max-w-[200px] hover:opacity-90 transition-opacity"
        >
          Learn More!
        </motion.a>
      </div>

      <motion.div
        variants={slideInFromLeft(1.2)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="Developer skills"
          height={650}
          width={650}
          priority
          className="animate-pulse"
        />
      </motion.div>
        </motion.div>
      );
    }

export default Herocontent;