import { Helmet } from 'react-helmet-async';

import I18n from 'Locales';

// NOTE: Fitness temporarily hidden while the Strava API is down
import { AboutMe, CV, Experience, Hero, Projects, Skills } from './sections';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>{I18n.t('helmet:title')}</title>
        <meta name='description' content={I18n.t('helmet:description')} />
      </Helmet>

      <div className='mx-auto flex h-full w-full flex-col items-center justify-center gap-44 px-7 lg:max-w-5xl lg:px-5'>
        <Hero />

        <AboutMe />

        {/* Fitness temporarily hidden while the Strava API is down */}
        {/* <Fitness /> */}

        <Experience />

        <Skills />

        <Projects />

        <CV />
      </div>
    </>
  );
};

export default LandingPage;
