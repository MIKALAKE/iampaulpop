import { useEffect, useMemo, useState } from 'react';
import { Crosshair, LocateFixed, Search, X } from 'lucide-react';
import type { MapMouseEvent } from 'maplibre-gl';
import type { FeatureCollection } from 'geojson';

import I18n from 'Locales';
import { cn } from 'Helpers';
import { track } from 'Helpers/analytics';
import { Input } from 'Components/ui/input';
import {
  Map,
  MapControls,
  MapGeoJSON,
  MapMarker,
  MapPopup,
  MapRoute,
  MarkerContent,
  useMap,
} from 'Components/ui/map';

import boundary from './data/boundary.json';
import {
  CATEGORIES,
  COLOR_BY_CATEGORY,
  COUNTY_BOUNDS,
  PLACES,
  distanceInMeters,
  fetchRoute,
  formatDistance,
  formatDuration,
  isInCounty,
  type Category,
  type Place,
  type Point,
  type Route,
} from './utils';

const t = (key: string, options?: Record<string, unknown>) =>
  I18n.t(`landingPage:mapDemo.${key}`, options);

const placeName = (place: Place) => place.name ?? t(`unnamed.${place.category}`);

const placeLabel = (place: Place) => `${placeName(place)}, ${place.locality}`;

const BOUNDARY = boundary as FeatureCollection;

// Picking a point on the map sets the origin for the "nearest" search. Clicks on
// markers are left to the markers.
const MapClick = ({ onPick }: { onPick: (point: Point) => void }) => {
  const { map } = useMap();

  useEffect(() => {
    if (!map) return;

    const onClick = (event: MapMouseEvent) => {
      const target = event.originalEvent.target as HTMLElement;
      if (target.closest('.maplibregl-marker, .maplibregl-popup')) return;

      onPick([event.lngLat.lng, event.lngLat.lat]);
    };

    map.on('click', onClick);

    return () => {
      map.off('click', onClick);
    };
  }, [map, onPick]);

  return null;
};

// Brings the selection, or the whole route, into view.
const MapCamera = ({ selected, route }: { selected: Place | null; route: Route | null }) => {
  const { map } = useMap();

  useEffect(() => {
    if (!map || !selected) return;

    if (route) {
      const lons = route.coordinates.map(([lon]) => lon);
      const lats = route.coordinates.map(([, lat]) => lat);

      map.fitBounds(
        [
          [Math.min(...lons), Math.min(...lats)],
          [Math.max(...lons), Math.max(...lats)],
        ],
        { padding: 60, maxZoom: 14, duration: 900 },
      );
      return;
    }

    map.flyTo({
      center: [selected.lon, selected.lat],
      zoom: Math.max(map.getZoom(), 12),
      duration: 900,
    });
  }, [map, selected, route]);

  return null;
};

