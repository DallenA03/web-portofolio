import { Code2, Cpu, Globe } from "lucide-react";
import { FaJava, FaAws } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import { 
  SiPhp, SiPython, SiKotlin, SiGo, SiCplusplus, 
  SiJavascript, SiTypescript, SiLaravel, SiNodedotjs, 
  SiReact, SiNextdotjs, SiFlutter, SiExpress, SiBootstrap, 
  SiMui, SiShadcnui, SiTailwindcss, SiTensorflow, SiGoogle, 
  SiMysql, SiMongodb, SiGit, SiFigma, SiPostgresql, 
  SiFirebase, SiSupabase, SiDocker, SiPostman 
} from "react-icons/si";

const languages = [
  { name: "PHP", Icon: SiPhp },
  { name: "Java", Icon: FaJava },
  { name: "Python", Icon: SiPython },
  { name: "Kotlin", Icon: SiKotlin },
  { name: "Golang", Icon: SiGo },
  { name: "C++", Icon: SiCplusplus },
  { name: "C#", Icon: TbBrandCSharp },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "TypeScript", Icon: SiTypescript }
];

const frameworks = [
  { name: "Laravel", Icon: SiLaravel },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "React.js", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Flutter", Icon: SiFlutter },
  { name: "Express", Icon: SiExpress },
  { name: "Bootstrap", Icon: SiBootstrap },
  { name: "Material UI", Icon: SiMui },
  { name: "Shadcn UI", Icon: SiShadcnui },
  { name: "Tailwind CSS", Icon: SiTailwindcss }
];

const techTools = [
  { name: "TensorFlow", Icon: SiTensorflow },
  { name: "Gemini / Google AI", Icon: SiGoogle },
  { name: "MySQL", Icon: SiMysql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Git", Icon: SiGit },
  { name: "Figma", Icon: SiFigma },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Firebase", Icon: SiFirebase },
  { name: "Supabase", Icon: SiSupabase },
  { name: "Docker", Icon: SiDocker },
  { name: "AWS", Icon: FaAws },
  { name: "Postman", Icon: SiPostman }
];

const Skills = () => (
  <section id="skills" className="py-20 bg-white px-4 border-y-4 border-black overflow-hidden relative">
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black text-white">
            <Code2 />
          </div>
          <h4 className="text-2xl font-black">LANGUAGES</h4>
        </div>
        <div className="flex flex-wrap gap-4">
          {languages.map((item) => {
            const Icon = item.Icon;
            return (
              <div
                key={item.name}
                title={item.name}
                className="w-16 h-16 flex items-center justify-center border-2 border-black bg-white hover:bg-yellow-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group"
              >
                <Icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black text-white">
            <Cpu />
          </div>
          <h4 className="text-2xl font-black">FRAMEWORKS</h4>
        </div>
        <div className="flex flex-wrap gap-4">
          {frameworks.map((item) => {
            const Icon = item.Icon;
            return (
              <div
                key={item.name}
                title={item.name}
                className="w-16 h-16 flex items-center justify-center border-2 border-black bg-white hover:bg-blue-400 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group"
              >
                <Icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black text-white">
            <Globe />
          </div>
          <h4 className="text-2xl font-black">AI & TOOLS</h4>
        </div>
        <div className="flex flex-wrap gap-4">
          {techTools.map((item) => {
            const Icon = item.Icon;
            return (
              <div
                key={item.name}
                title={item.name}
                className="w-16 h-16 flex items-center justify-center border-2 border-black bg-white hover:bg-green-400 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group"
              >
                <Icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
