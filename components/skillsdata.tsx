"use client";

import { motion } from "framer-motion";
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
        hidden: {opacity: 0},
        visible :{opacity: 1}
    }
    const animationDelay = 0.3;
    return(
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={imageVariants}
            custom={index}
            transition={{delay: index * animationDelay}}
        >
            <img src={src} width={width} height={height} alt="skills"/>
    </motion.div>
    
)

}

export default SkillsData;