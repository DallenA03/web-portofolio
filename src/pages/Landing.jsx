import Hero from '../components/sections/Hero';
import Marquee from '../components/sections/Marquee';
import Navbar from '../components/layout/Navbar';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#F0F0F0] text-black font-mono selection:bg-yellow-300">
      {/* <Navbar /> */}
      <Hero />
      <Marquee />
    </div>
  );
};

export default Landing;
