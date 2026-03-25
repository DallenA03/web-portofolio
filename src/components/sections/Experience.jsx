import { useState, useEffect } from 'react';
import { Award, Plus, Pencil, Trash2, X, Save, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import PixelCard from '../ui/PixelCard';
import { useAuth } from '../../hooks/useAuth';
import { useExperiences, useTechStacks } from '../../hooks/useSupabase';

// ─── Helpers ────────────────────────────────────────────────────────────────
const parseFeatures = (val) => {
  if (Array.isArray(val)) return val.join('\n');
  if (typeof val === 'string') return val;
  return '';
};

// ─── Modal Form ─────────────────────────────────────────────────────────────
const ExperienceModal = ({ mode, data, techStacks, onClose, onSave, saving }) => {
  const [form, setForm] = useState({
    experience_name: data?.experience_name || '',
    company_name:    data?.company_name    || '',
    start_periode:   data?.start_periode   ? data.start_periode.split('T')[0] : '',
    end_periode:     data?.end_periode     ? data.end_periode.split('T')[0]   : '',
    current_work:    data?.current_work    ?? false,
    description:     data?.description     || '',
    border_color:    data?.border_color    || 'border-l-blue-600',
    tag_color:       data?.tag_color       || 'bg-blue-100',
    features:        parseFeatures(data?.features),
    tech_stack_ids:  data?.experience_tech_stack ? data.experience_tech_stack.map(ts => ts.tech_stack.id) : [],
  });

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      features: form.features.split('\n').map(f => f.trim()).filter(Boolean),
      end_periode: form.current_work ? null : form.end_periode || null,
    };
    onSave(payload);
  };

  const borderColors = [
    { label: 'Blue', border: 'border-l-blue-600', tag: 'bg-blue-100' },
    { label: 'Yellow', border: 'border-l-yellow-400', tag: 'bg-yellow-100' },
    { label: 'Green', border: 'border-l-green-500', tag: 'bg-green-100' },
    { label: 'Red', border: 'border-l-red-500', tag: 'bg-red-100' },
    { label: 'Purple', border: 'border-l-purple-500', tag: 'bg-purple-100' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-lg font-mono max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 bg-black text-white border-b-4 border-black shrink-0">
          <h2 className="font-black tracking-widest text-sm uppercase">
            {mode === 'add' ? '+ ADD EXPERIENCE' : '✏ EDIT EXPERIENCE'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 transition-colors"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">
          {/* experience_name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Position / Experience Name *</label>
            <input value={form.experience_name} onChange={e => set('experience_name', e.target.value)} placeholder="e.g. Software Engineer Intern" required className="border-2 border-black px-3 py-2 text-sm font-medium focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:border-blue-500 transition-all bg-[#F5F5F5]" />
          </div>

          {/* company_name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Company / Organization *</label>
            <input value={form.company_name} onChange={e => set('company_name', e.target.value)} placeholder="e.g. ISTTS" required className="border-2 border-black px-3 py-2 text-sm font-medium focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:border-blue-500 transition-all bg-[#F5F5F5]" />
          </div>

          {/* start_periode */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Start Date *</label>
            <input
              type="date"
              value={form.start_periode}
              onChange={e => set('start_periode', e.target.value)}
              required
              className="border-2 border-black px-3 py-2 text-sm font-medium focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:border-blue-500 transition-all bg-[#F5F5F5]"
            />
          </div>

          {/* current_work toggle */}
          <div className="flex items-center gap-3 p-3 border-2 border-black bg-[#F5F5F5]">
            <input
              id="current_work"
              type="checkbox"
              checked={form.current_work}
              onChange={e => set('current_work', e.target.checked)}
              className="w-5 h-5 border-2 border-black accent-black cursor-pointer"
            />
            <label htmlFor="current_work" className="text-sm font-black uppercase tracking-widest cursor-pointer select-none">
              Still working here (Current Job)
            </label>
          </div>

          {/* end_periode — hidden when current_work is true */}
          {!form.current_work && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-black uppercase tracking-widest text-gray-500">End Date *</label>
              <input
                type="date"
                value={form.end_periode}
                onChange={e => set('end_periode', e.target.value)}
                required
                min={form.start_periode}
                className="border-2 border-black px-3 py-2 text-sm font-medium focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:border-blue-500 transition-all bg-[#F5F5F5]"
              />
            </div>
          )}

          {/* description */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Description *</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Short summary of your role..." rows={3} required className="border-2 border-black px-3 py-2 text-sm font-medium resize-none focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:border-blue-500 transition-all bg-[#F5F5F5]" />
          </div>

          {/* features */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Features / Responsibilities (one per line)</label>
            <textarea value={form.features} onChange={e => set('features', e.target.value)} placeholder={"Developed web app for department\nHelped manage admin workflows"} rows={4} className="border-2 border-black px-3 py-2 text-sm font-medium resize-none focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:border-blue-500 transition-all bg-[#F5F5F5]" />
          </div>

          {/* tech_stack_ids multiselect */}
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

          {/* border_color + tag_color */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500">Accent Color</label>
            <div className="flex flex-wrap gap-3">
              {borderColors.map(c => (
                <button type="button" key={c.border} onClick={() => { set('border_color', c.border); set('tag_color', c.tag); }}
                  className={`flex flex-col items-center gap-1 p-2 border-2 ${form.border_color === c.border ? 'border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' : 'border-gray-300'} transition-all`}>
                  <div className={`w-8 h-8 border-l-4 ${c.border} ${c.tag}`} />
                  <span className="text-[9px] font-black uppercase">{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-2 shrink-0">
            <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 font-black text-sm hover:bg-blue-600 transition-colors border-2 border-black disabled:opacity-50">
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
      <h2 className="text-xl font-black">DELETE EXPERIENCE?</h2>
      <p className="text-sm font-bold text-gray-600">This entry will be soft-deleted (restorable from Supabase dashboard).</p>
      <div className="flex gap-4">
        <button onClick={onConfirm} className="flex-1 bg-red-500 text-white border-2 border-black font-black py-3 hover:bg-red-600">DELETE</button>
        <button onClick={onCancel} className="flex-1 border-2 border-black font-black py-3 hover:bg-gray-100">CANCEL</button>
      </div>
    </div>
  </div>
);

// ─── Experience Section ──────────────────────────────────────────────────────
const Experience = () => {
  const { user } = useAuth();
  const isAdmin = !!user;

  const { experiences, loading, fetchExperiences, createExperience, updateExperience, deleteExperience } = useExperiences();
  const { techStacks, fetchTechStacks } = useTechStacks();

  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExperiences();
    if (isAdmin) fetchTechStacks();
  }, [fetchExperiences, fetchTechStacks, isAdmin]);

  const handleSave = async (formData) => {
    setSaving(true);
    setError('');
    let result;
    if (modal.mode === 'add') {
      result = await createExperience(formData);
    } else {
      result = await updateExperience(modal.data.id, formData);
    }
    setSaving(false);
    if (result.error) {
      setError(result.error.message || 'Failed to save. Check Supabase RLS policies.');
    } else {
      setModal(null);
    }
  };

  const handleDelete = async () => {
    await deleteExperience(deleteTarget);
    setDeleteTarget(null);
  };

  // Map Supabase data to display format
  const formatPeriod = (exp) => {
    const fmt = (d) => d ? new Date(d).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' }) : '';
    const start = fmt(exp.start_periode);
    const end   = exp.current_work ? 'Sekarang' : fmt(exp.end_periode);
    return start && end ? `${start} – ${end}` : start || end || '';
  };

  const mapExp = (exp) => ({
    ...exp,
    title:   exp.experience_name,
    company: exp.company_name,
    period:  formatPeriod(exp),
    desc:    exp.description,
    color:   exp.border_color || 'border-l-blue-600',
    bgColor: exp.tag_color    || 'bg-blue-100',
    tags:    exp.experience_tech_stack ? exp.experience_tech_stack.map(ts => ts.tech_stack.tech_stack_name) : [],
  });

  return (
    <>
      {modal && (
        <ExperienceModal
          mode={modal.mode}
          data={modal.data}
          techStacks={techStacks}
          onClose={() => { setModal(null); setError(''); }}
          onSave={handleSave}
          saving={saving}
        />
      )}
      {deleteTarget && <DeleteConfirm onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}

      <section id="pengalaman" className="py-20 bg-white px-4 border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12 gap-4">
            <h3 className="text-3xl md:text-4xl font-black flex items-center gap-4 break-words">
              <Award className="shrink-0" size={40} /> EXPERIENCE & ORGANIZATION
            </h3>
            {isAdmin && (
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-black bg-yellow-300 border-2 border-black px-2 py-1 hidden sm:block">ADMIN</span>
                <button onClick={() => setModal({ mode: 'add' })} title="Add Experience"
                  className="p-2 border-2 border-black bg-white hover:bg-yellow-300 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <Plus size={20} strokeWidth={3} />
                </button>
              </div>
            )}
          </div>

          {error && <div className="mb-6 bg-red-100 border-2 border-red-500 px-4 py-3 text-sm font-bold text-red-700">{error}</div>}

          {loading ? (
            <div className="flex items-center gap-3 font-bold text-gray-500 py-12">
              <Loader size={20} className="animate-spin" /> Loading from Supabase...
            </div>
          ) : (
            <div className="grid gap-8">
              {experiences.map((exp) => {
                const display = mapExp(exp);
                return (
                  <div key={exp.id} className="relative group/item">
                    <Link to={`/experience/${exp.id}`} className="block group">
                      <PixelCard className={`flex flex-col md:flex-row justify-between gap-4 border-l-8 ${display.color} hover:bg-gray-50 transition-colors cursor-pointer`}>
                        <div>
                          <h4 className="text-2xl font-black group-hover:underline decoration-4 underline-offset-4 tracking-tight">{display.title}</h4>
                          <p className={`font-bold uppercase tracking-widest text-sm ${display.color.replace('border-l-', 'text-')}`}>
                            {display.company} • {display.period}
                          </p>
                          <p className="mt-2 text-gray-700">{display.desc}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          {display.tags.map(tag => (
                            <span key={tag} className={`${display.bgColor} px-3 py-1 rounded-full text-xs font-bold border border-black`}>{tag}</span>
                          ))}
                        </div>
                      </PixelCard>
                    </Link>

                    {isAdmin && (
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity z-10">
                        <button onClick={(e) => { e.preventDefault(); setModal({ mode: 'edit', data: exp }); }} title="Edit"
                          className="p-2 bg-white border-2 border-black hover:bg-blue-200 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                          <Pencil size={14} strokeWidth={3} />
                        </button>
                        <button onClick={(e) => { e.preventDefault(); setDeleteTarget(exp.id); }} title="Delete"
                          className="p-2 bg-white border-2 border-black hover:bg-red-200 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-red-600">
                          <Trash2 size={14} strokeWidth={3} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {experiences.length === 0 && !loading && (
                <div className="border-2 border-dashed border-black p-12 text-center text-gray-500 font-bold">
                  No experience data yet.{isAdmin && ' Click + to add one.'}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Experience;
