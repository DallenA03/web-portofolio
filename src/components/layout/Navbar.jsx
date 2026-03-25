import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-black p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tighter hover:text-blue-600 transition-colors">FRANCESCO DALLEN</Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 font-bold">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <a href="/portfolio#pengalaman" className="hover:text-blue-600 transition-colors">Experience</a>
          <a href="/portfolio#proyek" className="hover:text-blue-600 transition-colors">Projects</a>
          <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b-4 border-black p-4 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col gap-4 font-bold">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors">Home</Link>
              <a href="/portfolio#pengalaman" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors">Experience</a>
              <a href="/portfolio#proyek" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors">Projects</a>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
