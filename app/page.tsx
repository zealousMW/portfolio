import Encryption from "@/components/encrytion";
import Hero from "@/components/hero/hero2";
import Project from "@/components/projects";
import Skils from "@/components/skills";

const Main = () => {
  return (
    <main className="w-full h-full">
      <div className="flex flex-col gap-10 md:gap-20">
        <Hero/>
        <Skils/>
        <Encryption/>
        <Project/>
      </div>
    </main>
  );
} 

export default Main;