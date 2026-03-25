import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { experiences } from '../data/data';

const ExperienceDetail = () => {
  const { id } = useParams();
  
  const currentIndex = experiences.findIndex(e => e.id === id);
  const exp = experiences[currentIndex];

  if (!exp) return (
    <div className="flex h-screen bg-[#F0F0F0] text-black font-mono">
      <Sidebar />
      <div className="flex-1 p-20 flex flex-col items-center justify-center font-black text-4xl">
        EXPERIENCE NOT FOUND.
        <Link to="/portfolio" className="mt-8 text-lg bg-black text-white px-8 py-4">GO BACK</Link>
      </div>
    </div>
  );

  const prevExp = currentIndex > 0 ? experiences[currentIndex - 1] : null;
  const nextExp = currentIndex < experiences.length - 1 ? experiences[currentIndex + 1] : null;

  const displayNum = String(currentIndex + 1).padStart(2, '0');

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F0F0F0] text-black font-mono selection:bg-yellow-300 overflow-hidden">
      <main className="flex-1 overflow-y-auto relative p-6 md:p-16 flex flex-col items-center">
        
        <div className="w-full max-w-5xl flex justify-between items-center mb-16 mt-8 md:mt-0">
           <Link to="/portfolio#pengalaman" className="flex items-center gap-2 font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-widest text-sm">
             <ArrowLeft size={16} /> BACK TO LIST
           </Link>
        </div>

        <div className="w-full max-w-5xl">
           
           {/* Header Area */}
           <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start mb-20">
              <span className="text-7xl md:text-8xl font-black text-black leading-none">{displayNum}</span>
              <div className="flex flex-col gap-4 mt-2">
                 <h1 className="text-4xl md:text-5xl font-black tracking-tight">{exp.title}</h1>
                 <p className="text-lg text-gray-600 font-bold uppercase tracking-widest flex flex-wrap gap-2">
                    <span className="text-black">{exp.company}</span> • <span>{exp.period}</span>
                 </p>
                 <p className="text-lg text-gray-700 max-w-2xl font-medium mt-4 border-l-4 border-black pl-4">{exp.desc}</p>
              </div>
           </div>

           {/* Details Section */}
           <div className="grid md:grid-cols-2 gap-16 mb-24">
             <div>
                <h3 className="text-xs font-bold tracking-[0.3em] uppercase mb-6 text-gray-500">S K I L L S & T O O L S</h3>
                <div className="flex flex-wrap gap-2">
                   {exp.tags.map(t => (
                     <span key={t} className="px-5 py-2 border border-black text-sm bg-transparent font-medium">{t}</span>
                   ))}
                </div>
             </div>
             
             <div>
                <h3 className="text-xs font-bold tracking-[0.3em] uppercase mb-6 text-gray-500">C E R T I F I C A T E S</h3>
                <div className="flex flex-wrap gap-4">
                   <a href="#" className="px-6 py-3 bg-black text-white font-bold text-xs uppercase flex items-center gap-2 hover:-translate-y-1 transition-transform border border-black">
                       VIEW CREDENTIAL <ArrowUpRight size={16} />
                   </a>
                </div>
             </div>
           </div>

           {/* Key Responsibilities */}
           <div className="mb-32">
              <h3 className="text-xs font-bold tracking-[0.3em] uppercase mb-10 text-gray-500">K E Y  R E S P O N S I B I L I T I E S</h3>
              <div className="grid md:grid-cols-2 gap-6">
                 {exp.features.map((feat, idx) => (
                   <div key={idx} className="border border-black px-6 py-8 flex gap-6 items-start bg-transparent">
                      <span className="font-black text-xl leading-none">0{idx+1}</span>
                      <p className="text-xs md:text-sm font-medium leading-relaxed font-mono">{feat}</p>
                   </div>
                 ))}
              </div>
           </div>

           {/* Pagination */}
           <div className="flex justify-between items-center py-12 border-t border-black mb-20 text-gray-500">
               {prevExp ? (
                 <Link to={`/experience/${prevExp.id}`} className="flex flex-col items-start hover:-translate-x-2 transition-transform text-black gap-2">
                    <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-1"><ArrowLeft size={16} /> PREV</span>
                    <span className="font-bold text-lg">{prevExp.title}</span>
                 </Link>
               ) : <div />}
               
               {nextExp ? (
                 <Link to={`/experience/${nextExp.id}`} className="flex flex-col items-end hover:translate-x-2 transition-transform text-black gap-2">
                    <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-1">NEXT <ArrowRight size={16} /></span>
                    <span className="font-bold text-lg">{nextExp.title}</span>
                 </Link>
               ) : <div />}
           </div>

        </div>
      </main>
    </div>
  );
};

export default ExperienceDetail;
