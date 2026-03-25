import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section 
      id="profil" 
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden bg-[#F0F0F0]"
    >
      {/* Dot Pattern Background with Radial Fade */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
        }}
      />

      {/* Top Left Globe/Icon */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-8 left-8 sm:top-12 sm:left-12 opacity-30 z-10 hidden sm:block"
      >
        <div className="w-16 h-16 rounded-full border border-dashed border-black flex items-center justify-center bg-transparent relative">
           <div className="absolute inset-2 border border-dotted border-black rounded-full" />
           <div className="absolute w-full h-[1px] bg-black opacity-30" />
           <div className="absolute h-full w-[1px] bg-black opacity-30" />
        </div>
      </motion.div>

      <div className="z-10 flex flex-col items-center text-center space-y-6">
        {/* ASCII Art */}
        {/* <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl sm:text-3xl font-black tracking-widest bg-yellow-300 px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default"
        >
          ( ﾉ ◕ ヮ ◕ ) ﾉ
        </motion.div> */}

        {/* Main Title */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl italic font-black mb-6 leading-none break-words tracking-tighter"
        >
          Hi, I'm <span className="text-blue-600 not-italic hover:scale-105 inline-block transition-transform duration-300">Francesco*</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-sm md:text-lg mb-8 max-w-xl text-gray-800 font-bold border-l-4 border-black pl-4 text-left mx-auto leading-relaxed"
        >
          I am a Computer Science student at ISTTS, specializing in Software Technology. 
          I have a strong interest in <span className="bg-yellow-300 px-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">artificial intelligence</span> and am passionate about building innovative applications.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Link 
            to="/portfolio" 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white border-2 border-black font-black text-sm tracking-widest hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-400 transition-all"
          >
            VIEW PORTFOLIO <ArrowUpRight size={18} strokeWidth={3} />
          </Link>
          
          <Link 
            to="/contact" 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-black font-black text-sm tracking-widest hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 transition-all"
          >
            GET IN TOUCH <ArrowUpRight size={18} strokeWidth={3} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
