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
      className="flex flex-col lg:flex-row items-center justify-center w-full px-4 md:px-20 mt-16 md:mt-20 z-20"
    >
      <div className="w-full h-full flex flex-col gap-5 justify-center text-start">
        <motion.div
          variants={slideInFromTop}
          className="flex items-center py-[6px] px-[7px] border border-purple-500/70 rounded-full bg-purple-500/10 w-fit"
        >
          <Sparkles className="text-purple-400 animate-pulse mr-2 h-4 w-4" />
          <h1 className="text-sm font-medium text-white">
            Fullstack Developer
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-2 text-4xl md:text-6xl font-bold text-white max-w-md"
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
          className="text-base md:text-lg text-gray-400 my-4 max-w-md"
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
        className="w-full h-full flex justify-center items-center mt-8 lg:mt-0"
      >
        <Image
          src="/mainIconsdark.svg"
          alt="Developer skills"
          height={500}
          width={500}
          priority
        />
      </motion.div>
        </motion.div>
      );
    }

export default Herocontent;