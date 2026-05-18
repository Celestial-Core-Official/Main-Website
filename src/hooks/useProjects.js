import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { getCachedData, setCachedData } from '../lib/cache';

/**
 * React hook to fetch projects from Supabase with caching
 * @returns {Object} { projects, loading, error }
 */
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Check cache first
        const cachedProjects = getCachedData('projects');
        if (cachedProjects) {
          setProjects(cachedProjects);
          setLoading(false);
          return;
        }

        // Fetch from Supabase if not cached
        const { data, error: supabaseError } = await supabase
          .from('projects')
          .select('*')
          .order('display_order');

        if (supabaseError) {
          throw new Error(supabaseError.message);
        }

        // Cache the data
        setCachedData('projects', data);
        setProjects(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
}