const ServicesMap = () => {
  const [active, setActive] = useState<Set<Category>>(() => new Set(CATEGORIES.map(c => c.key)));
  const [query, setQuery] = useState('');
  const [origin, setOrigin] = useState<Point | null>(null);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [fetched, setFetched] = useState<{ key: string; route: Route } | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('ro');

    const matches = PLACES.filter(
      place =>
        active.has(place.category) &&
        (!needle || placeLabel(place).toLocaleLowerCase('ro').includes(needle)),
    );

    if (!origin) return matches;

    return matches
      .map(place => ({ place, meters: distanceInMeters(origin, [place.lon, place.lat]) }))
      .sort((a, b) => a.meters - b.meters)
      .map(({ place }) => place);
  }, [active, query, origin]);

  // With an origin, the nearest match is the selection and gets a route.
  const nearest = origin ? (visible[0] ?? null) : null;
  const selectedId = origin ? (nearest?.id ?? null) : pickedId;
  const selected = PLACES.find(place => place.id === selectedId) ?? null;

  const routeKey = origin && nearest ? `${origin.join(',')}>${nearest.id}` : null;
  const route = fetched && fetched.key === routeKey ? fetched.route : null;
  const routing = Boolean(routeKey) && !route;

  useEffect(() => {
    if (!origin || !nearest || !routeKey) return;

    const controller = new AbortController();

    fetchRoute(origin, [nearest.lon, nearest.lat], controller.signal)
      .then(result => setFetched({ key: routeKey, route: result }))
      .catch(() => {});

    return () => controller.abort();
  }, [origin, nearest, routeKey]);

  const pickOrigin = (point: Point) => {
    setNotice(null);
    setOrigin(point);
    track('map_demo', { action: 'pick_point' });
  };

  const locate = () => {
    track('map_demo', { action: 'locate' });

    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => {
        const point: Point = [coords.longitude, coords.latitude];

        if (!isInCounty(point)) {
          setNotice(t('outsideCounty'));
          return;
        }

        setNotice(null);
        setOrigin(point);
      },
      () => setNotice(t('locationDenied')),
      { timeout: 10000 },
    );
  };

  const clearOrigin = () => {
    setOrigin(null);
    setPickedId(null);
    setNotice(null);
  };

  const toggleCategory = (category: Category) => {
    track('map_demo', { action: 'filter', category });

    setActive(current => {
      const next = new Set(current);

      if (next.has(category)) next.delete(category);
      else next.add(category);

      return next;
    });
  };

  const selectPlace = (place: Place) => {
    track('map_demo', { action: 'select', category: place.category });
    setOrigin(null);
    setPickedId(place.id);
  };

  const countByCategory = useMemo(
    () =>
      PLACES.reduce<Record<string, number>>((counts, place) => {
        counts[place.category] = (counts[place.category] ?? 0) + 1;
        return counts;
      }, {}),
    [],
  );

  const renderCategory = ({ key, color }: (typeof CATEGORIES)[number]) => (
    <button
      key={key}
      type='button'
      aria-pressed={active.has(key)}
      onClick={toggleCategory.bind(null, key)}
      className={cn(
        'border-border flex items-center gap-2 border px-2.5 py-1.5 text-left text-xs transition-colors',
        active.has(key) ? 'bg-secondary text-foreground' : 'text-muted-foreground line-through',
      )}>
      <span aria-hidden className='size-2.5 shrink-0 rounded-full' style={{ background: color }} />
      {t(`categories.${key}`)}
      <span className='text-muted-foreground ml-auto tabular-nums'>{countByCategory[key]}</span>
    </button>
  );

  const renderListItem = (place: Place) => (
    <li key={place.id}>
      <button
        type='button'
        onClick={selectPlace.bind(null, place)}
        aria-current={place.id === selectedId}
        className='hover:bg-secondary aria-[current=true]:bg-secondary flex w-full items-start gap-2.5 px-3 py-2 text-left text-xs transition-colors'>
        <span
          aria-hidden
          className='mt-1 size-2 shrink-0 rounded-full'
          style={{ background: COLOR_BY_CATEGORY[place.category] }}
        />
        <span className='min-w-0 flex-1'>
          <span className='text-foreground block truncate'>{placeName(place)}</span>
          <span className='text-muted-foreground block'>{place.locality}</span>
        </span>
        {origin && (
          <span className='text-muted-foreground shrink-0 tabular-nums'>
            {formatDistance(distanceInMeters(origin, [place.lon, place.lat]))}
          </span>
        )}
      </button>
    </li>
  );

  const renderMarker = (place: Place) => (
    <MapMarker
      key={place.id}
      longitude={place.lon}
      latitude={place.lat}
      onClick={selectPlace.bind(null, place)}>
      <MarkerContent>
        <span
          className={cn(
            'block rounded-full border-2 border-white shadow-md transition-transform',
            place.id === selectedId ? 'size-4 scale-125' : 'size-3',
          )}
          style={{ background: COLOR_BY_CATEGORY[place.category] }}
        />
      </MarkerContent>
    </MapMarker>
  );

  return (
    <div className='border-border grid grid-cols-1 border lg:grid-cols-[minmax(0,1fr)_340px]'>
      <div className='relative h-[380px] min-w-0 sm:h-[460px] lg:h-[600px]'>
        <Map
          bounds={COUNTY_BOUNDS}
          fitBoundsOptions={{ padding: 16 }}
          minZoom={7}
          cooperativeGestures>
          <MapGeoJSON
            data={BOUNDARY}
            fillPaint={{ 'fill-color': '#d97706', 'fill-opacity': 0.06 }}
            linePaint={{ 'line-color': '#d97706', 'line-width': 1.5 }}
          />

          <MapClick onPick={pickOrigin} />
          <MapCamera selected={selected} route={route} />

          {route && (
            <MapRoute
              coordinates={route.coordinates}
              color='#d97706'
              width={4}
              opacity={0.9}
              dashArray={route.approximate ? [2, 2] : undefined}
              interactive={false}
            />
          )}

          {visible.map(renderMarker)}

          {origin && (
            <MapMarker
              longitude={origin[0]}
              latitude={origin[1]}
              draggable
              onDragEnd={({ lng, lat }) => setOrigin([lng, lat])}>
              <MarkerContent>
                <span className='bg-foreground text-background flex size-7 items-center justify-center rounded-full border-2 border-white shadow-lg'>
                  <Crosshair className='size-4' />
                </span>
              </MarkerContent>
            </MapMarker>
          )}

          {selected && (
            <MapPopup
              key={selected.id}
              longitude={selected.lon}
              latitude={selected.lat}
              offset={14}
              closeOnClick={false}
              onClose={clearOrigin}>
              <p className='text-foreground text-xs font-semibold'>{placeName(selected)}</p>
              <p className='text-muted-foreground text-xs'>
                {t(`categories.${selected.category}`)} · {selected.locality}
              </p>
            </MapPopup>
          )}

          <MapControls position='top-right' />
        </Map>

        <span className='bg-primary text-primary-foreground pointer-events-none absolute top-3 left-3 z-10 px-2 py-0.5 text-[11px] font-semibold tracking-widest'>
          DEMO
        </span>
      </div>

      <div className='border-border flex min-h-0 min-w-0 flex-col gap-4 border-t p-4 lg:h-[600px] lg:border-t-0 lg:border-l'>
        <div
          aria-live='polite'
          className='bg-secondary/60 min-h-[76px] p-3 text-xs leading-relaxed'>
          {notice ? (
            <p className='text-foreground'>{notice}</p>
          ) : nearest ? (
            <>
              <p className='text-muted-foreground'>{t('nearest')}</p>
              <p className='text-foreground font-semibold'>{placeLabel(nearest)}</p>
              <p className='text-muted-foreground'>
                {routing || !route
                  ? t('routing')
                  : route.approximate
                    ? `${formatDistance(route.meters)} ${t('straightLine')}`
                    : `${formatDistance(route.meters)} · ${formatDuration(route.seconds ?? 0)} ${t('byCar')}`}
              </p>
            </>
          ) : origin ? (
            <p className='text-foreground'>{t('noResults')}</p>
          ) : (
            <p className='text-foreground'>{t('hint')}</p>
          )}
        </div>

        <div className='flex gap-2'>
          <button
            type='button'
            onClick={locate}
            className='border-border hover:bg-secondary flex flex-1 items-center justify-center gap-2 border px-3 py-2 text-xs transition-colors'>
            <LocateFixed aria-hidden className='size-4' />
            {t('useMyLocation')}
          </button>

          {origin && (
            <button
              type='button'
              onClick={clearOrigin}
              className='border-border hover:bg-secondary flex items-center justify-center gap-2 border px-3 py-2 text-xs transition-colors'>
              <X aria-hidden className='size-4' />
              {t('clearPoint')}
            </button>
          )}
        </div>

        <fieldset className='grid grid-cols-2 gap-1.5'>
          <legend className='sr-only'>{t('filters')}</legend>
          {CATEGORIES.map(renderCategory)}
        </fieldset>

        <label className='relative block'>
          <span className='sr-only'>{t('search')}</span>
          <Search
            aria-hidden
            className='text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2'
          />
          <Input
            type='search'
            value={query}
            onChange={event => setQuery(event.target.value)}
            onBlur={() => query && track('map_demo', { action: 'search' })}
            placeholder={t('search')}
            className='pl-8'
          />
        </label>

        <div className='flex min-h-0 flex-1 flex-col'>
          <p className='text-muted-foreground mb-1.5 text-xs'>
            {t('results', { count: visible.length })}
          </p>

          {visible.length ? (
            <ul className='border-border max-h-64 min-h-0 flex-1 divide-y divide-[var(--border)] overflow-y-auto border lg:max-h-none'>
              {visible.map(renderListItem)}
            </ul>
          ) : (
            <p className='text-muted-foreground border-border border p-3 text-xs'>
              {t('noResults')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesMap;
