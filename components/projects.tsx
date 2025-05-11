import ProjectCard from "./projectcontent";
import React from "react";
const Project = () => {
    return(
         <div className="flex flex-col items-center justify-center py-20">
            <h1 className="text-[40px] font-semibold text-transparent bg-clip-text  bg-gradient-to-r from-purple-500 to-cyan-500">
                My projects
            </h1>
            <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
                <ProjectCard
                  src="/nextWebsite.png"
                    title="Next.js Website"
                    descrption="This is a personal website built with Next.js, Tailwind CSS, and Framer Motion. It showcases my skills and projects."
                />
                <ProjectCard
                  src="/nextWebsite.png"
                    title="Next.js Website"
                    descrption="This is a personal website built with Next.js, Tailwind CSS, and Framer Motion. It showcases my skills and projects."
                />
                <ProjectCard
                  src="/nextWebsite.png"
                    title="Next.js Website"
                    descrption="This is a personal website built with Next.js, Tailwind CSS, and Framer Motion. It showcases my skills and projects."
                />
            </div>
            
         </div>
    )
}

export default Project;