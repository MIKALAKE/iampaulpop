import { motion } from 'framer-motion';

import I18n from 'Locales';
import { SectionHeading } from 'Components';
import { CAREER_START_DATE } from 'Constants';
import { getYearsOfExperience } from 'Helpers';

const highlights = [
  'landingPage:about.highlight.years',
  'landingPage:about.highlight.gis',
  'landingPage:about.highlight.ownership',
  'landingPage:about.highlight.mentoring',
  'landingPage:about.highlight.accessibility',
];

const years = getYearsOfExperience(CAREER_START_DATE);

const renderHighlight = (item: string, i: any) => (
  <li key={i} className='text-foreground flex items-start gap-3'>
    <span className='text-primary mt-1 font-mono text-sm'>▹</span>
    <span className='text-secondary-foreground'>{I18n.t(item, { years })}</span>
  </li>
);

const AboutMe = () => {
  return (
    <section id='about' className='w-full py-24'>
      <div className='container mx-auto max-w-5xl'>
        <SectionHeading index='01' title={I18n.t('general:about')} />
        <div className='mt-10 grid gap-12 md:grid-cols-2'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <p className='text-muted-foreground mb-6 leading-relaxed'>
              {I18n.t('landingPage:about.description', { years })}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <ul className='space-y-4'>{highlights.map(renderHighlight)}</ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
