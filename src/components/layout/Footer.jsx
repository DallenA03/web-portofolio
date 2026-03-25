import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => (
  <footer id="kontak" className="bg-black text-white py-20 px-4">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-5xl md:text-7xl font-black mb-8">LETS CONNECT.</h2>
      <p className="text-xl mb-12 opacity-80 max-w-2xl mx-auto">
        Tertarik untuk berkolaborasi atau ingin mengetahui lebih lanjut tentang karya saya? Mari ciptakan sesuatu yang luar biasa bersama.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-6 mb-20">
        <a href="mailto:[EMAIL_ADDRESS]" className="bg-white text-black px-12 py-4 font-black text-xl hover:bg-yellow-300 transition-all flex items-center justify-center gap-3">
          <Mail /> KIRIM EMAIL
        </a>
        <div className="flex justify-center gap-4">
          <a href="https://github.com/DallenA03" className="p-4 border-4 border-white hover:bg-gray-700 transition-colors"><FaGithub size={32} /></a>
          <a href="https://www.linkedin.com/in/francesco-dallen/" className="p-4 border-4 border-white hover:bg-blue-600 transition-colors"><FaLinkedin size={32} /></a>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-50">
        <p>© 2026 FRANCESCO DALLEN. SEMUA HAK DILINDUNGI.</p>
        <p>BUILT WITH NEXT.JS & PIXEL PASSION</p>
      </div>
    </div>
  </footer>
);

export default Footer;
