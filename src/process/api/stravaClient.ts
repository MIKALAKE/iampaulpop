const BASE = import.meta.env.VITE_BASE_URL;

async function apiFetch(endpoint: string) {
  const res = await fetch(`${BASE}${endpoint}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const getAthlete = () => apiFetch('/athlete');
export const getActivities = () => apiFetch('/activities');
