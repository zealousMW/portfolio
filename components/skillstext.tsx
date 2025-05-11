"use client"
import { motion } from "framer-motion"
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/motion"
import { Sparkles } from "lucide-react"

const SkillText = () => {
    return (
        <div className="w-dull h-auto flex flex-col items-center justify-center">
            <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[4px] border border-[#7042f88b] opacity-[0.9]"
        >
          <Sparkles className="text-purple-400 animate-pulse mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Break boundaries, build possibilities.
          </h1>
        </motion.div>
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="text-[30px] text-gray-200 font-medium mt-[10px] text-center">
            Engineering solutions with the latest tech stack
        </motion.div>
        <motion.div
          variants={slideInFromRight(0.5)}
          className="cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center">
            Adapt. Innovate. Deliver.
        </motion.div>

        </div>
    )
}

export default SkillText;