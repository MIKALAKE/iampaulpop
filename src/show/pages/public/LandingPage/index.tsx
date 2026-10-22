import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import I18n from 'Locales';
import { trackSections } from 'Helpers/analytics';

// NOTE: Fitness temporarily hidden while the Strava API is down
import { AboutMe, CV, Experience, Hero, MapDemo, Projects, Skills } from './sections';

const SECTIONS = ['hero', 'about', 'experience', 'demo', 'skills', 'projects', 'cv'];

const LandingPage = () => {
  useEffect(() => trackSections(SECTIONS), []);

  return (
    <>
      <Helmet>
        <title>{I18n.t('helmet:title')}</title>
        <meta name='description' content={I18n.t('helmet:description')} />
      </Helmet>

      <div className='mx-auto flex h-full w-full flex-col items-center justify-center px-7 lg:max-w-5xl lg:px-5'>
        <Hero />

        <AboutMe />

        {/* Fitness temporarily hidden while the Strava API is down */}
        {/* <Fitness /> */}

        <Experience />

        <MapDemo />

        <Skills />

        <Projects />

        <CV />
      </div>
    </>
  );
};

export default LandingPage;
