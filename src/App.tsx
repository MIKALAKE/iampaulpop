import { useEffect, useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { MotionConfig } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';

import Navigator from 'Navigator';
import I18n from 'Locales';
import { CustomIcon, TopBar } from 'Components';
import Footer from 'Components/Footer';
import { LanguageProvider, ThemeProvider } from 'Providers';
import { track, trackScrollDepth } from 'Helpers/analytics';

const scrollToTop = () => {
  track('scroll_to_top_click');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
};

const App = () => {
  const landingRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(trackScrollDepth, []);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target;

      const top = target instanceof HTMLElement ? target.scrollTop : window.scrollY;
      const max =
        target instanceof HTMLElement
          ? target.scrollHeight - target.clientHeight
          : document.documentElement.scrollHeight - document.documentElement.clientHeight;

      setScrollProgress(max > 0 ? (top / max) * 100 : 0);
    };

    document.addEventListener('scroll', handleScroll, {
      capture: true,
      passive: true,
    });

    return () => document.removeEventListener('scroll', handleScroll, { capture: true });
  }, []);

  const afterHero = scrollProgress > 10;

  return (
    <HelmetProvider>
      <MotionConfig reducedMotion='user'>
        <Analytics />
        <ThemeProvider defaultTheme='system' storageKey='paul-pop-ui-theme'>
          <div className='h-dvh w-screen'>
            <LanguageProvider>
              <a
                href='#content'
                className='bg-primary text-primary-foreground sr-only z-[60] px-4 py-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2'>
                {I18n.t('general:skipToContent')}
              </a>

              <TopBar />

              <main id='content' ref={landingRef} className='overflow-y-auto'>
                <Navigator />
              </main>

              <Footer />
            </LanguageProvider>
          </div>

          <div
            className='bg-primary fixed top-0 left-0 z-50 h-1 w-full origin-left'
            style={{ transform: `scaleX(${scrollProgress / 100})` }}
          />

          {afterHero && (
            <div className='fixed right-4 bottom-10 z-50'>
              <button
                type='button'
                onClick={scrollToTop}
                aria-label={I18n.t('general:backToTop')}
                className='bg-primary text-primary-foreground flex h-12 w-8 cursor-pointer items-center justify-center rounded-full shadow-sm transition-all hover:scale-105'>
                <CustomIcon name='arrow-up' className='h-6 w-6' />
              </button>
            </div>
          )}
        </ThemeProvider>
      </MotionConfig>
    </HelmetProvider>
  );
};

export default App;
