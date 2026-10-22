import services from './data/services.json';

export type Category = 'admin' | 'health' | 'pharmacy' | 'safety' | 'post' | 'education';

export interface Place {
  id: string;
  category: Category;
  name: string | null;
  locality: string;
  lon: number;
  lat: number;
}

export type Point = [number, number];

export interface Route {
  coordinates: Point[];
  meters: number;
  seconds: number | null;
  // True when the routing service didn't answer and we fell back to a straight line.
  approximate: boolean;
}

export const PLACES = services as Place[];

// Hues picked to stay apart from each other and readable on both Carto basemaps.
export const CATEGORIES: { key: Category; color: string }[] = [
  { key: 'admin', color: '#d97706' },
  { key: 'health', color: '#dc2626' },
  { key: 'pharmacy', color: '#0d9488' },
  { key: 'safety', color: '#2563eb' },
  { key: 'post', color: '#7c3aed' },
  { key: 'education', color: '#65a30d' },
];

export const COLOR_BY_CATEGORY = Object.fromEntries(
  CATEGORIES.map(({ key, color }) => [key, color]),
) as Record<Category, string>;

// Maramureș county, a little padded so border villages aren't on the edge.
export const COUNTY_BOUNDS: [Point, Point] = [
  [22.85, 47.25],
  [25.15, 48.08],
];

export const distanceInMeters = ([lon1, lat1]: Point, [lon2, lat2]: Point) => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return 2 * 6_371_000 * Math.asin(Math.sqrt(h));
};

export const isInCounty = ([lon, lat]: Point) =>
  lon >= COUNTY_BOUNDS[0][0] &&
  lon <= COUNTY_BOUNDS[1][0] &&
  lat >= COUNTY_BOUNDS[0][1] &&
  lat <= COUNTY_BOUNDS[1][1];

/**
 * Driving route from the public OSRM demo server. It is free and rate limited,
 * so any failure falls back to a straight line rather than an error.
 */
export const fetchRoute = async (from: Point, to: Point, signal: AbortSignal): Promise<Route> => {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${from.join(',')};${to.join(',')}?overview=full&geometries=geojson`;
    const response = await fetch(url, { signal });
    const data = await response.json();
    const route = data.routes?.[0];

    if (!response.ok || !route) throw new Error('No route');

    return {
      coordinates: route.geometry.coordinates,
      meters: route.distance,
      seconds: route.duration,
      approximate: false,
    };
  } catch (error) {
    if (signal.aborted) throw error;

    return {
      coordinates: [from, to],
      meters: distanceInMeters(from, to),
      seconds: null,
      approximate: true,
    };
  }
};

export const formatDistance = (meters: number) =>
  meters < 1000 ? `${Math.round(meters)} m` : `${(meters / 1000).toFixed(1)} km`;

export const formatDuration = (seconds: number) => `${Math.max(1, Math.round(seconds / 60))} min`;
