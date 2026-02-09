import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useSiteSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data } = await supabase.from('site_settings').select('*');

    const map = {};
    (data || []).forEach((row) => {
      map[row.key] = row.value;
    });
    setSettings(map);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSetting = async (key, value) => {
    if (!supabase) return;
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value }, { onConflict: 'key' });
    if (error) throw error;
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return { settings, loading, updateSetting, refetch: fetchSettings };
}
