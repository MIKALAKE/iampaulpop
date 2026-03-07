import { getValidAccessToken } from '../services/stravaToken';

const BASE = 'https://www.strava.com/api/v3';

async function stravaFetch(endpoint: string, options: RequestInit = {}) {
  const token = await getValidAccessToken();

  const res = await fetch(`${BASE}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (res.status === 429) {
    const usage = res.headers.get('X-RateLimit-Usage');
    throw new Error(`Strava rate limit hit — usage: ${usage}`);
  }

  if (!res.ok) throw new Error(`Strava API error: ${res.status}`);
  return res.json();
}

export const getAthlete = () => stravaFetch('/athlete');
export const getAthleteStats = (id: string) => stravaFetch(`/athletes/${id}/stats`);

export const getActivities = (params = {}) =>
  stravaFetch(`/athlete/activities?${new URLSearchParams(params)}`);

export const getActivity = (id: string) => stravaFetch(`/activities/${id}`);
