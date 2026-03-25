import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import PixelCard from "../ui/PixelCard";
import { projects } from "../../data/data";

const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <section id="proyek" className="py-20 px-4 bg-[#F0F0F0]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h3 className="text-3xl md:text-4xl font-black mb-4 break-words">
              SELECTED PROJECTS
            </h3>
            <p className="font-bold text-gray-600 uppercase tracking-widest text-sm md:text-base">
              Here are some of my best projects
            </p>
          </div>
          <div className="flex flex-wrap gap-2 bg-white border-4 border-black p-1">
            {["all", "web", "mobile"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 font-black uppercase transition-all ${activeTab === tab ? "bg-black text-white" : "hover:bg-gray-100"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <Link key={idx} to={`/project/${project.id || idx}`} className="block h-full group">
              <PixelCard
                className="group h-full flex flex-col hover:-translate-y-2 transition-transform cursor-pointer"
              >
                <div
                  className={`w-full h-48 border-2 border-black mb-4 ${project.color} flex items-center justify-center p-4 relative overflow-hidden`}
                >
                  <div className="bg-white border-2 border-black p-4 font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center break-words">
                    {project.title}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-black text-white p-2">
                    <ExternalLink size={20} />
                  </div>
                </div>
                <h4 className="text-xl font-black mb-2 uppercase group-hover:underline decoration-4 underline-offset-4 tracking-tight">
                  {project.title}
                </h4>
                <p className="text-sm font-bold text-gray-700 flex-grow mb-4 leading-snug">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase font-black px-2 py-1 bg-gray-100 border border-black"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </PixelCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
