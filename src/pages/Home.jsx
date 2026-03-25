import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Marquee from '../components/sections/Marquee';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F0F0F0] text-black font-mono selection:bg-yellow-300">
      <Navbar />
      <Hero />
      <Marquee />
      <Experience />
      <Projects />
      <Skills />
      <Footer />
    </div>
  );
};

export default Home;
