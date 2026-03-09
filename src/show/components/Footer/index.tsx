import dayjs from 'dayjs';
import { motion } from 'framer-motion';

import I18n from 'Locales';
import * as Logos from 'Assets/Logos';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/MIKALAKE',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/paul-pop-5b276722b/',
  },
];

const renderSocialLink = (link: (typeof socialLinks)[number]) => {
  const logoSrc = Logos[link.name.toLowerCase() as keyof typeof Logos];

  return (
    <a
      key={link.name}
      href={link.url}
      target='_blank'
      rel='noopener noreferrer'
      className='text-primary group flex items-center text-sm transition-all duration-300 hover:underline'>
      <img src={logoSrc} alt={`${link} logo`} className='mr-2 h-4 w-4' />

      <p>{link.name}</p>
    </a>
  );
};

const delays = [0.3, 0.5, 0.7];

const Footer = () => (
  <footer className='border-border border-t px-6 py-8'>
    <div className='mx-auto flex max-w-5xl flex-col items-start justify-between gap-10 sm:flex-row'>
      <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delays[0] }}
        href='/'
        aria-label='Paul Pop'
        className='text-primary order-1 text-xs transition-all duration-100 select-none hover:scale-105 sm:order-2'>
        paul.pop
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delays[1] }}
        className='text-muted-foreground order-2 flex gap-2 text-sm leading-relaxed sm:order-1 sm:text-lg'>
        {socialLinks.map(renderSocialLink)}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delays[2] }}
        className='text-muted-foreground order-3 flex gap-2 text-xs leading-relaxed'>
        {I18n.t('general:buildBy')} · {dayjs().year()}
      </motion.p>
    </div>
  </footer>
);

export default Footer;
