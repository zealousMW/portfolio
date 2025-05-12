"use client"
import ProjectCard from "./projectcontent";
import React from "react";
const Project = () => {
    return(
         <div className="flex flex-col items-center justify-center py-10 md:py-20 z-[50]">
            <h1 className="text-[32px] md:text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 px-4 text-center">
                My projects
            </h1>
            <div className="h-full w-full flex flex-col lg:flex-row gap-6 md:gap-10 px-4 md:px-10">
                <ProjectCard
                  src="/nextWebsite.png"
                  title="Faculty Leave Management System"
                  descrption="Automated faculty leave requests with secure authentication and bulk data management."
                />
                <ProjectCard
                  src="/nextWebsite.png"
                  title="Hospital Management System"
                  descrption="Managed patient records, prescriptions, and inventory with role-based access."
                />
                <ProjectCard
                  src="/nextWebsite.png"
                  title="Gembot Windows Automation Tool"
                  descrption="Voice-controlled Windows tool for automating tasks using AI."
                />
            </div>
            <div className="h-full w-full flex flex-col lg:flex-row gap-6 md:gap-10 px-4 md:px-10 mt-6 md:mt-10">
                <ProjectCard
                  src="/nextWebsite.png"
                  title="CopBot"
                  descrption="AI assistant for police document-based information retrieval."
                />
                <ProjectCard
                  src="/nextWebsite.png"
                  title="Coconut Shell Recycling Reward System"
                  descrption="Web app to encourage coconut shell recycling with incentives."
                />
            </div>
         </div>
    )
}

export default Project;