import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Marquee from "../components/sections/Marquee";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { ShieldCheck, LogIn } from "lucide-react";

const AdminBar = () => {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <div className="bg-black text-white font-mono px-4 md:px-8 py-2 text-xs gap-4 border-b-4 border-yellow-300">
        <div className="max-w-7xl flex items-center justify-between mx-auto">
          <div className="flex items-center gap-2 font-bold">
            <ShieldCheck size={14} className="text-yellow-300" />
            <span className="text-yellow-300">ADMIN MODE</span>
            <span className="text-gray-400 hidden sm:block">— {user.email}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-yellow-300 transition-colors font-bold uppercase tracking-widest">
              Dashboard
            </Link>
            <button onClick={signOut} className="hover:text-red-400 transition-colors font-bold uppercase tracking-widest">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }
};

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-[#F0F0F0] text-black font-mono selection:bg-yellow-300">
      <AdminBar />
      <Navbar />
      <Marquee />
      <Experience />
      <Projects />
      <Skills />
      <Footer />
    </div>
  );
};

export default Portfolio;
