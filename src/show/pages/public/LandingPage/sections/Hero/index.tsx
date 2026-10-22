import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

import I18n from 'Locales';
import { track } from 'Helpers/analytics';
import CustomIcon from 'Components/CustomIcon';
import { getYearsOfExperience } from 'Helpers';
import cvFile from 'Assets/Paul_Pop_CV.pdf';
import { CAREER_START_DATE, CONTACT_EMAIL, LINKEDIN_URL } from 'Constants';

const years = getYearsOfExperience(CAREER_START_DATE);

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay },
});

const Hero = () => (
  <div
    id='hero'
    className='container mx-auto flex h-dvh w-full flex-col items-start justify-center px-4'>
    <motion.p {...fadeIn(0.2)} className='text-primary mb-3 font-mono text-xs sm:text-sm'>
      {I18n.t('landingPage:hero.greeting')}
    </motion.p>

    <motion.h1
      {...fadeIn(0.3)}
      className='text-foreground mb-2 text-3xl font-bold sm:text-5xl md:text-7xl'>
      Paul Pop
    </motion.h1>

    <motion.p
      {...fadeIn(0.4)}
      className='text-muted-foreground mb-6 max-w-4xl text-xl font-bold text-balance sm:text-3xl md:text-5xl'>
      {I18n.t('landingPage:hero.description')}
    </motion.p>

    <motion.ul
      {...fadeIn(0.5)}
      className='text-muted-foreground mb-8 flex flex-col gap-2 font-mono text-xs sm:text-sm'>
      <li className='text-foreground'>{I18n.t('landingPage:hero.facts', { years })}</li>

      <li className='flex items-center gap-2'>
        <CustomIcon name='maramures-gate' size={18} aria-hidden className='text-primary shrink-0' />
        {I18n.t('landingPage:hero.origin')}
      </li>

      <li>{I18n.t('landingPage:hero.personalNote')}</li>
    </motion.ul>

    <motion.div
      {...fadeIn(0.6)}
      className='flex w-full flex-col gap-3 font-mono text-xs sm:w-auto sm:flex-row sm:items-center sm:gap-4 sm:text-sm'>
      <a
        href={cvFile}
        download='Paul_Pop_CV.pdf'
        onClick={() => track('cv_download', { location: 'hero' })}
        className='bg-primary text-primary-foreground hover:bg-primary/85 flex items-center justify-center gap-2 px-4 py-2.5 transition-colors'>
        <Download aria-hidden className='size-4' />
        {I18n.t('landingPage:hero.downloadCv')}
      </a>

      <a
        href={LINKEDIN_URL}
        target='_blank'
        rel='noopener noreferrer'
        onClick={() => track('social_click', { network: 'LinkedIn', location: 'hero' })}
        className='border-primary text-primary hover:bg-primary hover:text-primary-foreground border px-4 py-2.5 text-center transition-colors'>
        LinkedIn
        <span className='sr-only'> ({I18n.t('general:opensInNewTab')})</span>
      </a>

      <a
        href={`mailto:${CONTACT_EMAIL}`}
        onClick={() => track('contact_click', { method: 'email', location: 'hero' })}
        className='text-muted-foreground hover:text-primary flex items-center justify-center px-4 py-2.5 transition-colors'>
        {I18n.t('landingPage:hero.email')}
        <ArrowRight aria-hidden className='ml-2 size-4' />
      </a>
    </motion.div>
  </div>
);

export default Hero;
