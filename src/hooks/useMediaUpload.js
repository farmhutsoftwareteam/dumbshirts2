import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useMediaUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = useCallback(async (file, dropNumber, slot) => {
    if (!supabase) throw new Error('Supabase not configured');

    setUploading(true);
    setProgress(0);

    const ext = file.name.split('.').pop();
    const path = `${dropNumber}/${slot}.${ext}`;

    // Remove existing file at this path (ignore errors if not found)
    await supabase.storage.from('product-media').remove([path]);

    setProgress(30);

    const { data, error } = await supabase.storage
      .from('product-media')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      setUploading(false);
      setProgress(0);
      throw error;
    }

    setProgress(90);

    const { data: urlData } = supabase.storage
      .from('product-media')
      .getPublicUrl(data.path);

    setProgress(100);
    setUploading(false);

    return urlData.publicUrl;
  }, []);

  const remove = useCallback(async (path) => {
    if (!supabase) return;
    await supabase.storage.from('product-media').remove([path]);
  }, []);

  return { upload, remove, uploading, progress };
}
