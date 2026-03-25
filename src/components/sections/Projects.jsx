import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Plus, Pencil, Trash2, X, Save, Loader, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import PixelCard from '../ui/PixelCard';
import { useAuth } from '../../hooks/useAuth';
import { useProjects, useTechStacks, useCategories } from '../../hooks/useSupabase';
import { supabase } from '../../lib/supabase';

// ─── Helpers ────────────────────────────────────────────────────────────────
const parseFeatures = (val) => {
  if (Array.isArray(val)) return val.join('\n');
  if (typeof val === 'string') return val;
  return '';
};

const COLORS = [
  { label: 'Blue', value: 'bg-blue-400' },
  { label: 'Purple', value: 'bg-purple-400' },
  { label: 'Green', value: 'bg-green-400' },
  { label: 'Red', value: 'bg-red-400' },
  { label: 'Yellow', value: 'bg-yellow-400' },
  { label: 'Pink', value: 'bg-pink-400' },
];

// ─── Modal Form ─────────────────────────────────────────────────────────────
const ProjectModal = ({ mode, data, techStacks, categories, onClose, onSave, saving }) => {
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    project_name: data?.project_name || '',
    description: data?.description || '',
    color: data?.color || 'bg-blue-400',
    features: parseFeatures(data?.features),
    link_verified: data?.link_verified || '',
    img_link: data?.img_link || '',
    category_id: data?.category?.id || data?.category_id || '',
    tech_stack_ids: data?.project_tech_stack ? data.project_tech_stack.map(ts => ts.tech_stack.id) : [],
  });

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fileName = `projects/${Date.now()}_${file.name.replace(/\s/g, '_')}`;
    const { data: uploaded, error } = await supabase.storage.from('portfolio').upload(fileName, file, { upsert: true });
    if (!error) {
      const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(fileName);
      set('img_link', urlData.publicUrl);
    }
    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      features: form.features.split('\n').map(f => f.trim()).filter(Boolean),
      category_id: form.category_id ? Number(form.category_id) : null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-lg font-mono max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 bg-black text-white border-b-4 border-black shrink-0">
          <h2 className="font-black tracking-widest text-sm uppercase">
            {mode === 'add' ? '+ ADD PROJECT' : '✏ EDIT PROJECT'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 transition-colors"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">

          {/* project_name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Project Name *</label>
            <input value={form.project_name} onChange={e => set('project_name', e.target.value)} placeholder="e.g. Quizify" required className="border-2 border-black px-3 py-2 text-sm font-medium focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:border-blue-500 transition-all bg-[#F5F5F5]" />
          </div>

          {/* category_id */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Category *</label>
            <select value={form.category_id} onChange={e => set('category_id', e.target.value)} required className="border-2 border-black px-3 py-2 text-sm font-medium focus:outline-none bg-[#F5F5F5]">
              <option value="">-- Select Category --</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.categori_name}</option>
              ))}
            </select>
          </div>

          {/* tech_stack_ids */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Tech Stack (Select multiple)</label>
            <div className="flex flex-wrap gap-2">
              {techStacks.map(ts => {
                const isSelected = form.tech_stack_ids.includes(ts.id);
                return (
                  <button
                    key={ts.id}
                    type="button"
                    onClick={() => {
                      set('tech_stack_ids', isSelected 
                        ? form.tech_stack_ids.filter(id => id !== ts.id)
                        : [...form.tech_stack_ids, ts.id]
                      );
                    }}
                    className={`px-3 py-1 text-xs font-bold border-2 border-black transition-all ${isSelected ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                  >
                    {ts.tech_stack_name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* description */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Description *</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Short project description..." rows={3} required className="border-2 border-black px-3 py-2 text-sm font-medium resize-none focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:border-blue-500 transition-all bg-[#F5F5F5]" />
          </div>

          {/* features */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Features / Key Points (one per line)</label>
            <textarea value={form.features} onChange={e => set('features', e.target.value)} placeholder={"AI-powered quiz generation\nPayment gateway integration"} rows={4} className="border-2 border-black px-3 py-2 text-sm font-medium resize-none focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:border-blue-500 transition-all bg-[#F5F5F5]" />
          </div>

          {/* link_verified */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Live Link / GitHub URL</label>
            <input value={form.link_verified} onChange={e => set('link_verified', e.target.value)} placeholder="https://github.com/..." type="url" className="border-2 border-black px-3 py-2 text-sm font-medium focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:border-blue-500 transition-all bg-[#F5F5F5]" />
          </div>

          {/* img_link / upload */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Project Image</label>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
              className="flex items-center justify-center gap-2 border-2 border-dashed border-black py-3 text-sm font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50">
              {uploading ? <Loader size={16} className="animate-spin" /> : <Upload size={16} />}
              {uploading ? 'UPLOADING...' : 'UPLOAD IMAGE'}
            </button>
            {form.img_link && (
              <div className="relative border-2 border-black">
                <img src={form.img_link} alt="Preview" className="w-full h-32 object-cover" />
                <button type="button" onClick={() => set('img_link', '')} className="absolute top-1 right-1 bg-white border-2 border-black p-1 hover:bg-red-200">
                  <X size={12} />
                </button>
              </div>
            )}
          </div>

          {/* color */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Card Color</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map(c => (
                <button type="button" key={c.value} onClick={() => set('color', c.value)}
                  className={`${c.value} w-10 h-10 border-2 ${form.color === c.value ? 'border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] scale-110' : 'border-gray-300'} transition-all`}
                  title={c.label} />
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-2 shrink-0">
            <button type="submit" disabled={saving || uploading} className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 font-black text-sm hover:bg-blue-600 transition-colors border-2 border-black disabled:opacity-50">
              {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? 'SAVING...' : 'SAVE'}
            </button>
            <button type="button" onClick={onClose} disabled={saving} className="flex-1 py-3 font-black text-sm border-2 border-black hover:bg-gray-100 transition-colors">
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Delete Confirm ─────────────────────────────────────────────────────────
const DeleteConfirm = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 max-w-sm w-full font-mono flex flex-col gap-6">
      <h2 className="text-xl font-black">DELETE PROJECT?</h2>
      <p className="text-sm font-bold text-gray-600">This will soft-delete the project (restorable from Supabase).</p>
      <div className="flex gap-4">
        <button onClick={onConfirm} className="flex-1 bg-red-500 text-white border-2 border-black font-black py-3 hover:bg-red-600">DELETE</button>
        <button onClick={onCancel} className="flex-1 border-2 border-black font-black py-3 hover:bg-gray-100">CANCEL</button>
      </div>
    </div>
  </div>
);

// ─── Projects Section ────────────────────────────────────────────────────────
const Projects = () => {
  const { user } = useAuth();
  const isAdmin = !!user;

  const { projects, loading, fetchProjects, createProject, updateProject, deleteProject } = useProjects();
  const { techStacks, fetchTechStacks } = useTechStacks();
  const { categories, fetchCategories } = useCategories();

  const [activeTab, setActiveTab] = useState('all');
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
    if (isAdmin) { fetchTechStacks(); fetchCategories(); }
  }, [fetchProjects, fetchTechStacks, fetchCategories, isAdmin]);

  const filtered = activeTab === 'all'
    ? projects
    : projects.filter(p => p.category?.categori_name?.toLowerCase() === activeTab);

  const handleSave = async (formData) => {
    setSaving(true);
    setError('');
    let result;
    if (modal.mode === 'add') {
      result = await createProject(formData);
    } else {
      result = await updateProject(modal.data.id, formData);
    }
    setSaving(false);
    if (result.error) {
      setError(result.error.message || 'Failed to save. Check Supabase RLS policies.');
    } else {
      setModal(null);
    }
  };

  const handleDelete = async () => {
    await deleteProject(deleteTarget);
    setDeleteTarget(null);
  };

  return (
    <>
      {modal && (
        <ProjectModal
          mode={modal.mode}
          data={modal.data}
          techStacks={techStacks}
          categories={categories}
          onClose={() => { setModal(null); setError(''); }}
          onSave={handleSave}
          saving={saving}
        />
      )}
      {deleteTarget && <DeleteConfirm onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}

      <section id="proyek" className="py-20 px-4 bg-[#F0F0F0]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-4">
                <h3 className="text-3xl md:text-4xl font-black break-words">SELECTED PROJECTS</h3>
                {isAdmin && (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-black bg-yellow-300 border-2 border-black px-2 py-1 hidden sm:block">ADMIN</span>
                    <button onClick={() => setModal({ mode: 'add' })} title="Add Project"
                      className="p-2 border-2 border-black bg-white hover:bg-yellow-300 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
                      <Plus size={20} strokeWidth={3} />
                    </button>
                  </div>
                )}
              </div>
              <p className="font-bold text-gray-600 uppercase tracking-widest text-sm md:text-base mt-2">Here are some of my best projects</p>
            </div>
            <div className="flex flex-wrap gap-2 bg-white border-4 border-black p-1">
              {['all', 'web', 'mobile'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 font-black uppercase transition-all ${activeTab === tab ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {error && <div className="mb-6 bg-red-100 border-2 border-red-500 px-4 py-3 text-sm font-bold text-red-700">{error}</div>}

          {loading ? (
            <div className="flex items-center gap-3 font-bold text-gray-500 py-12">
              <Loader size={20} className="animate-spin" /> Loading from Supabase...
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project) => (
                <div key={project.id} className="relative group/card h-full">
                  <Link to={`/project/${project.id}`} className="block h-full group">
                    <PixelCard className="h-full flex flex-col hover:-translate-y-2 transition-transform cursor-pointer">
                      <div className={`w-full h-48 border-2 border-black mb-4 ${project.color || 'bg-blue-400'} flex items-center justify-center p-4 relative overflow-hidden`}>
                        {project.img_link ? (
                          <img src={project.img_link} alt={project.project_name} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                        ) : null}
                        <div className="relative bg-white border-2 border-black p-4 font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center break-words z-10">
                          {project.project_name}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-black text-white p-2 z-10">
                          <ExternalLink size={20} />
                        </div>
                      </div>
                      <h4 className="text-xl font-black mb-2 uppercase group-hover:underline decoration-4 underline-offset-4 tracking-tight">
                        {project.project_name}
                      </h4>
                      <p className="text-sm font-bold text-gray-700 flex-grow mb-4 leading-snug">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.category && (
                          <span className="text-[10px] uppercase font-black px-2 py-1 bg-blue-100 border border-black">
                            {project.category.categori_name}
                          </span>
                        )}
                        {project.project_tech_stack?.map(ts => (
                          <span key={ts.tech_stack.id} className="text-[10px] uppercase font-black px-2 py-1 bg-gray-100 border border-black">
                            #{ts.tech_stack.tech_stack_name}
                          </span>
                        ))}
                      </div>
                    </PixelCard>
                  </Link>

                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity z-10">
                      <button onClick={(e) => { e.preventDefault(); setModal({ mode: 'edit', data: project }); }} title="Edit"
                        className="p-2 bg-white border-2 border-black hover:bg-blue-200 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                        <Pencil size={14} strokeWidth={3} />
                      </button>
                      <button onClick={(e) => { e.preventDefault(); setDeleteTarget(project.id); }} title="Delete"
                        className="p-2 bg-white border-2 border-black hover:bg-red-200 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-red-600">
                        <Trash2 size={14} strokeWidth={3} />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {filtered.length === 0 && !loading && (
                <div className="col-span-3 border-2 border-dashed border-black p-12 text-center text-gray-500 font-bold">
                  No projects found.{isAdmin && ' Click + to add one.'}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Projects;
