import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProjects, useExperiences, useTechStacks, useCategories } from '../hooks/useSupabase';
import {
  LogOut, FolderKanban, Award, Home, LayoutDashboard,
  ExternalLink, Trash2, PenSquare, PlusCircle, X, Save,
  Loader, Layers, Tag
} from 'lucide-react';

// ─── Reusable Inline Modal ────────────────────────────────────────────────
const SimpleModal = ({ title, fields, data, onClose, onSave, saving, error }) => {
  const [form, setForm] = useState(
    fields.reduce((acc, f) => ({ ...acc, [f.key]: data?.[f.key] || '' }), {})
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-md font-mono">
        <div className="flex items-center justify-between px-6 py-4 bg-black text-white border-b-4 border-black">
          <h2 className="font-black tracking-widest text-sm uppercase">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 transition-colors"><X size={18} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="p-6 flex flex-col gap-4">
          {error && <div className="bg-red-100 border-2 border-red-500 px-4 py-2 text-xs font-bold text-red-700">{error}</div>}
          {fields.map(f => (
            <div key={f.key} className="flex flex-col gap-1">
              <label className="text-xs font-black uppercase tracking-widest text-gray-500">{f.label}{f.required && ' *'}</label>
              {f.multiline ? (
                <textarea
                  value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  rows={3}
                  required={f.required}
                  className="border-2 border-black px-3 py-2 text-sm font-medium resize-none focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-[#F5F5F5]"
                />
              ) : (
                <input
                  value={form[f.key]}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  required={f.required}
                  className="border-2 border-black px-3 py-2 text-sm font-medium focus:outline-none focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-[#F5F5F5]"
                />
              )}
            </div>
          ))}
          <div className="flex gap-3 mt-2">
            <button type="submit" disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 font-black text-sm hover:bg-blue-600 transition-colors border-2 border-black disabled:opacity-50">
              {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
              {saving ? 'SAVING...' : 'SAVE'}
            </button>
            <button type="button" onClick={onClose} disabled={saving}
              className="flex-1 py-3 font-black text-sm border-2 border-black hover:bg-gray-100 transition-colors">
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Delete Confirm ───────────────────────────────────────────────────────
const DeleteConfirm = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 max-w-sm w-full font-mono flex flex-col gap-6">
      <h2 className="text-xl font-black">CONFIRM DELETE</h2>
      <p className="text-sm font-bold text-gray-600">{message}</p>
      <div className="flex gap-4">
        <button onClick={onConfirm} className="flex-1 bg-red-500 text-white border-2 border-black font-black py-3 hover:bg-red-600">DELETE</button>
        <button onClick={onCancel} className="flex-1 border-2 border-black font-black py-3 hover:bg-gray-100">CANCEL</button>
      </div>
    </div>
  </div>
);

// ─── Stat Card ────────────────────────────────────────────────────────────
const StatCard = ({ label, value, color }) => (
  <div className={`${color} border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
    <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">{label}</p>
    <p className="text-5xl font-black">{value ?? '…'}</p>
  </div>
);

// ─── Tech Stack Fields ────────────────────────────────────────────────────
const TECH_STACK_FIELDS = [
  { key: 'tech_stack_name', label: 'Tech Stack Name', placeholder: 'e.g. React.js', required: true },
  { key: 'description', label: 'Description', placeholder: 'Short description...', multiline: true },
];

// ─── Category Fields ──────────────────────────────────────────────────────
const CATEGORY_FIELDS = [
  { key: 'categori_name', label: 'Category Name', placeholder: 'e.g. web', required: true },
  { key: 'description', label: 'Description', placeholder: 'Short description...', multiline: true },
];

// ─── Admin Dashboard ──────────────────────────────────────────────────────
const AdminDashboard = () => {
  const { user, signOut } = useAuth();

  const { projects, loading: pLoad, fetchProjects, deleteProject } = useProjects();
  const { experiences, loading: eLoad, fetchExperiences, deleteExperience } = useExperiences();
  const {
    techStacks, loading: tsLoad, fetchTechStacks,
    createTechStack, updateTechStack, deleteTechStack
  } = useTechStacks();
  const {
    categories, loading: catLoad, fetchCategories,
    createCategory, updateCategory, deleteCategory
  } = useCategories();

  const [activeTab, setActiveTab] = useState('overview');
  const [modal, setModal] = useState(null); // { type, mode, data? }
  const [deleteTarget, setDeleteTarget] = useState(null); // { type, id, label }
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchExperiences();
    fetchTechStacks();
    fetchCategories();
  }, [fetchProjects, fetchExperiences, fetchTechStacks, fetchCategories]);

  // ── Save handlers ──────────────────────────────────────────────────────
  const handleSave = async (formData) => {
    setSaving(true);
    setSaveError('');
    let result;

    if (modal.type === 'techstack') {
      result = modal.mode === 'add'
        ? await createTechStack(formData)
        : await updateTechStack(modal.data.id, formData);
    } else if (modal.type === 'category') {
      result = modal.mode === 'add'
        ? await createCategory(formData)
        : await updateCategory(modal.data.id, formData);
    }

    setSaving(false);
    if (result?.error) {
      setSaveError(result.error.message || 'Save failed. Check RLS policies.');
    } else {
      setModal(null);
    }
  };

  // ── Delete handler ────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'project') await deleteProject(deleteTarget.id);
    if (deleteTarget.type === 'experience') await deleteExperience(deleteTarget.id);
    if (deleteTarget.type === 'techstack') await deleteTechStack(deleteTarget.id);
    if (deleteTarget.type === 'category') await deleteCategory(deleteTarget.id);
    setDeleteTarget(null);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={18} /> },
    { id: 'experience', label: 'Experience', icon: <Award size={18} /> },
    { id: 'techstack', label: 'Tech Stack', icon: <Layers size={18} /> },
    { id: 'category', label: 'Category', icon: <Tag size={18} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F0F0F0] font-mono text-black selection:bg-yellow-300">

      {/* Modals */}
      {modal?.type === 'techstack' && (
        <SimpleModal
          title={modal.mode === 'add' ? '+ ADD TECH STACK' : '✏ EDIT TECH STACK'}
          fields={TECH_STACK_FIELDS}
          data={modal.data}
          onClose={() => { setModal(null); setSaveError(''); }}
          onSave={handleSave}
          saving={saving}
          error={saveError}
        />
      )}
      {modal?.type === 'category' && (
        <SimpleModal
          title={modal.mode === 'add' ? '+ ADD CATEGORY' : '✏ EDIT CATEGORY'}
          fields={CATEGORY_FIELDS}
          data={modal.data}
          onClose={() => { setModal(null); setSaveError(''); }}
          onSave={handleSave}
          saving={saving}
          error={saveError}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          message={`Delete "${deleteTarget.label}"? This action may be irreversible for categories.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b-4 md:border-b-0 md:border-r-4 border-black flex flex-col shrink-0">
        <div className="p-6 border-b-4 border-black">
          <h1 className="text-xl font-black tracking-tighter">ADMIN PANEL</h1>
          <p className="text-xs text-gray-500 mt-1 truncate">{user?.email}</p>
          <span className="inline-block mt-2 px-2 py-1 bg-yellow-300 border-2 border-black text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            AUTHENTICATED
          </span>
        </div>
        <nav className="p-4 flex flex-col gap-1 flex-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 w-full p-3 border-2 font-bold transition-all text-left text-sm ${
                activeTab === tab.id ? 'bg-black text-white border-black' : 'border-transparent hover:border-black hover:bg-yellow-300'
              }`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t-4 border-black flex flex-col gap-1">
          <Link to="/" className="flex items-center gap-2 p-3 font-bold border-2 border-transparent hover:border-black hover:bg-gray-100 transition-all text-sm">
            <Home size={18} /> View Portfolio
          </Link>
          <button onClick={signOut} className="flex items-center gap-2 p-3 font-bold text-red-600 border-2 border-transparent hover:border-red-500 hover:bg-red-50 transition-all text-sm">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">

        {/* ── Overview ── */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl md:text-4xl font-black border-b-4 border-black pb-4">DASHBOARD OVERVIEW</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Projects" value={pLoad ? '…' : projects.length} color="bg-blue-300" />
              <StatCard label="Experiences" value={eLoad ? '…' : experiences.length} color="bg-yellow-300" />
              <StatCard label="Tech Stacks" value={tsLoad ? '…' : techStacks.length} color="bg-green-300" />
              <StatCard label="Categories" value={catLoad ? '…' : categories.length} color="bg-pink-300" />
            </div>
            <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-black text-lg mb-4 uppercase tracking-widest">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Add Project', tab: 'projects', icon: <FolderKanban size={16} /> },
                  { label: 'Add Experience', tab: 'experience', icon: <Award size={16} /> },
                  { label: 'Add Tech Stack', tab: 'techstack', icon: <Layers size={16} /> },
                  { label: 'Add Category', tab: 'category', icon: <Tag size={16} /> },
                ].map(a => (
                  <button key={a.tab} onClick={() => setActiveTab(a.tab)}
                    className="flex items-center gap-2 px-5 py-3 bg-black text-white font-bold text-xs border-2 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                    {a.icon} {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Projects ── */}
        {activeTab === 'projects' && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center border-b-4 border-black pb-4">
              <h2 className="text-3xl font-black">PROJECTS ({projects.length})</h2>
            </div>
            {pLoad ? <p className="font-bold text-gray-500 animate-pulse">Loading...</p> : (
              <div className="flex flex-col gap-4">
                {projects.map(p => (
                  <div key={p.id} className="bg-white border-4 border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-black text-white bg-black px-2 py-1">#{p.id}</span>
                        <h3 className="text-xl font-black truncate">{p.project_name}</h3>
                        {p.category && <span className="text-xs font-bold bg-blue-100 border border-black px-2 py-1">{p.category.categori_name}</span>}
                      </div>
                      <p className="text-sm text-gray-600 font-medium line-clamp-2">{p.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.project_tech_stack?.map(ts => (
                          <span key={ts.tech_stack.id} className="text-xs font-bold border border-black px-2 py-1 bg-[#F0F0F0] w-fit">
                            {ts.tech_stack.tech_stack_name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {p.link_verified && <a href={p.link_verified} target="_blank" rel="noreferrer" className="p-2 border-2 border-black hover:bg-yellow-300 transition-colors"><ExternalLink size={18} /></a>}
                      <button onClick={() => setDeleteTarget({ type: 'project', id: p.id, label: p.project_name })} className="p-2 border-2 border-black hover:bg-red-200 transition-colors text-red-600"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && <div className="border-2 border-dashed border-black p-12 text-center text-gray-400 font-bold">No projects yet.</div>}
              </div>
            )}
          </div>
        )}

        {/* ── Experience ── */}
        {activeTab === 'experience' && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center border-b-4 border-black pb-4">
              <h2 className="text-3xl font-black">EXPERIENCE ({experiences.length})</h2>
            </div>
            {eLoad ? <p className="font-bold text-gray-500 animate-pulse">Loading...</p> : (
              <div className="flex flex-col gap-4">
                {experiences.map(exp => (
                  <div key={exp.id} className={`bg-white border-4 border-black border-l-8 ${exp.border_color || 'border-l-blue-600'} p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-start gap-4`}>
                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-black text-white bg-black px-2 py-1">#{exp.id}</span>
                        <h3 className="text-xl font-black">{exp.experience_name}</h3>
                      </div>
                      <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">{exp.company_name} • {exp.periode_job ? new Date(exp.periode_job).getFullYear() : ''}</p>
                      <p className="text-sm text-gray-600 font-medium line-clamp-2">{exp.description}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => setDeleteTarget({ type: 'experience', id: exp.id, label: exp.experience_name })} className="p-2 border-2 border-black hover:bg-red-200 transition-colors text-red-600"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
                {experiences.length === 0 && <div className="border-2 border-dashed border-black p-12 text-center text-gray-400 font-bold">No experiences yet.</div>}
              </div>
            )}
          </div>
        )}

        {/* ── Tech Stack ── */}
        {activeTab === 'techstack' && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center border-b-4 border-black pb-4">
              <h2 className="text-3xl font-black">TECH STACK ({techStacks.length})</h2>
              <button onClick={() => { setSaveError(''); setModal({ type: 'techstack', mode: 'add' }); }}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold text-sm border-2 border-black hover:bg-blue-600 transition-colors">
                <PlusCircle size={18} /> ADD TECH STACK
              </button>
            </div>
            {tsLoad ? <p className="font-bold text-gray-500 animate-pulse">Loading...</p> : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {techStacks.map(ts => (
                  <div key={ts.id} className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black bg-black text-white px-2 py-1">#{ts.id}</span>
                        <h4 className="font-black text-lg">{ts.tech_stack_name}</h4>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button
                          onClick={() => { setSaveError(''); setModal({ type: 'techstack', mode: 'edit', data: ts }); }}
                          className="p-2 border-2 border-black hover:bg-blue-200 transition-colors" title="Edit">
                          <PenSquare size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget({ type: 'techstack', id: ts.id, label: ts.tech_stack_name })}
                          className="p-2 border-2 border-black hover:bg-red-200 transition-colors text-red-600" title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    {ts.description && <p className="text-xs font-medium text-gray-500 line-clamp-2">{ts.description}</p>}
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Added {new Date(ts.created_at).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                ))}
                {techStacks.length === 0 && (
                  <div className="col-span-3 border-2 border-dashed border-black p-12 text-center text-gray-400 font-bold">
                    No tech stacks yet. Click "+ ADD TECH STACK" to begin.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Category ── */}
        {activeTab === 'category' && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center border-b-4 border-black pb-4">
              <h2 className="text-3xl font-black">CATEGORIES ({categories.length})</h2>
              <button onClick={() => { setSaveError(''); setModal({ type: 'category', mode: 'add' }); }}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold text-sm border-2 border-black hover:bg-blue-600 transition-colors">
                <PlusCircle size={18} /> ADD CATEGORY
              </button>
            </div>
            {catLoad ? <p className="font-bold text-gray-500 animate-pulse">Loading...</p> : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map(cat => (
                  <div key={cat.id} className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black bg-black text-white px-2 py-1">#{cat.id}</span>
                        <h4 className="font-black text-lg capitalize">{cat.categori_name}</h4>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button
                          onClick={() => { setSaveError(''); setModal({ type: 'category', mode: 'edit', data: cat }); }}
                          className="p-2 border-2 border-black hover:bg-blue-200 transition-colors" title="Edit">
                          <PenSquare size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget({ type: 'category', id: cat.id, label: cat.categori_name })}
                          className="p-2 border-2 border-black hover:bg-red-200 transition-colors text-red-600" title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    {cat.description && <p className="text-xs font-medium text-gray-500 line-clamp-2">{cat.description}</p>}
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Added {new Date(cat.created_at).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                ))}
                {categories.length === 0 && (
                  <div className="col-span-3 border-2 border-dashed border-black p-12 text-center text-gray-400 font-bold">
                    No categories yet. Click "+ ADD CATEGORY" to begin.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
