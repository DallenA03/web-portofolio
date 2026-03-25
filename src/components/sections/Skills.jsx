import { Code2, Cpu, Globe } from 'lucide-react';

const Skills = () => (
  <section className="py-20 bg-white px-4 border-y-4 border-black overflow-hidden relative">
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black text-white"><Code2 /></div>
          <h4 className="text-2xl font-black">LANGUAGES</h4>
        </div>
        <div className="flex flex-wrap gap-3">
          {['PHP', 'Java', 'Python', 'Kotlin', 'Golang', 'C++', 'C#', 'JavaScript', 'TypeScript'].map(skill => (
            <span key={skill} className="px-4 py-2 border-2 border-black font-bold hover:bg-yellow-300 transition-colors cursor-default">{skill}</span>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black text-white"><Cpu /></div>
          <h4 className="text-2xl font-black">FRAMEWORKS</h4>
        </div>
        <div className="flex flex-wrap gap-3">
          {['Laravel', 'Node.js', 'React.js', 'Next.js', 'Flutter', 'Express', 'Bootstrap', 'Material UI', 'Shadcn UI','Tailwind CSS'].map(skill => (
            <span key={skill} className="px-4 py-2 border-2 border-black font-bold hover:bg-blue-400 transition-colors cursor-default">{skill}</span>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black text-white"><Globe /></div>
          <h4 className="text-2xl font-black">AI & TOOLS</h4>
        </div>
        <div className="flex flex-wrap gap-3">
          {['TensorFlow', 'Gemini API', 'MySQL', 'MongoDB', 'Git', 'Figma', 'PostgreSQL', 'Firebase', 'Supabase', 'Docker', 'AWS', 'Postman'].map(skill => (
            <span key={skill} className="px-4 py-2 border-2 border-black font-bold hover:bg-green-400 transition-colors cursor-default">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
