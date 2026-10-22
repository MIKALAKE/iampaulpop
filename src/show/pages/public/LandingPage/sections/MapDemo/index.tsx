import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

import I18n from 'Locales';
import { SectionHeading } from 'Components';

// MapLibre is ~800 KB; it only loads once the reader gets close to the section.
const ServicesMap = lazy(() => import('./ServicesMap'));

const MapPlaceholder = ({ message = I18n.t('landingPage:mapDemo.loading') }) => (
  <div className='border-border bg-secondary/40 text-muted-foreground flex h-[380px] items-center justify-center border p-6 text-center text-xs sm:h-[460px] lg:h-[600px]'>
    {message}
  </div>
);

// MapLibre throws during render when the browser has no WebGL2 (old devices,
// hardware acceleration off). Without this the whole page would go down with it.
class MapErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return <MapPlaceholder message={I18n.t('landingPage:mapDemo.unavailable')} />;
    }

    return this.props.children;
  }
}

const MapDemo = () => {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = placeholderRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: '600px 0px' },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id='demo' className='w-full py-20'>
      <div className='container mx-auto max-w-5xl'>
        {/* index shifted 04→03 while Fitness is hidden; restore to 04 when Fitness returns */}
        <SectionHeading index='03' title={I18n.t('general:demo')} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mt-10 mb-8 max-w-3xl'>
          <h3 className='text-foreground mb-3 flex flex-wrap items-center gap-3 text-lg font-semibold'>
            {I18n.t('landingPage:mapDemo.title')}
            <span className='border-primary text-primary border px-1.5 py-0.5 text-[11px] font-semibold tracking-widest'>
              {I18n.t('landingPage:mapDemo.badge')}
            </span>
          </h3>

          <p className='text-muted-foreground mb-3 leading-relaxed text-pretty'>
            {I18n.t('landingPage:mapDemo.intro')}
          </p>

          <p className='text-muted-foreground text-xs leading-relaxed text-pretty'>
            {I18n.t('landingPage:mapDemo.disclaimer')}
          </p>
        </motion.div>

        <div ref={placeholderRef}>
          {shouldLoad ? (
            <MapErrorBoundary>
              <Suspense fallback={<MapPlaceholder />}>
                <ServicesMap />
              </Suspense>
            </MapErrorBoundary>
          ) : (
            <MapPlaceholder />
          )}
        </div>

        <p className='text-muted-foreground mt-3 text-[11px]'>
          {I18n.t('landingPage:mapDemo.source')}
        </p>
      </div>
    </section>
  );
};

export default MapDemo;
