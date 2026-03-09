import { useState, useEffect } from 'react';
import { getActivities } from '../api/stravaClient';

export function useActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getActivities()
      .then(d => {
        if (!cancelled && !d.errors && !d.message) setActivities(d);
      })
      .catch(e => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { activities, loading, error };
}
