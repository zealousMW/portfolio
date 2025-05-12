import Image from "next/image";

interface Props {
    src: string;
    title: string;
    descrption: string;
}

const ProjectCard = ({src, title, descrption}: Props) => {
    return (
        <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] group transition-all duration-300 hover:scale-105 hover:border-[#4B2B9B] flex-1">
            <div className="h-[200px] md:h-[250px] relative overflow-hidden">
                <Image 
                    src={src}
                    alt={title}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <div className="relative p-4 md:p-6 bg-[#0F0728]/80 backdrop-blur-sm">
                <h1 className="text-xl md:text-2xl font-semibold text-white mb-2 line-clamp-2">
                    {title}
                </h1>
                <p className="text-sm md:text-base text-gray-300 line-clamp-3">
                    {descrption}
                </p>
            </div>
        </div>
    );
}

export default ProjectCard;