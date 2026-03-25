import { Award } from 'lucide-react';
import PixelCard from '../ui/PixelCard';

const Experience = () => (
  <section id="pengalaman" className="py-20 bg-white px-4 border-b-4 border-black">
    <div className="max-w-6xl mx-auto">
      <h3 className="text-4xl font-black mb-12 flex items-center gap-4">
        <Award size={40} /> PENGALAMAN & ORGANISASI
      </h3>
      <div className="grid gap-8">
        <PixelCard className="flex flex-col md:flex-row justify-between gap-4 border-l-8 border-l-blue-600">
          <div>
            <h4 className="text-2xl font-black">Student Affairs Administration Office Assistant</h4>
            <p className="font-bold text-blue-600">ISTTS • 2023 - Sekarang</p>
            <p className="mt-2 text-gray-700">Develop aplikasi web untuk departemen dan membantu mengelola administrasi departemen.</p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="bg-blue-100 px-3 py-1 rounded-full text-xs font-bold border border-black">Laravel</span>
            <span className="bg-blue-100 px-3 py-1 rounded-full text-xs font-bold border border-black">MySQL</span>
            <span className="bg-blue-100 px-3 py-1 rounded-full text-xs font-bold border border-black">Tailwind CSS</span>
          </div>
        </PixelCard>

        <PixelCard className="flex flex-col md:flex-row justify-between gap-4 border-l-8 border-l-yellow-400">
          <div>
            <h4 className="text-2xl font-black">IEEE Student Branch - Events Division</h4>
            <p className="font-bold text-yellow-600">Organizational Leader • 2023 - Sekarang</p>
            <p className="mt-2 text-gray-700">Mengelola siklus hidup acara teknis internasional dan kolaborasi tim lintas fungsi.</p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="bg-yellow-100 px-3 py-1 rounded-full text-xs font-bold border border-black">Leadership</span>
            <span className="bg-yellow-100 px-3 py-1 rounded-full text-xs font-bold border border-black">Management</span>
          </div>
        </PixelCard>
      </div>
    </div>
  </section>
);

export default Experience;
