import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

// ─── Projects ──────────────────────────────────────────────────────────────

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('projects')
      .select(`
        id,
        project_name,
        description,
        color,
        features,
        link_verified,
        img_link,
        deleted_at,
        category:category_id ( id, categori_name ),
        project_tech_stack ( tech_stack ( id, tech_stack_name ) )
      `)
      .is('deleted_at', null)
      .order('id');
    if (error) setError(error.message);
    else setProjects(data);
    setLoading(false);
  }, []);

  const createProject = async (payload) => {
    const { tech_stack_ids, ...projPayload } = payload;
    const { data, error } = await supabase.from('projects').insert([projPayload]).select().single();
    if (!error && tech_stack_ids?.length) {
      await supabase.from('project_tech_stack').insert(
        tech_stack_ids.map(id => ({ project_id: data.id, tech_stack_id: id }))
      );
    }
    await fetchProjects();
    return { data, error };
  };

  const updateProject = async (id, payload) => {
    const { tech_stack_ids, ...projPayload } = payload;
    const { data, error } = await supabase.from('projects').update(projPayload).eq('id', id).select().single();
    if (!error && tech_stack_ids) {
      await supabase.from('project_tech_stack').delete().eq('project_id', id);
      if (tech_stack_ids.length > 0) {
        await supabase.from('project_tech_stack').insert(
          tech_stack_ids.map(ts_id => ({ project_id: id, tech_stack_id: ts_id }))
        );
      }
    }
    await fetchProjects();
    return { data, error };
  };

  const deleteProject = async (id) => {
    const { error } = await supabase.from('projects').update({ deleted_at: new Date().toISOString() }).eq('id', id);
    if (!error) await fetchProjects();
    return { error };
  };

  return { projects, loading, error, fetchProjects, createProject, updateProject, deleteProject };
};

// ─── Experiences ───────────────────────────────────────────────────────────

export const useExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('experience')
      .select(`
        id,
        experience_name,
        company_name,
        start_periode,
        end_periode,
        current_work,
        description,
        border_color,
        tag_color,
        features,
        deleted_at,
        experience_tech_stack ( tech_stack ( id, tech_stack_name ) )
      `)
      .is('deleted_at', null)
      .order('id');
    if (error) setError(error.message);
    else setExperiences(data);
    setLoading(false);
  }, []);

  const createExperience = async (payload) => {
    const { tech_stack_ids, ...expPayload } = payload;
    const { data, error } = await supabase.from('experience').insert([expPayload]).select().single();
    if (!error && tech_stack_ids?.length) {
      await supabase.from('experience_tech_stack').insert(
        tech_stack_ids.map(id => ({ experience_id: data.id, tech_stack_id: id }))
      );
    }
    await fetchExperiences();
    return { data, error };
  };

  const updateExperience = async (id, payload) => {
    const { tech_stack_ids, ...expPayload } = payload;
    const { data, error } = await supabase.from('experience').update(expPayload).eq('id', id).select().single();
    if (!error && tech_stack_ids) {
      await supabase.from('experience_tech_stack').delete().eq('experience_id', id);
      if (tech_stack_ids.length > 0) {
        await supabase.from('experience_tech_stack').insert(
          tech_stack_ids.map(ts_id => ({ experience_id: id, tech_stack_id: ts_id }))
        );
      }
    }
    await fetchExperiences();
    return { data, error };
  };

  const deleteExperience = async (id) => {
    const { error } = await supabase.from('experience').update({ deleted_at: new Date().toISOString() }).eq('id', id);
    if (!error) await fetchExperiences();
    return { error };
  };

  return { experiences, loading, error, fetchExperiences, createExperience, updateExperience, deleteExperience };
};

// ─── Tech Stack ──────────────────────────────────────────────────────────────

export const useTechStacks = () => {
  const [techStacks, setTechStacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTechStacks = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('tech_stack').select('*').is('deleted_at', null).order('tech_stack_name');
    setTechStacks(data ?? []);
    setLoading(false);
  }, []);

  const createTechStack = async (payload) => {
    const { data, error } = await supabase.from('tech_stack').insert([payload]).select();
    if (error) console.error('[createTechStack]', error);
    else await fetchTechStacks();
    return { data, error };
  };

  const updateTechStack = async (id, payload) => {
    const { data, error } = await supabase
      .from('tech_stack')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();
    if (error) console.error('[updateTechStack]', error);
    else await fetchTechStacks();
    return { data, error };
  };

  const deleteTechStack = async (id) => {
    const { error } = await supabase
      .from('tech_stack')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);
    if (!error) await fetchTechStacks();
    return { error };
  };

  return { techStacks, loading, fetchTechStacks, createTechStack, updateTechStack, deleteTechStack };
};

// ─── Categories ────────────────────────────────────────────────────────────

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('category').select('*').order('categori_name');
    setCategories(data ?? []);
    setLoading(false);
  }, []);

  const createCategory = async (payload) => {
    const { data, error } = await supabase.from('category').insert([payload]).select();
    if (error) console.error('[createCategory]', error);
    else await fetchCategories();
    return { data, error };
  };

  const updateCategory = async (id, payload) => {
    const { data, error } = await supabase
      .from('category')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();
    if (error) console.error('[updateCategory]', error);
    else await fetchCategories();
    return { data, error };
  };

  const deleteCategory = async (id) => {
    const { error } = await supabase.from('category').delete().eq('id', id);
    if (!error) await fetchCategories();
    return { error };
  };

  return { categories, loading, fetchCategories, createCategory, updateCategory, deleteCategory };
};
