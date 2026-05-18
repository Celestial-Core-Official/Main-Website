import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { getCachedData, setCachedData } from '../lib/cache';

/**
 * React hook for fetching and caching site settings from Supabase
 * @returns {Object} { settings, loading, error }
 */
export function useSiteSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Check cache first
        const cachedSettings = getCachedData('site_settings');
        if (cachedSettings) {
          setSettings(cachedSettings);
          setLoading(false);
          return;
        }

        // Fetch from Supabase
        const { data, error: supabaseError } = await supabase
          .from('site_settings')
          .select('key, value');

        if (supabaseError) {
          throw supabaseError;
        }

        // Convert array to object {key: value}
        const settingsObject = data.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {});

        // Cache and set state
        setCachedData('site_settings', settingsObject);
        setSettings(settingsObject);
        setError(null);
      } catch (err) {
        console.error('Error fetching site settings:', err);
        setError(err.message || 'Failed to fetch site settings');
        setSettings({});
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
}

/**
 * Helper function to safely get a setting value with fallback
 * @param {Object} settings - Settings object from useSiteSettings
 * @param {string} key - Setting key
 * @param {any} fallback - Fallback value if key doesn't exist (default: null)
 * @returns {any} Setting value or fallback
 */
export function getSetting(settings, key, fallback = null) {
  return settings[key] !== undefined ? settings[key] : fallback;
}
