import { motion } from 'framer-motion';

import I18n from 'Locales';

const Hero = () => (
  <div className='container mx-auto flex h-dvh w-full flex-col items-start justify-center px-4'>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className='text-primary mb-3 font-mono text-xs sm:text-sm'>
      {I18n.t('landingPage:hero.greeting')}
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className='text-foreground mb-2 text-3xl font-bold sm:text-5xl md:text-7xl'>
      Paul Pop
    </motion.h1>

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className='text-muted-foreground mb-4 text-xl font-bold sm:text-3xl md:text-5xl'>
      {I18n.t('landingPage:hero.description')}
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className='text-muted-foreground mb-20 max-w-xl text-sm leading-relaxed sm:text-lg'>
      {I18n.t('landingPage:hero.personalNote')}
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className='flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4'>
      <a
        href='#projects'
        className='border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-sm border px-4 py-2.5 text-center font-mono text-xs transition-colors duration-200 sm:text-sm'>
        {I18n.t('general:viewMyWork')}
      </a>

      <a
        href='mailto:paulpop122@gmail.com'
        className='text-muted-foreground hover:text-primary rounded-sm px-4 py-2.5 text-center font-mono text-xs transition-colors duration-200 sm:text-sm'>
        {I18n.t('general:getInTouch')} {'->'}
      </a>
    </motion.div>
  </div>
);

export default Hero;
