import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Hero = () => (
  <section id="profil" className="max-w-6xl mx-auto py-16 px-4 md:py-24 grid md:grid-cols-2 gap-12 items-center">
    <div>
      <span className="bg-yellow-300 px-3 py-1 text-sm font-bold border-2 border-black mb-4 inline-block">
        {/* show real-time date */}
        {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </span>
      <h2 className="text-5xl md:text-7xl font-black mb-6 leading-none">
        BUILDING <br />
        <span className="text-blue-600">SMARTER</span> <br />
        APPLICATIONS.
      </h2>
      <p className="text-lg mb-8 max-w-lg leading-relaxed border-l-4 border-black pl-4">
        Mahasiswa Informatika ISTTS & Software Engineer berbasis di Surabaya. 
        Spesialisasi dalam aplikasi web/mobile dan passionate in AI.
      </p>
      <div className="flex gap-4">
        <button className="bg-black text-white px-8 py-3 font-bold hover:bg-blue-600 transition-all active:translate-y-1">
          Hubungi Saya
        </button>
        <div className="flex gap-2">
          <a href="https://github.com/DallenA03" className="p-3 border-4 border-black hover:bg-yellow-300 transition-colors"><FaGithub size={24} /></a>
          <a href="https://www.linkedin.com/in/francesco-dallen/" className="p-3 border-4 border-black hover:bg-blue-400 transition-colors"><FaLinkedin size={24} /></a>
        </div>
      </div>
    </div>
    <div className="relative">
      <div className="w-full aspect-square bg-blue-600 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
        {/* Placeholder untuk foto Francesco */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-8xl font-black opacity-20 group-hover:scale-110 transition-transform">
          FD
        </div>
        <div className="absolute bottom-4 left-4 bg-white border-2 border-black p-2 font-bold text-sm">
          SURABAYA, INDONESIA
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
