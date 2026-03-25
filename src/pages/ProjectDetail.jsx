import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ArrowRight } from 'lucide-react';
import { projects } from '../data/data';

const ProjectDetail = () => {
  const { id } = useParams();
  
  const currentIndex = projects.findIndex(p => p.id === id);
  const project = projects[currentIndex];

  if (!project) return (
    <div className="flex h-screen bg-[#F0F0F0] text-black font-mono">
      <Sidebar />
      <div className="flex-1 p-20 flex flex-col items-center justify-center font-black text-4xl">
        PROJECT NOT FOUND.
        <Link to="/portfolio" className="mt-8 text-lg bg-black text-white px-8 py-4">GO BACK</Link>
      </div>
    </div>
  );

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const displayNum = String(currentIndex + 1).padStart(2, '0');

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F0F0F0] text-black font-mono selection:bg-yellow-300 overflow-hidden">
      <main className="flex-1 overflow-y-auto relative p-6 md:p-16 flex flex-col items-center">
        
        <div className="w-full max-w-5xl flex justify-between items-center mb-16 mt-8 md:mt-0">
           <Link to="/portfolio#proyek" className="flex items-center gap-2 font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-widest text-sm">
             <ArrowLeft size={16} /> BACK TO LIST
           </Link>
        </div>

        <div className="w-full max-w-5xl">
           
           {/* Header Area */}
           <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start mb-16">
              <span className="text-7xl md:text-8xl font-black text-black leading-none">{displayNum}</span>
              <div className="flex flex-col gap-4 mt-2">
                 <h1 className="text-4xl md:text-5xl font-black tracking-tight">{project.title}</h1>
                 <p className="text-lg text-gray-700 max-w-2xl font-medium">{project.desc}</p>
              </div>
           </div>

           {/* Hero Image Mock */}
           <div className="flex flex-col lg:flex-row gap-4 mb-20">
              <div className={`flex-1 min-h-[400px] border-2 border-black ${project.color} flex items-center justify-center relative p-8`}>
                 <div className="absolute inset-4 border border-dashed border-white opacity-50 pointer-events-none" />
                 <span className="font-black text-2xl bg-white border-2 border-black px-6 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase">{project.title} DEMO PREVIEW</span>
              </div>
              <div className="flex lg:flex-col gap-4 w-full lg:w-48 overflow-x-auto lg:overflow-visible">
                 {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="w-24 h-24 lg:w-full lg:flex-1 shrink-0 border-2 border-black bg-white flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                       <span className="text-xs font-bold font-mono">IMG 0{num}</span>
                    </div>
                 ))}
              </div>
           </div>

           {/* Details Section */}
           <div className="grid md:grid-cols-2 gap-16 mb-24">
             <div>
                <h3 className="text-xs font-bold tracking-[0.3em] uppercase mb-6 text-gray-500">T E C H  S T A C K</h3>
                <div className="flex flex-wrap gap-2">
                   {project.tags.map(t => (
                     <span key={t} className="px-5 py-2 border border-black text-sm bg-transparent font-medium">{t}</span>
                   ))}
                </div>
             </div>
             
             <div>
                <h3 className="text-xs font-bold tracking-[0.3em] uppercase mb-6 text-gray-500">L I V E  L I N K S</h3>
                <div className="flex flex-wrap gap-4">
                   <a href="#" className="px-6 py-3 bg-black text-white font-bold text-xs uppercase flex items-center gap-2 hover:-translate-y-1 transition-transform border border-black">
                       LIVE WEBSITE <ArrowUpRight size={16} />
                   </a>
                   {project.github && project.github !== "#" && (
                     <a href={project.github} target="_blank" rel="noreferrer" className="px-6 py-3 bg-black text-white font-bold text-xs uppercase flex items-center gap-2 hover:-translate-y-1 transition-transform border border-black">
                       GITHUB REPO <ArrowUpRight size={16} />
                     </a>
                   )}
                </div>
             </div>
           </div>

           {/* Key Features */}
           <div className="mb-32">
              <h3 className="text-xs font-bold tracking-[0.3em] uppercase mb-10 text-gray-500">K E Y  F E A T U R E S</h3>
              <div className="grid md:grid-cols-2 gap-6">
                 {project.features.map((feat, idx) => (
                   <div key={idx} className="border border-black px-6 py-8 flex gap-6 items-start bg-transparent">
                      <span className="font-black text-xl leading-none">0{idx+1}</span>
                      <p className="text-xs md:text-sm font-medium leading-relaxed font-mono">{feat}</p>
                   </div>
                 ))}
              </div>
           </div>

           {/* Pagination */}
           <div className="flex justify-between items-center py-12 border-t border-black mb-20 text-gray-500">
               {prevProject ? (
                 <Link to={`/project/${prevProject.id}`} className="flex flex-col items-start hover:-translate-x-2 transition-transform text-black gap-2">
                    <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-1"><ArrowLeft size={16} /> PREV</span>
                    <span className="font-bold text-lg">{prevProject.title}</span>
                 </Link>
               ) : <div />}
               
               {nextProject ? (
                 <Link to={`/project/${nextProject.id}`} className="flex flex-col items-end hover:translate-x-2 transition-transform text-black gap-2">
                    <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-1">NEXT <ArrowRight size={16} /></span>
                    <span className="font-bold text-lg">{nextProject.title}</span>
                 </Link>
               ) : <div />}
           </div>

        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
