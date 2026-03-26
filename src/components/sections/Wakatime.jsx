import { useEffect, useState } from 'react';
import PixelCard from '../ui/PixelCard';
import { Clock, Activity, ExternalLink, Loader2 } from 'lucide-react';

const Wakatime = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const wakaUser = "UcupPaw";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const targetUrl = `https://wakatime.com/api/v1/users/${wakaUser}/stats/last_7_days`;
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
        const json = await res.json();
        const data = JSON.parse(json.contents);

        setStats(data.data);
      } catch (err) {
        console.error("Wakatime Load Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <section id="coding-activity" className="py-24 bg-[#F8F9FA] px-4 border-t-4 border-black relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-10 -right-20 opacity-[0.03] text-[200px] font-black pointer-events-none select-none rotate-12">
        CODE
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-12 h-1 bg-yellow-400"></span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Activity Analytics</span>
            </div>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
              Coding <span className="text-blue-600 not-italic">Metrics</span>
            </h3>
          </div>
          <div className="max-w-md text-right">
             <p className="text-sm font-bold text-gray-600 leading-relaxed">
                Data automatically synced directly from my integrated development environment (IDE).
                Provides real-time statistics on coding languages and productivity.
             </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-12 gap-6">
          
          {/* Highlight Card: Total Time */}
          <div className="md:col-span-4 min-h-[300px]">
             <PixelCard className="h-full bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-black text-yellow-300 flex items-center justify-center mb-10 shadow-[4px_4px_0px_0px_rgba(253,224,71,1)]">
                    <Clock size={24} />
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Total Time (Weekly)</h4>
                  <div className="text-4xl lg:text-5xl font-black">
                    {loading ? (
                      <Loader2 className="animate-spin text-gray-200" size={40} />
                    ) : (
                      stats?.human_readable_total || "0 hrs"
                    )}
                  </div>
                </div>
                
                <div className="mt-8 space-y-3">
                   <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                      <span>Daily Average</span>
                      <span className="text-blue-600">{stats?.human_readable_daily_average || "—"}</span>
                   </div>
                   <div className="w-full h-2 bg-gray-100 border border-black overflow-hidden">
                      <div className="h-full bg-blue-500 w-[65%]"></div>
                   </div>
                </div>
             </PixelCard>
          </div>

          {/* Graphics Card: Langs & Chart */}
          <div className="md:col-span-8">
             <PixelCard className="p-0 overflow-hidden bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
                <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      <Activity size={18} className="text-yellow-300" />
                      <span className="text-xs font-black uppercase tracking-widest">Global Language Statistics</span>
                   </div>
                   <div className="flex gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                   </div>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row">
                   {/* Left: Stats API Image */}
                   <div className="flex-1 bg-[#1a1b27] p-2 flex items-center justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-black">
                      <img 
                        src={`https://github-readme-stats.vercel.app/api/wakatime?username=${wakaUser}&langs_count=6&theme=tokyonight&hide_title=true&bg_color=1a1b27`}
                        alt="Languages Chart" 
                        className="w-full h-auto max-w-[400px]"
                      />
                   </div>

                   {/* Right: Manual Legend/Highlight */}
                   <div className="w-full lg:w-64 p-6 bg-white flex flex-col justify-between">
                      <div className="space-y-4">
                         <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Top Skills</h5>
                         {loading ? (
                           <div className="space-y-3 animate-pulse">
                             <div className="h-4 bg-gray-100 w-full"></div>
                             <div className="h-4 bg-gray-100 w-3/4"></div>
                           </div>
                         ) : (
                           stats?.languages?.slice(0, 3).map(lang => (
                             <div key={lang.name} className="flex justify-between items-center">
                                <span className="text-xs font-black uppercase tracking-tight">{lang.name}</span>
                                <span className="text-[10px] font-bold bg-blue-100 px-2 py-0.5 border border-black">{lang.percent}%</span>
                             </div>
                           ))
                         )}
                      </div>

                      <a 
                        href={`https://wakatime.com/@${wakaUser}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="mt-8 flex items-center justify-center gap-2 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-yellow-300 hover:text-black transition-all group"
                      >
                        Details <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                   </div>
                </div>
             </PixelCard>
          </div>

        </div>

        {/* Status Bar */}
        <div className="mt-12 flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
           <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Service Active</span>
           <span className="hidden sm:block opacity-30">|</span>
           <span className="hidden sm:block">Last Sync: {new Date().toLocaleDateString('id-ID')}</span>
        </div>
      </div>
    </section>
  );
};

export default Wakatime;
