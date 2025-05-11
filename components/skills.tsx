import { Backend_skill, Frontend_skill, Full_stack, Other_skill } from "@/constants";
import SkillsData from "./skillsdata";
import SkillText from "./skillstext";

const Skils = () => {
    return(
         <section className="flex flex-col items-center justify-center gap-3 h-full overflow-hidden pb-80 py-20"
         style={{transform:"scale(0.8)"}}>
         
        <SkillText/>
         <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
            {Frontend_skill.map((image,index)=>(
                <SkillsData
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
                />
            ))}

         </div>
         <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
            {Backend_skill.map((image,index)=>(
                <SkillsData
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
                />
            ))}

         </div>
         <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
            {Full_stack.map((image,index)=>(
                <SkillsData
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
                />
            ))}

         </div>
         <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
            {Other_skill.map((image,index)=>(
                <SkillsData
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
                />
            ))}

         </div>

         <div className="w-full h-full absolute ">

            <div className="w-full h-full z-[-10] absolute flex items-center bg-cover">

                <video 
                    className="w-full h-auto object-cover hidden sm:block"
                    preload="false"
                    playsInline
                    loop
                    muted
                    autoPlay
                    src="/cards-video.webm"
                />


            </div>


         </div>

         </section>
    );
}

export default Skils;