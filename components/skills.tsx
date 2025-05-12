import { Backend_skill, Frontend_skill, Full_stack, Other_skill } from "@/constants";
import SkillsData from "./skillsdata";
import SkillText from "./skillstext";

const Skils = () => {
    return(
         <section className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden pb-20 md:pb-80 py-10 md:py-20 scale-100 md:scale-80">
         
            <SkillText/>
            <div className="flex flex-row justify-center flex-wrap mt-4 gap-3 md:gap-5 items-center px-4 md:px-0">
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
            <div className="flex flex-row justify-center flex-wrap mt-4 gap-3 md:gap-5 items-center px-4 md:px-0">
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
            <div className="flex flex-row justify-center flex-wrap mt-4 gap-3 md:gap-5 items-center px-4 md:px-0">
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
            <div className="flex flex-row justify-center flex-wrap mt-4 gap-3 md:gap-5 items-center px-4 md:px-0">
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

            <div className="w-full h-full absolute">
                <div className="w-full h-full z-[-10] absolute flex items-center bg-cover">
                    <video 
                        className="w-full h-auto object-cover"
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