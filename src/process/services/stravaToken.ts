let cachedAccessToken: string | null = null;
let inflightRequest: Promise<string> | null = null;

const SS_KEY = 'strava_refresh_token';

function getRefreshToken() {
  // Prefer the latest rotated token stored in this session;
  // fall back to the one baked into the build
  return sessionStorage.getItem(SS_KEY) ?? import.meta.env.VITE_STRAVA_REFRESH_TOKEN;
}

export async function getValidAccessToken() {
  if (cachedAccessToken) return cachedAccessToken;

  if (inflightRequest) return inflightRequest;

  inflightRequest = _fetchFreshToken().finally(() => {
    inflightRequest = null;
  });

  return inflightRequest;
}

async function _fetchFreshToken(): Promise<string> {
  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: import.meta.env.VITE_STRAVA_CLIENT_ID,
      client_secret: import.meta.env.VITE_STRAVA_CLIENT_SECRET,
      refresh_token: getRefreshToken(), // Uses latest rotated token
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) throw new Error(`Token refresh failed: ${response.status}`);

  const data = await response.json();

  // Persist the new refresh token for the lifetime of this browser session
  sessionStorage.setItem(SS_KEY, data.refresh_token);

  cachedAccessToken = data.access_token;
  const msUntilExpiry = data.expires_at * 1000 - Date.now() - 60_000;
  setTimeout(() => {
    cachedAccessToken = null;
  }, msUntilExpiry);

  if (!cachedAccessToken) {
    throw new Error('No access token received from Strava');
  }

  return cachedAccessToken;
}
