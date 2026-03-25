import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-black p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-tighter">FRANCESCO DALLEN</h1>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 font-bold">
          {['Profil', 'Pengalaman', 'Proyek', 'Kontak'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-600 transition-colors">
              {item}
            </a>
          ))}
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b-4 border-black p-4">
            <div className="flex flex-col gap-4 font-bold">
              {['Profil', 'Pengalaman', 'Proyek', 'Kontak'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-600 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
