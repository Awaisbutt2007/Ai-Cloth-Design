import { supabase } from './supabaseClient';

export async function recordDesignDownload({ userId, designId, designTitle }) {
  if (!userId) return;

  const { error } = await supabase.from('download_events').insert({
    user_id: userId,
    design_id: String(designId || '').slice(0, 200) || null,
    design_title: String(designTitle || 'Untitled design').slice(0, 160),
  });

  if (error) console.warn('Design download could not be recorded:', error.message);
}
