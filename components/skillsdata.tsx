"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {useInView} from 'react-intersection-observer';

interface Props {
    src: string;
    width: number;
    height: number;
    index: number;
}

const SkillsData = ({src , width ,height, index}: Props) => {
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const imageVariants = {
        hidden: {opacity: 0, scale: 0.8},
        visible: {opacity: 1, scale: 1}
    }
    const animationDelay = 0.3;
    return(
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={imageVariants}
            custom={index}
            transition={{delay: index * animationDelay, duration: 0.5}}
            className="relative flex items-center justify-center p-2 md:p-4"
        >
            <Image 
                src={src} 
                width={width} 
                height={height} 
                alt="skill icon" 
                className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] object-contain hover:scale-110 transition-transform duration-300"
            />
        </motion.div>
    );
}

export default SkillsData;