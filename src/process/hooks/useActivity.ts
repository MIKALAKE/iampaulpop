import { useState, useEffect } from 'react';
import { getActivities } from '../api/stravaClient';

export function useActivities({ per_page = 10, page = 1 } = {}) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getActivities({ per_page, page })
      .then(d => {
        if (!cancelled) setActivities(d);
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
  }, [per_page, page]);

  return { activities, loading, error };
}
