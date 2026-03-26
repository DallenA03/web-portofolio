import PixelCard from '../ui/PixelCard';
import { Layout, Activity, ExternalLink, GitCommit, GitPullRequest, Code2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const GithubStats = () => {
  const githubUser = "DallenA03";

  return (
    <section id="github-stats" className="py-24 bg-white px-4 border-y-4 border-black relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -bottom-10 -left-10 opacity-[0.03] text-[180px] font-black pointer-events-none select-none -rotate-6">
        GITHUB
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-12 h-1 bg-green-500"></span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Dev Environment</span>
            </div>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Open Source <span className="text-green-600 italic">Impact*</span>
            </h3>
          </div>
          <div className="max-w-md md:text-right">
             <p className="text-sm font-bold text-gray-600 leading-relaxed">
                An overview of my daily contributions, repository management, 
                and involvement in the developer community through GitHub.
             </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-10 flex justify-start md:justify-end">
          <a 
            href={`https://github.com/${githubUser}`}
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-black text-white font-black text-xs border-2 border-black hover:bg-green-500 hover:text-black hover:-translate-y-1 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <FaGithub size={18} /> VIEW GITHUB PROFILE <ExternalLink size={14} />
          </a>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Column 1: Contribution Calendar */}
          <PixelCard className="p-0 overflow-hidden bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full">
             <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <Activity size={18} className="text-green-400" />
                   <span className="text-xs font-black uppercase tracking-widest">Contribution Calendar</span>
                </div>
                <div className="flex gap-1">
                   <div className="w-2 h-2 bg-green-200 border border-white/20"></div>
                   <div className="w-2 h-2 bg-green-500 border border-white/20"></div>
                   <div className="w-2 h-2 bg-green-800 border border-white/20"></div>
                </div>
             </div>
             
             <div className="flex-1 p-4 bg-[#0d1117] flex items-center justify-center min-h-[250px]">
                <img 
                  src={`https://github-readme-activity-graph.vercel.app/graph?username=${githubUser}&theme=react-dark&bg_color=0d1117&hide_border=true&area=true&point=green`}
                  alt="Commit History Graph"
                  className="w-full h-auto"
                />
             </div>
             
             <div className="p-4 bg-gray-50 border-t-2 border-black flex justify-around">
                <div className="text-center">
                   <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Status</p>
                   <p className="text-xs font-black text-green-600">ACTIVE</p>
                </div>
                <div className="text-center border-x-2 border-black/5 px-8">
                   <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Visibility</p>
                   <p className="text-xs font-black text-black uppercase">Public</p>
                </div>
             </div>
          </PixelCard>

          {/* Column 2: Stats & Top Languages */}
          <div className="flex flex-col gap-8 h-full">
             {/* General Stats Card */}
             <PixelCard className="p-0 overflow-hidden bg-[#1a1b27] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="bg-green-500 text-black px-6 py-3 flex justify-between items-center border-b-4 border-black">
                   <span className="text-xs font-black uppercase tracking-widest">Overall GitHub Stats</span>
                   <GitCommit size={16} />
                </div>
                <div className="p-4">
                   <img 
                    src={`https://github-readme-stats.vercel.app/api?username=${githubUser}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=1a1b27&rank_icon=github&include_all_commits=true&count_private=false`}
                    alt="General GitHub Stats"
                    className="w-full h-auto"
                   />
                </div>
             </PixelCard>

             {/* Language Distribution Card */}
             <PixelCard className="p-0 overflow-hidden bg-[#1a1b27] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="bg-white text-black px-6 py-3 flex justify-between items-center border-b-4 border-black">
                   <span className="text-xs font-black uppercase tracking-widest">Language Distribution</span>
                   <Code2 size={16} />
                </div>
                <div className="p-4">
                   <img 
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUser}&layout=compact&theme=tokyonight&hide_border=true&bg_color=1a1b27&langs_count=6`}
                    alt="GitHub Top Languages"
                    className="w-full h-auto"
                   />
                </div>
             </PixelCard>
          </div>

        </div>

        {/* Metadata Bar */}
        <div className="mt-16 flex items-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
           <span className="flex items-center gap-1">SYNCED VIA OCTOKIT</span>
           <span className="opacity-30">|</span>
           <span className="flex items-center gap-1">UPDATED REALTIME</span>
        </div>
      </div>
    </section>
  );
};

export default GithubStats;
