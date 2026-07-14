import { useEffect, useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { HelmetProvider } from 'react-helmet-async';

import Navigator from 'Navigator';
import { CustomIcon, TopBar } from 'Components';
import Footer from 'Components/Footer';
import { LanguageProvider, ThemeProvider } from 'Providers';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const App = () => {
  const landingRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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
      <Analytics />
      <ThemeProvider defaultTheme='system' storageKey='paul-pop-ui-theme'>
        <div className='h-dvh w-screen'>
          <LanguageProvider>
            <TopBar />

            <main ref={landingRef} className='overflow-y-auto'>
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
            <div
              onClick={scrollToTop}
              className='bg-primary/30 flex h-12 w-8 cursor-pointer items-center justify-center rounded-full border shadow-sm backdrop-blur-sm transition-all hover:scale-105'>
              <CustomIcon name='arrow-up' className='h-6 w-6 text-white' />
            </div>
          </div>
        )}
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
