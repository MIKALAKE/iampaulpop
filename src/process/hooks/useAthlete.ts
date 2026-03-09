import { useState, useEffect } from 'react';
import { getAthlete } from '../api/stravaClient';

export function useAthlete() {
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAthlete()
      .then(d => {
        if (!d.errors && !d.message) {
          setAthlete(d);
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { athlete, loading, error };
}
