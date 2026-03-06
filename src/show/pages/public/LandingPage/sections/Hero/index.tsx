import { motion } from 'framer-motion';
import { Figma, Github, Gitlab } from 'lucide-react';

import I18n from 'Locales';

const techIcons = [
  {
    name: 'React',
    icon: () => (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        className='h-5 w-5'>
        <circle cx='12' cy='12' r='2.5' />
        <ellipse cx='12' cy='12' rx='10' ry='4' />
        <ellipse cx='12' cy='12' rx='10' ry='4' transform='rotate(60 12 12)' />
        <ellipse cx='12' cy='12' rx='10' ry='4' transform='rotate(120 12 12)' />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: () => <span className='font-mono text-xs leading-none font-bold'>TS</span>,
  },
  {
    name: 'Redux',
    icon: () => (
      <svg viewBox='0 0 24 24' fill='currentColor' className='h-5 w-5'>
        <path d='M16.63 16.56c.77-.08 1.35-.77 1.31-1.58a1.48 1.48 0 0 0-1.5-1.38h-.05a1.49 1.49 0 0 0-1.42 1.54c.04.42.2.77.43 1.01a6.2 6.2 0 0 1-3.26 3.57 4.7 4.7 0 0 1-3.47.31 2.84 2.84 0 0 1-1.77-1.54c-.58-1.27-.42-2.65.42-3.73a8.4 8.4 0 0 1 1.27-1.35c-.08-.23-.23-.65-.31-.96-4.42 3.19-3.96 7.5-2.65 9.23a5.06 5.06 0 0 0 4.3 2.19c.46 0 .93-.04 1.39-.15a5.34 5.34 0 0 0 4.15-3.73 5.26 5.26 0 0 0 1.16-3.43z M19.75 13.14c-2.31-2.73-5.73-4.23-9.65-4.23h-.5a1.46 1.46 0 0 0-1.31-.77h-.04a1.49 1.49 0 0 0-1.42 1.54 1.49 1.49 0 0 0 1.5 1.42h.05a1.5 1.5 0 0 0 1.27-.96h.54c2.31 0 4.5.69 6.46 2a8.1 8.1 0 0 1 3.11 3.84c.43 1.12.38 2.19-.11 3.08-.77 1.38-2.04 2.11-3.77 2.11-.96 0-1.92-.27-2.42-.46-.19.15-.54.42-.81.58a7.62 7.62 0 0 0 3.31.77c2.46 0 4.27-1.35 4.96-2.69a5.4 5.4 0 0 0 .33-4.23z M8.13 17.22a1.49 1.49 0 0 0 1.5 1.42h.05a1.49 1.49 0 0 0 1.42-1.54 1.49 1.49 0 0 0-1.5-1.42h-.05a.36.36 0 0 0-.19.04c-.88-1.5-1.23-3.15-1.12-4.96.08-1.35.5-2.54 1.23-3.54a5.67 5.67 0 0 1 2.96-2.04c2.5-.65 4.88.08 5.96 1.88.77 1.23.81 2.61.19 4.04-.15.04-.62.27-.96.38.31.89.5 1.54.5 1.54l.54-.19c1.77-.65 2.77-1.96 2.77-3.57 0-2.31-2.23-4.42-5.27-4.42-.35 0-.73.04-1.08.08A8.08 8.08 0 0 0 8.4 8.3a8.97 8.97 0 0 0-1.35 5.8c.31 1.46.89 2.65 1.08 3.12z' />
      </svg>
    ),
  },
  {
    name: 'Tailwind',
    icon: () => (
      <svg viewBox='0 0 24 24' fill='currentColor' className='h-5 w-5'>
        <path d='M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C13.33 10.79 14.44 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.67 7.21 14.56 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.33 16.79 9.44 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.67 13.21 9.56 12 7 12z' />
      </svg>
    ),
  },
  { name: 'GitHub', icon: () => <Github className='h-5 w-5' /> },
  { name: 'GitLab', icon: () => <Gitlab className='h-5 w-5' /> },
  { name: 'Figma', icon: () => <Figma className='h-5 w-5' /> },
  {
    name: 'Jira',
    icon: () => (
      <svg viewBox='0 0 24 24' fill='currentColor' className='h-5 w-5'>
        <path d='M11.53 2c0 2.4 1.97 4.35 4.35 4.35h1.78v1.7c0 2.4 1.94 4.34 4.34 4.35V2.84a.84.84 0 0 0-.84-.84H11.53zM6.77 6.8a4.36 4.36 0 0 0 4.34 4.34h1.8v1.72a4.36 4.36 0 0 0 4.34 4.34V7.63a.84.84 0 0 0-.83-.83H6.77zM2 11.6a4.35 4.35 0 0 0 4.35 4.35h1.78v1.71c0 2.4 1.94 4.34 4.35 4.34V12.44a.84.84 0 0 0-.84-.84H2z' />
      </svg>
    ),
  },
];

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
      className='text-muted-foreground mb-6 max-w-xl text-sm leading-relaxed sm:text-lg'>
      {I18n.t('landingPage:hero.personalNote')}
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className='mb-6 flex flex-wrap gap-2'>
      {techIcons.map((tech, i) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + i * 0.05 }}
          className='group border-border text-muted-foreground hover:border-primary/50 hover:text-primary flex items-center gap-1.5 rounded-sm border px-2 py-1.5 font-mono text-xs transition-colors duration-200'
          title={tech.name}>
          <tech.icon />

          <span className='hidden text-xs sm:inline'>{tech.name}</span>
        </motion.div>
      ))}
    </motion.div>

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
        href='#contact'
        className='text-muted-foreground hover:text-primary rounded-sm px-4 py-2.5 text-center font-mono text-xs transition-colors duration-200 sm:text-sm'>
        {I18n.t('general:getInTouch')} {'->'}
      </a>
    </motion.div>
  </div>
);

export default Hero;
