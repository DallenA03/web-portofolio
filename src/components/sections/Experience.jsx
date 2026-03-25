import { Award } from "lucide-react";
import { Link } from "react-router-dom";
import PixelCard from "../ui/PixelCard";
import { experiences } from "../../data/data";

const Experience = () => (
  <section
    id="pengalaman"
    className="py-20 bg-white px-4 border-b-4 border-black"
  >
    <div className="max-w-6xl mx-auto">
      <h3 className="text-3xl md:text-4xl font-black mb-12 flex items-center gap-4 break-words">
        <Award className="shrink-0" size={40} /> EXPERIENCE & ORGANIZATION
      </h3>
      <div className="grid gap-8">
        {experiences.map((exp) => (
          <Link key={exp.id} to={`/experience/${exp.id}`} className="block group">
            <PixelCard className={`flex flex-col md:flex-row justify-between gap-4 border-l-8 ${exp.color} hover:bg-gray-50 transition-colors cursor-pointer`}>
              <div>
                <h4 className="text-2xl font-black group-hover:underline decoration-4 underline-offset-4 tracking-tight">
                  {exp.title}
                </h4>
                <p className={`font-bold uppercase tracking-widest ${exp.color.replace('border-l-','text-')}`}>
                  {exp.company} • {exp.period}
                </p>
                <p className="mt-2 text-gray-700">
                  {exp.desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                {exp.tags.map((tag) => (
                  <span key={tag} className={`${exp.bgColor} px-3 py-1 rounded-full text-xs font-bold border border-black`}>
                    {tag}
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

export default Experience;
