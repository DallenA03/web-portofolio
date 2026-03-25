import { ArrowUpRight, Download, ArrowLeft } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#F0F0F0] text-black font-mono selection:bg-yellow-300 flex flex-col relative overflow-hidden">
      {/* button back */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20"
      >
        <Link
          to="/"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-black font-black text-sm tracking-widest hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 transition-all"
        >
          <ArrowLeft size={18} strokeWidth={3} /> BACK
        </Link>
      </motion.div>

      {/* Dot Pattern Background with Radial Fade */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 70%)",
        }}
      />

      {/* Top Left Globe/Icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-24 left-8 sm:top-28 sm:left-12 opacity-30 z-10 hidden sm:block pointer-events-none"
      >
        <div className="w-16 h-16 rounded-full border border-dashed border-black flex items-center justify-center bg-transparent relative">
          <div className="absolute inset-2 border border-dotted border-black rounded-full" />
          <div className="absolute w-full h-[1px] bg-black opacity-30" />
          <div className="absolute h-full w-[1px] bg-black opacity-30" />
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 z-10">
        <div className="max-w-4xl mx-auto text-center w-full flex flex-col items-center">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 racking-tighter"
          >
            Contact Me
          </motion.h2>

          <div className="mb-16">
            <p>
              Interested in collaborating or want to know more about my work?
              Let's create something amazing together.
            </p>
          </div>

          {/* Social Circles */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex gap-8 md:gap-16 mb-16"
          >
            {/* Github */}
            <div className="flex flex-col items-center gap-4 group cursor-pointer">
              <a
                href="https://github.com/DallenA03"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-black flex items-center justify-center bg-white group-hover:bg-gray-200 group-hover:-translate-y-2 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <FaGithub size={32} />
              </a>
              <span className="text-[10px] font-bold tracking-[0.2em] border-b-2 border-transparent group-hover:border-black transition-colors uppercase">
                G I T H U B
              </span>
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col items-center gap-4 group cursor-pointer">
              <a
                href="https://www.linkedin.com/in/francesco-dallen/"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-black flex items-center justify-center bg-white group-hover:bg-blue-400 group-hover:-translate-y-2 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <FaLinkedin size={32} />
              </a>
              <span className="text-[10px] font-bold tracking-[0.2em] border-b-2 border-transparent group-hover:border-black transition-colors uppercase">
                L I N K E D I N
              </span>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto"
          >
            <a
              href="mailto:hello@francescodallen.com"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white border-2 border-black font-black text-sm tracking-widest hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-400 transition-all w-full sm:w-auto"
            >
              SEND AN EMAIL <ArrowUpRight size={18} strokeWidth={3} />
            </a>

            {/* <a 
              href="#" 
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white border-2 border-black font-black text-sm tracking-widest hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-400 transition-all w-full sm:w-auto"
            >
              DOWNLOAD CV <Download size={18} strokeWidth={3} />
            </a> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
